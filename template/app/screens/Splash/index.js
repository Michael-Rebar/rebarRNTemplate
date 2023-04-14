/* eslint-disable no-console */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Animated, Easing, Platform } from "react-native";
import uuid from "uuid";
import publicIP from "react-native-public-ip";
import Constants from "expo-constants";
import * as Application from "expo-application";
import * as Device from "expo-device";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import Logo from "../../assets/images/common/logo.png";

// Helper - Utils - Constant
import logoutFunction from "../../utils/Logout";
import { parseNationality, parseAddress, getSecureStore, saveSecureStore } from "../../constants/helper";

// Redux
import { resetCustomerInfo } from "../../redux/customer";

// API
import credentials from "../../api/config/credentials";
import { getAccessToken } from "../../api/auth";
import { updateReference } from "../../redux/references";
import { getRegionById, getProvincesById, getCities } from "../../api/references/address";
import { getCountryCodeList, getNationalities } from "../../api/references/nationalities";
import { getCountries } from "../../api/references/countries";

const spinValue = new Animated.Value(0);
const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff3737",
  },
  splashLogo: {
    width: 120,
    height: 120,
    transform: [{ rotate: spin }],
  },
});

Animated.loop(
  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    },
  ),
).start();

function Splash({ navigation }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const deviceDetails = {
    device_id: Platform.OS === "ios" ? null : Application.androidId,
    device_uuid: uuid(),
    os_type: Device.osName,
    os_version: Device.osVersion,
    manufacturer: Device.manufacturer,
    model: Device.modelName,
    token: uuid(),
    app_version: Constants.manifest.version,
    fingerprint_id_enabled: 0,
    face_id_enabled: 0,
    biometrics_reminder: true,
    ip_address: null,
  };

  const nationalitiesList = async () => {
    await getNationalities()
      .then((response) => {
        const { data } = response;
        const payload = {
          key: "nationalities",
          data: parseNationality(data.result),
        };

        const rawPayload = {
          key: "nationalities_raw",
          data: data.result,
        };

        dispatch(updateReference(payload));
        dispatch(updateReference(rawPayload));
      })
      .catch((err) => {
        toast.show(`Error: Nationalities: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
      });
  };

  const countriesList = async () => {
    await getCountries()
      .then((response) => {
        const { data } = response;
        const payload = {
          key: "countries",
          data: parseNationality(data.result),
        };

        const rawPayload = {
          key: "countries_raw",
          data: data.result,
        };

        dispatch(updateReference(payload));
        dispatch(updateReference(rawPayload));
      })
      .catch((err) => {
        toast.show(`Error: Countries: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
      });
  };

  const regionsList = async () => {
    await getRegionById()
      .then((response) => {
        const { data } = response;
        const payload = {
          key: "regions",
          data: [data.result],
        };

        dispatch(updateReference(payload));
      })
      .catch((err) => {
        toast.show(`Error: Regions: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
      });
  };

  const provincesList = async () => {
    await getProvincesById()
      .then((response) => {
        const { data } = response;
        const payload = {
          key: "provinces",
          data: [data.result],
        };

        dispatch(updateReference(payload));
      })
      .catch((err) => {
        toast.show(`Error: Provinces: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
      });
  };

  const citiesList = async () => {
    await getCities()
      .then((response) => {
        const { data } = response;
        const payload = {
          key: "cities",
          data: parseAddress(data.result, 1),
        };

        const rawPayload = {
          key: "cities_raw",
          data: data.result,
        };

        dispatch(updateReference(payload));
        dispatch(updateReference(rawPayload));
      })
      .catch((err) => {
        toast.show(`Error: Cities: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
      });
  };

  const countryCodeList = async () => {
    await getCountryCodeList()
      .then((response) => {
        const { data } = response;
        const rawPayload = {
          key: "country_code_raw",
          data: data.result,
        };

        dispatch(updateReference(rawPayload));
      })
      .catch((err) => {
        toast.show(`Error: Country Code: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
      });
  };

  const authAccess = async () => {
    const payload = {
      clientId: credentials.dev.client_id,
      clientSecret: credentials.dev.client_secret,
      grantType: credentials.dev.grant_type,
    };

    await getAccessToken(payload)
      .then((response) => {
        const { data } = response;

        if (data.status === 201) {
          saveSecureStore("accessToken", data.result.accessToken);
          nationalitiesList();
          countriesList();
          countryCodeList();
          regionsList();
          provincesList();
          citiesList();
        }
      })
      .catch((err) => {
        toast.show(`Error: Get Auth Token: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
      });
  };

  useEffect(() => {
    authAccess();

    (async () => {
      const tokens = await getSecureStore("singlifeTokens");
      const parseTokens = JSON.parse(tokens);
      const deviceInfo = await getSecureStore("singlifeDeviceInfo");
      const parseDevice = JSON.parse(deviceInfo);
      const isOnboarded = await AsyncStorage.getItem("isOnboarded");

      if (deviceInfo === null) {
        let updatedDeviceDetails = {};

        publicIP()
          .then(ip => {
            updatedDeviceDetails = {
              ...deviceDetails,
              ip_address: ip,
            };

            saveSecureStore("singlifeDeviceInfo", JSON.stringify(updatedDeviceDetails));
            setTimeout(() => {
              navigation.push("OnboardingSlide");
            }, 3000);
          })
          .catch(err => {
            toast.show(`Error: Get IP Address: ${(typeof (err.response.data) === 'string') ? err.response.data : ''} ${(err.response.data.message) ? err.response.data.message : ''}`, {
              type: "custom_type",
              placement: "top",
              duration: 3000,
              offset: 10,
              animationType: "zoom-in",
            });
          });
      } else {
        setTimeout(() => {
          if (isOnboarded === null && isOnboarded !== "1") {
            navigation.push("OnboardingSlide");
          } else if (parseDevice.fingerprint_id_enabled === 1 || parseDevice.face_id_enabled === 1) {
            navigation.push("BiometricsLogin");
          } else if (parseDevice?.mobile_num !== undefined && parseDevice?.mobile_num !== "") {
            navigation.push("SsoTool", {
              mobileNum: parseDevice.mobile_num,
            });
          } else {
            navigation.push("Login");
          }
        }, 3000);
      }

      if (parseTokens !== null) {
        const logoutResponse = await logoutFunction();
        console.log("LOGOUT_RESPONSE", logoutResponse);
      }

      dispatch(resetCustomerInfo());
      return true;
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={styles.splashLogo}
        source={Logo}
      />
    </View>
  );
}

Splash.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Splash;
