/* eslint-disable no-console */
import React, { useState, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import LottieView from 'lottie-react-native';
import { useSelector } from "react-redux";
import Header from "../../components/Headers/Header";
import Typography from "../../components/Typography";
import ArrowIcon from "../../assets/images/common/path.svg";
import CardIcon from "../../assets/images/common/cardicon.svg";
import ProfileIcon from "../../assets/images/common/profileinfo.svg";
import BankIcon from "../../assets/images/common/bankicon.svg";
//import PromotionIcon from "../../assets/images/common/megaphone.svg";
import PasswordIcon from "../../assets/images/common/passwordicon.svg";
import global from "../../utils/GlobalStyles";

const styles = StyleSheet.create({
  menu: {
    width: "100%",
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  menuIcon: {
    marginRight: 20,
  },
  menuText: {
    flex: 2,
  },
  menuArrow: {
    width: 7,
    height: 12,
  },
});

let inactivityTimer = null;
export default function ProfileOptions({ navigation }) {
  const userInfo = useSelector(state => state.user.user_info);
  const banks = useSelector(state => state.banks.banks);
  const menu = [
    {
      icon: <CardIcon style={styles.menuIcon} />,
      text: "Customer ID",
      url: "ProfileCustomerId",
      position: "upper",
    },
    {
      icon: <ProfileIcon style={styles.menuIcon} />,
      text: "Profile Information",
      url: "MainProfile",
      position: "upper",
    },
    {
      icon: <BankIcon style={styles.menuIcon} />,
      text: "Enrolled Bank Accounts",
      url: banks.length === 0 ? "ProfileSelectBanks" : "ProfileEnrolledBanks",
      position: "upper",
    },
    /*{
      icon: <PromotionIcon style={styles.menuIcon} />,
      text: "Promotions & Campaigns",
      url: "ProfilePromotionsAndCampaigns",
      position: "upper",
    },*/
    {
      icon: <PasswordIcon style={styles.menuIcon} />,
      text: "Password & Security",
      url: "ProfilePasswordSecurity",
      position: "upper",
    },
  ];

  const flagRef = createRef();

  const biometricActionSheetRef = createRef();
  const biometricScrollViewRef = createRef();

  const logoutAlertActionSheetRef = createRef();
  const logoutAlertScrollViewRef = createRef();

  const inactivityAlertActionSheetRef = createRef();
  const inactivityAlertScrollViewRef = createRef();

  // biometrics login
  const [allowBiometrics, setAllowBiometrics] = useState(true);

  // inactivity alert
  const [inactivityTimeCount, setInactivityTimeCount] = useState(0);
  const [inactivityTimeStart, setInactivityTimeStart] = useState(false);

  const [logoutTimeCount, setLogoutTimeCount] = useState(10);
  const [logoutTimeStart, setLogoutTimeStart] = useState(false);

  const [force, setForce] = useState(false);
  const [progress, setProgress] = useState(0);

  const hideBiometricsAlert = () => {
    if (flagRef.current !== 1) {
      biometricActionSheetRef.current.hide();
      setAllowBiometrics(false);
      setInactivityTimeStart(true);
    }
  };

  const hideInactivityAlert = () => {
    inactivityAlertActionSheetRef.current.hide();
    setInactivityTimeCount(0);
    setLogoutTimeCount(10);
    setLogoutTimeStart(false);
  };

  const renderMenu = (item, position) => item.map(row => {
    if (position === row.position) {
      return (
        <Row size={4} style={global.buttonSeparator} key={`menu-${row.text}`}>
          <Col>
            <TouchableOpacity style={styles.menu} onPress={() => { setInactivityTimeStart(false); navigation.push(row.url); }}>
              {row.icon}

              <View style={styles.menuText}>
                <Typography type="body-bold" text={row.text} />
              </View>

              <ArrowIcon />
            </TouchableOpacity>
          </Col>
        </Row>
      );
    }

    return false;
  });

  const onLogout = async () => {
    setInactivityTimeCount(300);
    setLogoutTimeStart(true);
    setLogoutTimeCount(0);
    setForce(true);

    // Added when logging out
    if (biometricActionSheetRef) {
      biometricActionSheetRef.current.hide();
    }

    if (inactivityAlertActionSheetRef) {
      inactivityAlertActionSheetRef.current.hide();
    }

    if (logoutAlertActionSheetRef) {
      logoutAlertActionSheetRef.current.hide();
    }

    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }

    navigation.reset({
      routes: [{ name: "Login" }],
    });
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }, []);

  return (
    <Container>
      <Header back backAction={() => navigation.navigate("MainTab")} transparent />

      <Content style={global.wrapper}>
        <View style={global.content}>
          <View alignItems="center">
            <LottieView
              style={{ height: 500 }}
              source={require('../../assets/lottie-json/card_front_back.json')}
              progress={progress}
              autoPlay
              loop
            />
          </View>


        </View>
      </Content>
    </Container>
  );
}

ProfileOptions.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
