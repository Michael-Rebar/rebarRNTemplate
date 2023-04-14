import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Content } from "native-base";
import { StyleSheet, Platform, Dimensions, View, Text, Keyboard } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Formik } from "formik";
import { scale } from "react-native-size-matters";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";
import { useDispatch, useSelector } from "react-redux";
import { updateBanks } from "../../redux/banks";
import Header from "../../components/Headers/Common";
import Footer from "../../components/Footer";
import Button from "../../components/Buttons/Button";
import Typography from "../../components/Typography";
import RegularField from "../../components/Textfields/RegularField";
import IconDescription from "../../components/IconDescription";
import LoadingScreen from "../../components/LoadingScreen";
import SuccessFail from "../../components/SuccessFail";
import { nameRegex } from "../../constants/regex";
import { toUpper, getSecureStore } from "../../constants/helper";
import BankIcon from "../../assets/images/common/bankicon.svg";
import global from "../../utils/GlobalStyles";
import color from "../../utils/Color";
import { createEnrolledAccounts, listEnrolledAccounts } from "../../api/cashout";

const screenHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  bankName: {
    paddingLeft: 20,
  },
  form: {
    paddingTop: 0,
  },
  bankItem: {
    width: "100%",
    borderBottomWidth: 1,
    paddingHorizontal: "5%",
    paddingVertical: scale(24),
    borderColor: color.veryLightGray,
  },
});

const ProfileNewBankDetails = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fieldCount = 1;
  const inputs = useRef([]);
  const { bankId, bankName, bankAccountNoLength, from } = route.params;
  const dispatch = useDispatch();
  const customerInfo = useSelector(state => state.customer.customer_info);
  // const referencesInfo = useSelector(state => state.references.references);
  // const bankList = referencesInfo.banks;
  // const bankListData = bankList.map(bL => bL.content).flat();
  // const selectedBankData = bankListData.find(bL => bL.kebankListDatay === bankId);
  // const accountNumberValidation = selectedBankData.account_no_ctr;
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({ bank_id: bankId, bank_name: bankName, name: `${customerInfo.personal_info.first_name} ${customerInfo.personal_info.last_name}`, account_no: "" });
  const [focus, setFocus] = useState({ name: false, account_no: false });
  const [error, setError] = useState(false);
  const [successModalDetails, setSuccessModalDetails] = useState({
    success: true,
    title: "",
    open: false,
  });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleClose = () => {
    if (from === "EmergencyFund" || from === "MainTab") {
      navigation.navigate("Account");
    } else {
      navigation.navigate("ProfileOptions");
    }
  };

  const onFocus = (_fieldName) => {
    setFocus({ ...focus, [_fieldName]: true });
  };

  const onBlur = (_fieldName) => {
    setFocus({ ...focus, [_fieldName]: false });
  };


  const getListEnrolledAccounts = async () => {
    console.log("ProfileNewBankDetails: Retrieving enrolled banks");
    await listEnrolledAccounts(`?partyId=${customerInfo.party_id}`)
      .then((response) => {
        const enrolledBanks = [];
        const { data } = response;
        if (data.message === "Successfully retrieved cash out accounts") {
          console.log("ProfileNewBankDetails: Retrieving enrolled banks - Success");
          if (data.data !== null) {
            data.data.map((d) => enrolledBanks.push(d));
            dispatch(updateBanks(enrolledBanks));
          }
        } else if (data.message === "No cash-out accounts found") {
          dispatch(updateBanks(enrolledBanks));
        }
      }) // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        console.log('error', err);
      });
  };

  const onSubmit = async (_values) => {
    if (_values.account_no.length !== bankAccountNoLength) {
      setError(true);
    } else {
      setIsLoading(true);
      const deviceInfo = await getSecureStore("singlifeDeviceInfo");
      const parseDevice = JSON.parse(deviceInfo);
      const createPayload = {
        partyId: customerInfo.party_id,
        accountNo: _values.account_no,
        name: _values.name,
        bankId: _values.bank_id,
        deviceId: parseDevice.device_id,
      };
      console.log("ProfileNewBankDetails: Creating enrolled banks");
      await createEnrolledAccounts(createPayload)
        .then((response) => {
          setIsLoading(false);
          const { data } = response;
          if (data.message === "Successfully added account") {
            console.log("ProfileNewBankDetails: Creating enrolled banks - Success");
            setSuccessModalDetails({
              success: true,
              title: "You’ve successfully enrolled your bank account.",
              open: true,
            });
            getListEnrolledAccounts();
          } else {
            setSuccessModalDetails({
              success: false,
              title: "Your account was not enrolled.",
              open: true,
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setSuccessModalDetails({
            success: false,
            title: "Your account was not enrolled.",
            open: true,
          });
          console.log('error', err.response);
        });
    }
  };

  const handleErrorText = () => {
    let message = ``;
    message = `Please enter your ${bankAccountNoLength}-digit account number.`;
    // if (accountNumberValidation.length === 1) {
    //   message = `Please enter your ${accountNumberValidation[0]}-digit account number.`;
    // } else {
    //   let countMessage = '';
    //   // eslint-disable-next-line array-callback-return
    //   accountNumberValidation.map((item, index) => {
    //     if (accountNumberValidation.length - 1 === index) {
    //       countMessage += `or ${item}`;
    //     } else if (accountNumberValidation.length - 2 === index) {
    //       countMessage += `${item} `;
    //     } else {
    //       countMessage += `${item}, `;
    //     }
    //   });
    //   message = `Please enter your ${countMessage} digit account number.`;
    // }
    return message;
  };

  // const handleAccountNumberLength = () => accountNumberValidation[accountNumberValidation.length - 1];

  const handleModalClose = () => {
    if (successModalDetails.success) {
      setSuccessModalDetails({
        success: true,
        title: "You’ve successfully enrolled your bank account.",
        open: false,
      });
      navigation.navigate("ProfileEnrolledBanks", { from });
    } else {
      handleClose();
    }
  };

  const handleFailAction = () => {
    setSuccessModalDetails({ ...successModalDetails, open: false });
    navigation.navigate("ProfileSelectBanks", { from });
  };

  const [viewHeights, setViewHeights] = useState({
    header: 0,
    wrapper: 0,
    footer: 0,
  });

  const onHeaderLayout = (e) => {
    setViewHeights({
      ...viewHeights,
      header: e.nativeEvent.layout.height,
    });
  };

  const onWrapperLayout = (e) => {
    setViewHeights({
      ...viewHeights,
      wrapper: e.nativeEvent.layout.height,
    });
  };

  const onFooterLayout = (e) => {
    setViewHeights({
      ...viewHeights,
      footer: e.nativeEvent.layout.height,
    });
  };

  const [state, setState] = useState({
    activeInputIndex: 0,
    nextFocusDisabled: false,
    previousFocusDisabled: false,
    buttonsDisabled: false,
    buttonsHidden: false,
  });

  const handleFocus = (index) => {
    setState({
      nextFocusDisabled: index === fieldCount,
      previousFocusDisabled: index === 0,
      activeInputIndex: index,
    });
  };

  const handleFocusNext = () => {
    const { nextFocusDisabled, activeInputIndex } = state;
    if (nextFocusDisabled) {
      return;
    }

    inputs.current[activeInputIndex + 1]._root.focus();
  };

  const handleFocusPrevious = () => {
    const { previousFocusDisabled, activeInputIndex } = state;
    if (previousFocusDisabled) {
      return;
    }

    inputs.current[activeInputIndex - 1]._root.focus();
  };

  const initRefs = (ref) => {
    inputs.current.push(ref);
  };

  const contentRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Container>
      <Header contained="solid" onLayout={onHeaderLayout} back backAction={() => navigation.goBack()} transparent actionButton="both" right rightActionText="CLOSE" rightAction={() => handleClose()} />

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            onSubmit(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          handleBlur,
        }) => (
          <React.Fragment>
            <Content style={global.wrapper} ref={contentRef} onLayout={onWrapperLayout} onContentSizeChange={() => contentRef.current._root.scrollToPosition(0, screenHeight / 3, false)}>
              <View style={[global.content, global.contentNoTopPadding]}>
                <Typography text="Enroll Bank Account" type="title3" />
              </View>

              <View style={styles.bankItem}>
                <IconDescription icon={<BankIcon />}>
                  <Typography text={bankName} type="body" style={styles.bankName} />
                </IconDescription>
              </View>

              <View style={[global.content, styles.form]}>
                <Grid style={global.body}>
                  <Row size={4}>
                    <Col>
                      <RegularField
                        hasRef
                        refHandler={initRefs}
                        onFocus={() => { handleFocus(0); onFocus("name"); }}
                        keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                        maxLength={40}
                        focus={focus.name}
                        onBlur={() => {
                          if (nameRegex.test(values.name)) setFieldValue("name", toUpper(values.name));
                          onBlur("name");
                          handleBlur("name");
                        }}
                        label="Account Name"
                        value={values.name}
                        onChangeText={(value) => (nameRegex.test(value) ? setFieldValue("name", toUpper(value)) : null)}
                        clearFunc={() => {
                          setFieldValue("name", "");
                        }}
                      />
                    </Col>
                  </Row>

                  <Row size={4} style={global.fieldSeparator}>
                    <Col>
                      <RegularField
                        hasRef
                        refHandler={initRefs}
                        onFocus={() => { handleFocus(1); onFocus("account_no"); }}
                        maxLength={bankAccountNoLength}
                        placeholder="Enter your XX digit account number"
                        onBlur={() => { handleBlur("account_no"); onBlur("account_no"); }}
                        label="Account Number"
                        value={values.account_no}
                        keyboardType="numeric"
                        onChangeText={(value) => {
                          setFieldValue("account_no", value.replace(/[^0-9]/g, ''));
                          setError(false);
                        }}
                        focus={focus.account_no}
                        error={error}
                        clearFunc={() => {
                          setFieldValue("account_no", "");
                          setError(false);
                        }}
                        errorText={handleErrorText()}
                      />
                    </Col>
                  </Row>
                </Grid>

                <Row style={global.body}>
                  <Col size={10}>

                    <Text style={global.textlink}>
                      By clicking Confirm, you agree that the bank account is under your name, and that all information above are true and accurate.
                    </Text>
                  </Col>
                </Row>
              </View>
              <LoadingScreen isLoading={isLoading} />
            </Content>
            {!isKeyboardVisible && (
              <Footer
                onLayout={onFooterLayout}
                elevation={Platform.OS === "ios" ? viewHeights.wrapper + viewHeights.footer + viewHeights.header + 100 >= screenHeight : viewHeights.wrapper + viewHeights.footer + viewHeights.header + 50 >= screenHeight}
              >
                {/* <Button onPress={handleSubmit} full variant="primary-contained" text="CONFIRM" /> */}
                <Button disabled={error || values.name.trim() === "" || values.account_no.length < 1} onPress={handleSubmit} full variant="primary-contained" text="CONFIRM" />
              </Footer>
            )}

            <SuccessFail
              success={successModalDetails.success}
              open={successModalDetails.open}
              title={successModalDetails.title}
              close
              closeAction={() => handleModalClose()}
              navigation={navigation}
              failAction={() => handleFailAction()}
            />

          </React.Fragment>
        )}
      </Formik>
      <KeyboardAccessoryNavigation
        nextDisabled={state.nextFocusDisabled}
        previousDisabled={state.previousFocusDisabled}
        nextHidden={state.buttonsHidden}
        previousHidden={state.buttonsHidden}
        onNext={handleFocusNext}
        onPrevious={handleFocusPrevious}
        androidAdjustResize
        tintColor={color.orangeRed}
      />
    </Container>
  );
};

ProfileNewBankDetails.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
};

ProfileNewBankDetails.defaultProps = {
  route: null,
};

export default ProfileNewBankDetails;
