/* eslint-disable no-console */
import React, { createRef } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import Header from "../../components/Headers/Common";
import Button from "../../components/Buttons/Button";
import Typography from "../../components/Typography";
import IconDescription from "../../components/IconDescription";
import RightChevron from "../../assets/images/icons/right-chevron.svg";
import CardIcon from "../../assets/images/common/cardicon.svg";
import ProfileIcon from "../../assets/images/common/profileinfo.svg";
import BankIcon from "../../assets/images/common/bankicon.svg";
import PromotionIcon from "../../assets/images/common/megaphone.svg";
import PasswordIcon from "../../assets/images/common/passwordicon.svg";
import LogoutIcon from "../../assets/images/icons/logout-icon.svg";
import global from "../../utils/GlobalStyles";
import BottomSheet from "../../components/BottomSheet";

// Redux
import { resetCustomerInfo } from "../../redux/customer";

// API
import { getSecureStore } from "../../constants/helper";
import logoutFunction from "../../utils/Logout";

export default function ProfileOptions({ navigation }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const customerInfo = useSelector(state => state.customer.customer_info);
  const banks = useSelector(state => state.banks.banks);
  const logoutConfirmationAlertActionSheetRef = createRef();
  const logoutConfirmationAlertScrollViewRef = createRef();
  const menu = [
    {
      icon: <CardIcon style={global.menuIcon} />,
      text: "Customer ID",
      url: "ProfileCustomerId",
      hidden: customerInfo.sl_account_no === "",
    },
    {
      icon: <ProfileIcon style={global.menuIcon} />,
      text: "Profile Information",
      url: "MainProfile",
      hidden: false,
    },
    {
      icon: <BankIcon style={global.menuIcon} />,
      text: "Enrolled Bank Accounts",
      url: banks.length === 0 ? "ProfileSelectBanks" : "ProfileEnrolledBanks",
      hidden: customerInfo?.ekycRecord?.ekyc_status_description !== "Clear",
    },
    {
      icon: <PromotionIcon style={global.menuIcon} />,
      text: "Promotions & Campaigns",
      url: "ProfilePromotionsAndCampaigns",
    },
    {
      icon: <PasswordIcon style={global.menuIcon} />,
      text: "Password & Security",
      url: "ProfilePasswordSecurity",
      hidden: false,
    },
  ];

  const handleLogout = async () => {
    const deviceInfo = await getSecureStore("singlifeDeviceInfo");
    const parseDevice = JSON.parse(deviceInfo);

    const logoutResponse = await logoutFunction();
    console.log("LOGOUT_RESPONSE", logoutResponse);

    if (logoutResponse === "SUCCESS") {
      logoutConfirmationAlertActionSheetRef.current.hide();
      if (parseDevice.fingerprint_id_enabled === 1 || parseDevice.face_id_enable === 1) {
        navigation.push("BiometricsLogin");
      } else if (parseDevice?.mobile_num !== "") {
        navigation.reset({
          index: 0,
          routes: [{ name: "SsoTool", params: { mobileNum: `+${parseDevice?.mobile_num}` } }],
        });
      } else {
        dispatch(resetCustomerInfo());

        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } else {
      dispatch(resetCustomerInfo());
      if (parseDevice?.mobile_num !== "") {
        navigation.reset({
          index: 0,
          routes: [{ name: "SsoTool", params: { mobileNum: `+${parseDevice?.mobile_num}` } }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        toast.show(`Error: Logout: ${(typeof (logoutResponse.response.data) === 'string') ? logoutResponse.response.data : ''} ${(logoutResponse.response.data.message) ? logoutResponse.response.data.message : ''}`, {
          type: "custom_type",
          placement: "top",
          duration: 3000,
          offset: 10,
          animationType: "zoom-in",
        });
      }
    }
  };

  const renderMenu = () => menu.filter((item) => !item.hidden).map(row => (
    <Row size={4} style={global.buttonSeparator} key={`menu-${row.text}`}>
      <Col>
        <TouchableOpacity style={global.menu} onPress={() => { navigation.push(row.url); }}>
          <IconDescription icon={row.icon}>
            <View style={[global.row, { justifyContent: "space-between" }]}>
              <Typography type="body-bold" text={row.text} />
              <RightChevron />
            </View>
          </IconDescription>
        </TouchableOpacity>
      </Col>
    </Row>
  ));

  return (
    <Container>
      <Header transparent contained="solid" back backAction={() => { navigation.push("MainTab"); }} actionButton="left" />

      <Content style={global.wrapper}>
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography type="title3" text={`Hello ${customerInfo.personal_info.first_name}!`} />

          <Grid style={global.body}>
            {renderMenu()}

            <Row size={4} style={global.buttonSeparator}>
              <Col>
                <TouchableOpacity style={global.menu} transparent onPress={() => logoutConfirmationAlertActionSheetRef.current.show()}>
                  <IconDescription icon={<LogoutIcon style={global.menuIcon} />}>
                    <View style={[global.row, { justifyContent: "space-between" }]}>
                      <Typography type="body-bold" text="Logout" />
                      <RightChevron />
                    </View>
                  </IconDescription>
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </View>
      </Content>

      <BottomSheet actionSheetRef={logoutConfirmationAlertActionSheetRef} scrollViewRef={logoutConfirmationAlertScrollViewRef}>
        <View style={global.contentNoVertical}>
          <Typography text="Are you sure you want to log out from your account?" type="title3" />
          <Grid style={global.fieldSeparator}>

            <Row size={4} style={global.fieldSeparator}>
              <Col>
                <Button full variant="default-outlined" text="NO" onPress={() => logoutConfirmationAlertActionSheetRef.current.hide()} />

                <View size={4} style={global.buttonSeparator}>
                  <Button full variant="primary-contained" text="LOG OUT" onPress={() => handleLogout()} />
                </View>
              </Col>
            </Row>
          </Grid>
        </View>
      </BottomSheet>
    </Container>
  );
}

ProfileOptions.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
