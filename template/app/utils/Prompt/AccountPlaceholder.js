import React from "react";
import PropTypes from "prop-types";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, StatusBar, Dimensions, Platform } from "react-native";
import { Container, Content, View } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import { resetUserInfo } from "../../redux/user";
import { resetCashInHistory } from "../../redux/cashin";
import Header from "../../components/Headers/Main";
import Typography from "../../components/Typography";
import FooterAction from "../../components/FooterAction";
import Button from "../../components/Buttons/Button";
import global from "../GlobalStyles";

import color from "../Color";
import CashInSucceding from "../../screens/CashIn/CashInSucceding";
import AccountTabActiveIcon from "../../assets/images/pfe/tab-account-active.svg";
import AccountTabInactiveIcon from "../../assets/images/pfe/tab-account-inactive.svg";
import CashInTabActiveIcon from "../../assets/images/pfe/tab-cashin-active.svg";
import CashInTabInactiveIcon from "../../assets/images/pfe/tab-cashin-inactive.svg";
import ProtectTabActiveIcon from "../../assets/images/pfe/tab-protect-active.svg";
import ProtectTabInactiveIcon from "../../assets/images/pfe/tab-protect-inactive.svg";

function AccountTab() {
  return <View />;
}

const screenHeight = Dimensions.get("screen").height - StatusBar.currentHeight;
const styles = StyleSheet.create({
  container: {
    height: screenHeight,
  },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
});

function PlaceHolder({ navigation }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.user_info);
  const onLogout = () => {
    if (userInfo.biometrics.finger_id || userInfo.biometrics.face_id) {
      navigation.push("BiometricsLogin");
    } else {
      navigation.push("Login");
      dispatch(resetUserInfo());
    }

    dispatch(resetCashInHistory());
  };

  return (
    <Container style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <Header
        notificationAction={() => navigation.push("Notification")}
        profileAction={() => navigation.navigate("ProfileOptions")}
      />

      <Content style={global.wrapper} contentContainerStyle={styles.content}>
        <View style={global.content}>
          <Typography text="Account Placeholder" type="body-bold" />

          <View style={global.fieldSeparator}>
            <Button
              full
              variant="primary-contained"
              text="Logout"
              onPress={onLogout}
            />
          </View>
        </View>
      </Content>
      <FooterAction navigation={navigation} />
    </Container>
  );
}
const Tab = createBottomTabNavigator();

export default function AccountPlaceholder({ navigation }) {
  const cashInInfo = useSelector(state => state.cashin.cashIn);

  return (
    <Tab.Navigator
      initialRouteName={cashInInfo.fail ? "Cash In" : "Account"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === "Account") {
            icon = focused ? <AccountTabActiveIcon /> : <AccountTabInactiveIcon />;
          } else if (route.name === "Cash In") {
            icon = focused ? <CashInTabActiveIcon /> : <CashInTabInactiveIcon />;
          } else if (route.name === "Protect") {
            icon = focused ? <ProtectTabActiveIcon /> : <ProtectTabInactiveIcon />;
          }
          return icon;
        },
      })}
      tabBarOptions={{
        style: {
          height: Platform.OS === "ios" ? 100 : 64,
        },
        activeTintColor: color.orangeRed,
        inactiveTintColor: color.placeholder,
        labelStyle: {
          paddingBottom: 8,
          textTransform: "uppercase",
          fontFamily: "SharpSansSemibold",
          fontSize: RFValue(12),
          fontWeight: "600",
          lineHeight: RFValue(18),
          letterSpacing: 0.5,
        },
      }}
    >
      <Tab.Screen name="Account" component={PlaceHolder} navigation={navigation} />
      <Tab.Screen
        name="Cash In"
        component={CashInSucceding}
        navigation={navigation}
        listeners={() => ({
          tabPress: e => {
            if (cashInInfo.history.length === 0) {
              e.preventDefault();
            }
          },
        })}
      />
      <Tab.Screen
        name="Protect"
        component={AccountTab}
        navigation={navigation}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
          },
        })}
      />
    </Tab.Navigator>
  );
}

// This is just temporary
PlaceHolder.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

AccountPlaceholder.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
