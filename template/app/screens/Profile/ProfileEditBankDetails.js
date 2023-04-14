import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Content, View } from "native-base";
import { StyleSheet, Platform, Dimensions, Text, Keyboard } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Formik } from "formik";
import { scale } from "react-native-size-matters";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { updateBanks } from "../../redux/banks";
import BottomSheet from "../../components/BottomSheet";
import Header from "../../components/Headers/Common";
import Footer from "../../components/Footer";
import Button from "../../components/Buttons/Button";
import Typography from "../../components/Typography";
import RegularField from "../../components/Textfields/RegularField";
import IconDescription from "../../components/IconDescription";
import SuccessFail from "../../components/SuccessFail";
import LoadingScreen from "../../components/LoadingScreen";
import { nameRegex } from "../../constants/regex";
import { toUpper, getSecureStore } from "../../constants/helper";
import BankIcon from "../../assets/images/common/bankicon.svg";
import global from "../../utils/GlobalStyles";
import color from "../../utils/Color";
import { editEnrolledAccounts, deleteEnrolledAccounts, listEnrolledAccounts } from "../../api/cashout";

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

const ProfileEditBankDetails = ({ navigation, route }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const fieldCount = 1;
  const inputs = useRef([]);
  const { id, bankId } = route.params;
  const dispatch = useDispatch();
  const banks = useSelector(state => state.banks.banks);
  const customerInfo = useSelector(state => state.customer.customer_info);
  const referencesInfo = useSelector(state => state.references.references);
  const bankList = referencesInfo.banks;
  const bankListData = bankList.map(bL => bL.content).flat();
  const selectedBankData = bankListData.find(bL => bL.key === String(bankId));
  const bankAccountNoLength = selectedBankData.account_number_length;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [focus, setFocus] = useState({ name: false, account_no: false });
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({ id: "", bank_id: "", bank_name: "", account_no: "", name: "" });
  const [error, setError] = useState(false);
  const [successModalDetails, setSuccessModalDetails] = useState({
    success: true,
    title: "",
    open: false,
  });

  const deleteAlertActionSheetRef = useRef();
  const deleteAlertScrollViewRef = useRef();

  const onFocus = (_fieldName) => {
    setFocus({ ...focus, [_fieldName]: true });
  };

  const onBlur = (_fieldName) => {
    setFocus({ ...focus, [_fieldName]: false });
  };

  const handleClose = () => {
    if (banks.length === 0) {
      navigation.navigate("ProfileOptions");
    } else {
      navigation.navigate("ProfileEnrolledBanks");
    }
  };

  const getListEnrolledAccounts = async () => {
    console.log("ProfileEditBankDetails: Retrieving enrolled banks");
    await listEnrolledAccounts(`?partyId=${customerInfo.party_id}`)
      .then((response) => {
        const enrolledBanks = [];
        const { data } = response;
        if (data.message === "Successfully retrieved cash out accounts") {
          console.log("ProfileEditBankDetails: Retrieving enrolled banks - Success");
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
      console.log("ProfileEditBankDetails: Updating enrolled banks");
      setIsLoading(true);
      const deviceInfo = await getSecureStore("singlifeDeviceInfo");
      const parseDevice = JSON.parse(deviceInfo);
      const editPayload = {
        accountNo: _values.account_no,
        name: _values.name,
        bankId: _values.bank_id,
        partyId: customerInfo.party_id,
        deviceId: parseDevice.device_id,
      };
      console.log(editPayload);
      await editEnrolledAccounts(editPayload, id)
        .then((response) => {
          setIsLoading(false);
          const { data } = response;
          if (data.message === "Successfully updated cash out account") {
            console.log("ProfileEditBankDetails: Updating enrolled banks - Success");
            setSuccessModalDetails({
              success: true,
              title: "You’ve successfully updated your bank account details.",
              open: true,
            });
            getListEnrolledAccounts();
          }
        })
        .catch((err) => {
          setIsLoading(false);
          toast.show(`${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
            type: "custom_type",
            placement: "top",
            duration: 3000,
            offset: 10,
            animationType: "zoom-in",
          });
          setSuccessModalDetails({
            success: false,
            title: "Your bank account details were not updated.​",
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

  const openDeleteAlert = () => {
    setTimeout(() => {
      deleteAlertActionSheetRef.current.show();
    }, 200);
  };

  const onDeleteBank = async () => {
    console.log("ProfileEditBankDetails: Deleting enrolled banks");
    deleteAlertActionSheetRef.current.hide();
    setIsLoading(true);
    const deviceInfo = await getSecureStore("singlifeDeviceInfo");
    const parseDevice = JSON.parse(deviceInfo);
    const deletePayload = {
      id,
      partyId: customerInfo.party_id,
      deviceId: parseDevice.device_id,
    };
    await deleteEnrolledAccounts(deletePayload)
      .then((response) => {
        setIsLoading(false);
        const { data } = response;
        if (data.message === "Successfully deleted cash-out account") {
          console.log("ProfileEditBankDetails: Deleting enrolled banks - Success");
          setSuccessModalDetails({
            success: true,
            title: "You’ve successfully removed this bank account.",
            open: true,
          });
          getListEnrolledAccounts();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.show(`${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
      });
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

  useEffect(() => {
    const bankInfo = banks.find((_row) => _row.id === id);
    setInitialValues(bankInfo);
  }, [route]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  const contentRef = useRef();

  return (
    <Container>
      <Header contained="solid" disableDelete={error} onLayout={onHeaderLayout} transparent actionButton="both" back backAction={() => navigation.goBack()} right rightActionText="DELETE" rightAction={openDeleteAlert} />

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
              <View style={[styles.bankItem, global.contentNoTopPadding]}>
                <IconDescription icon={<BankIcon />}>
                  <Typography text={selectedBankData.name} type="body" style={styles.bankName} />
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
                        }}
                        errorText={handleErrorText()}
                      />
                    </Col>
                  </Row>

                  <Row style={global.body}>
                    <Col size={10}>

                      <Text style={global.textlink}>
                        By clicking Save, you agree that the account name provided is the same as the policy owner and that all information above is true and accurate.
                      </Text>
                    </Col>
                  </Row>
                </Grid>

              </View>
              <LoadingScreen isLoading={isLoading} />
            </Content>

            {!isKeyboardVisible && (
            <Footer
              onLayout={onFooterLayout}
              elevation={Platform.OS === "ios" ? viewHeights.wrapper + viewHeights.footer + viewHeights.header + 100 >= screenHeight : viewHeights.wrapper + viewHeights.footer + viewHeights.header + 50 >= screenHeight}
            >
              <Button disabled={error || values.name.trim() === "" || values.account_no.length < 1} onPress={handleSubmit} full variant="primary-contained" text="SAVE" />
            </Footer>
            )}

            <SuccessFail success={successModalDetails.success} open={successModalDetails.open} title={successModalDetails.title} close closeAction={() => handleClose()} navigation={navigation} failAction={() => setSuccessModalDetails({ ...successModalDetails, open: false })} />

            <BottomSheet actionSheetRef={deleteAlertActionSheetRef} scrollViewRef={deleteAlertScrollViewRef}>
              <View style={global.modalViewListItem}>
                <Grid>
                  <Row size={4} style={{ marginHorizontal: "5%" }}>
                    <Col>
                      <Typography text="Are you sure you want to remove this bank account?" type="body" />
                    </Col>
                  </Row>
                  <Row size={4} style={[{ marginHorizontal: "5%" }, global.body]}>
                    <Col>
                      <Button full variant="default-outlined" text="NO" onPress={() => deleteAlertActionSheetRef.current.hide()} />

                      <View style={global.buttonSeparator}>
                        <Button full variant="primary-contained" text="YES" onPress={onDeleteBank} />
                      </View>
                    </Col>
                  </Row>
                </Grid>
              </View>
            </BottomSheet>
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

ProfileEditBankDetails.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
};

ProfileEditBankDetails.defaultProps = {
  route: {},
};

export default ProfileEditBankDetails;
