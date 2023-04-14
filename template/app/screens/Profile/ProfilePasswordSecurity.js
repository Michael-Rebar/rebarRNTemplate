/* eslint-disable no-console */
import React, { useState, useEffect } from "react"; // Add useRef when password for activation is included
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { StyleSheet, TouchableOpacity, Linking, Platform } from "react-native";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
// import { Formik } from "formik";
import * as LocalAuthentication from "expo-local-authentication";
// import * as IntentLauncher from "expo-intent-launcher";
import ArrowIcon from "../../assets/images/common/path.svg";
// import Button from "../../components/Buttons/Button";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
// import PasswordField from "../../components/Textfields/PasswordField";
import ToggleSwitch from "../../components/ToggleSwitch";
import LoadingScreen from "../../components/LoadingScreen";
import global from "../../utils/GlobalStyles";
// import BottomSheet from "../../components/BottomSheet";

// API
// import { passwordCheck } from "../../api/login"; // Remove from Drop 1
import { getSecureStore, saveSecureStore } from "../../constants/helper";

const styles = StyleSheet.create({
  menu: {
    width: "100%",
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  switchCol: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default function PasswordSecurity({ navigation }) {
  // Remove from Drop 1
  // const activateAlertActionSheetRef = useRef();
  // const activateAlertScrollViewRef = useRef();
  // const [fieldMargin, setFieldMargin] = useState(0);

  // const [password, setPassword] = useState("");
  const [biometrics, setBiometrics] = useState({
    type: "",
    compatible: false,
    records: false,
  });

  const [enabledBiometrics, setEnabledBiometrics] = useState({
    fingerprint_id_enabled: 0,
    face_id_enabled: 0,
  });

  // Remove from Drop 1
  // const [error, setError] = useState(false);
  // const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.push("Placeholder", {
        page: "ProfilePasswordSecurity",
        next: "",
      });
    }, 1500);
  };

  const getBiometrics = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const type = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const records = await LocalAuthentication.isEnrolledAsync();

    setBiometrics({
      ...biometrics,
      compatible,
      type,
      records,
    });
  };

  const onChangeBiometric = async (key) => {
    setIsLoading(true);
    const deviceInfo = await getSecureStore("singlifeDeviceInfo");
    const parseDevice = JSON.parse(deviceInfo);

    setEnabledBiometrics({
      ...enabledBiometrics,
      [key]: 1,
    });

    const updatedDeviceInfo = {
      ...parseDevice,
      ...enabledBiometrics,
    };

    await saveSecureStore("singlifeDeviceInfo", JSON.stringify(updatedDeviceInfo));
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Remove from Drop 1
    // activateAlertActionSheetRef.current.show();
  };

  // Remove from Drop 1
  // const onSubmitActivation = async () => {
  //   setIsLoading(true);
  //   const deviceInfo = await getSecureStore("singlifeDeviceInfo");
  //   const parseDevice = JSON.parse(deviceInfo);

  //   const payload = {
  //     password,
  //   };

  //   await passwordCheck(payload)
  //     .then((response) => {
  //       const { data } = response;
  //       console.log(data);
  //       if (data.message === "Password verified.") {
  //         setError(false);
  //         setErrorText("");
  //         activateAlertActionSheetRef.current.hide();

  //         const updatedDeviceInfo = {
  //           ...parseDevice,
  //           ...enabledBiometrics,
  //         };

  //         saveSecureStore("singlifeDeviceInfo", JSON.stringify(updatedDeviceInfo));
  //         setIsLoading(false);
  //       } else {
  //         setError(true);
  //         setErrorText("Please enter the correct password.");
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       console.log("ERROR_PASSWORD_CHECK");
  //       console.log("err", err);
  //     });
  // };

  // const openSettings = () => {
  //   if (Platform.OS === "android") {
  //     IntentLauncher.startActivityAsync(IntentLauncher.ACTION_SECURITY_SETTINGS);
  //   }

  //   Linking.openURL("App-Prefs:root");
  // };

  useEffect(() => {
    getBiometrics();
    (async () => {
      const deviceInfo = await getSecureStore("singlifeDeviceInfo");
      const parseDevice = JSON.parse(deviceInfo);

      if (deviceInfo !== null) {
        setEnabledBiometrics({
          fingerprint_id_enabled: parseDevice.fingerprint_id_enabled,
          face_id_enabled: parseDevice.face_id_enabled,
        });
      }
      return true;
    })();
  }, []);

  return (
    <Container>
      <Header contained="solid" transparent back backAction={() => navigation.navigate("ProfileOptions")} actionButton="left" />

      <Content style={global.wrapper}>
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography text="Password & Security" type="title3" />

          <Grid style={global.body}>
            {(biometrics.compatible || biometrics.records) && (
              <View>
                {(biometrics.type.includes(2)) && (
                  <Row size={4}>
                    <Col size={3}>
                      <View style={styles.menu}>
                        <Typography type="body-bold" text="FACE ID" />
                      </View>
                    </Col>
                    <Col size={1} style={styles.switchCol}>
                      <ToggleSwitch
                        value={enabledBiometrics.face_id_enabled === 1}
                        onAsyncPress={async () => {
                          await onChangeBiometric("face_id_enabled");
                        }}
                      />
                    </Col>
                  </Row>
                )}

                {(biometrics.type.includes(1)) && (
                  <Row size={4} style={global.fieldSeparator}>
                    <Col size={3}>
                      <View style={styles.menu}>
                        <Typography type="body-bold" text="TOUCH ID" />
                      </View>
                    </Col>
                    <Col size={1} style={styles.switchCol}>
                      <ToggleSwitch
                        value={enabledBiometrics.fingerprint_id_enabled === 1}
                        onAsyncPress={async () => {
                          await onChangeBiometric("fingerprint_id_enabled");
                        }}
                      />
                    </Col>
                  </Row>
                )}
              </View>
            )}

            <Row size={4} style={global.fieldSeparator}>
              <Col>
                <TouchableOpacity style={styles.menu} onPress={() => handleChangePassword()}>
                  <View style={styles.menuText}>
                    <Typography type="body-bold" text="CHANGE PASSWORD" />
                  </View>
                  <ArrowIcon />
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </View>
        <LoadingScreen isLoading={isLoading} />
      </Content>

      {/* Remove from Drop 1 */}
      {/* <BottomSheet actionSheetRef={activateAlertActionSheetRef} scrollViewRef={activateAlertScrollViewRef} onClose={() => setFieldMargin(0)} persistTap>
        <View style={global.modalView}>
          <Grid style={{ marginHorizontal: "3%" }}>
            <Row size={4}>
              <Col>
                <Typography text="Activate Biometrics" type="title3" />
              </Col>
            </Row>
            <Row size={4} style={global.fieldSeparator}>
              <Formik
                initialValues={{ password }}
                onSubmit={null}
              >
                {({ handleChange }) => (
                  <Grid style={global.fieldSeparator}>
                    <Row size={4}>
                      <Col>
                        <PasswordField
                          maxLength={20}
                          type="password"
                          label="Password"
                          value={password}
                          onChangeText={(value) => {
                            handleChange("password");
                            setPassword(value);
                            setError(false);
                          }}
                          onFocus={() => setTimeout(() => {
                            setFieldMargin(110);
                          }, 100)}
                          onBlur={() => setFieldMargin(0)}
                          error={error}
                          errorText={errorText}
                        />
                      </Col>
                    </Row>
                  </Grid>
                )}
              </Formik>
            </Row>

            <Row size={4} style={global.fieldSeparator}>
              <Col style={{ marginBottom: fieldMargin }}>
                <Button onPress={onSubmitActivation} disabled={error || !password} full variant="primary-contained" text="CONFIRM" />
              </Col>
            </Row>
          </Grid>
        </View>
      </BottomSheet> */}
    </Container>
  );
}

PasswordSecurity.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
