
import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useSelector } from "react-redux";
import ToggleSwitch from "../../components/ToggleSwitch";
import Header from "../../components/Headers/Common";
import Typography from '../../components/Typography';
import LoadingScreen from "../../components/LoadingScreen";
import global from "../../utils/GlobalStyles";
import SmsIcon from "../../assets/images/common/sms.svg";
import EmailIcon from "../../assets/images/common/email.svg";
import NotifIcon from "../../assets/images/common/notification-icon.svg";
import { singLifePrivacyPolicyUrl } from '../../constants/constants';

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  iconText: {
    marginTop: 0,
  },
  colRow: {
    borderBottomColor: "rgba(229,229,229,1)",
    borderBottomWidth: 1,
    paddingVertical: 30,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  toggleContainer: {
    position: "absolute",
    right: 24,
  },
});

export default function ProfilePromotionsAndCampaigns({ navigation }) {
  const customerInfo = useSelector(state => state.customer.customer_info);
  const [promotionValues, setPromotionValues] = useState({
    sms: [{ value: false, type: "SMS" }],
    push_notification: [{ value: false, type: "Push Notification" }],
    email: [{ value: false, type: "Email" }],
  });
  const [isLoading, setIsLoading] = useState(true);

  const onBack = () => {
    navigation.reset({
      routes: [{ name: "ProfileOptions" }],
    });
  };

  useEffect(() => {
    if (customerInfo.personal_info.mktg_options.length !== 0 && customerInfo.personal_info.mktg_options !== "") {
      setPromotionValues({
        sms: customerInfo.personal_info.mktg_options.filter(row => row.type === "SMS"),
        push_notification: customerInfo.personal_info.mktg_options.filter(row => row.type === "Push Notification"),
        email: customerInfo.personal_info.mktg_options.filter(row => row.type === "Email"),
      });

      setIsLoading(false);
    }
  }, [customerInfo]);

  return (
    <Container>
      <Header contained="solid" transparent back backAction={onBack} actionButton="left" />

      <Content style={global.wrapper}>
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography type="title3" text="Promotions & Campaigns" />
        </View>

        <Grid>
          <Row size={4}>
            <Col style={[global.row, styles.colRow]}>
              <NotifIcon style={styles.icon} />
              <Typography style={styles.iconText} type="body-bold" text="Push Notifications" />
              <View style={styles.toggleContainer}>
                <ToggleSwitch
                  disabled
                  value={promotionValues.push_notification[0].value}
                  // onAsyncPress={() => handleToggle("push_notification", promotions.push_notification)}
                />
              </View>
            </Col>
          </Row>

          <Row size={4}>
            <Col style={[global.row, styles.colRow]}>
              <SmsIcon style={styles.icon} />
              <Typography style={styles.iconText} type="body-bold" text="SMS" />
              <View style={styles.toggleContainer}>
                <ToggleSwitch
                  disabled
                  value={promotionValues.sms[0].value}
                  // onAsyncPress={() => handleToggle("sms", promotions.sms)}
                />
              </View>
            </Col>
          </Row>

          <Row size={4}>
            <Col style={[global.row, styles.colRow]}>
              <EmailIcon style={styles.icon} />
              <Typography style={styles.iconText} type="body-bold" text="Email" />
              <View style={styles.toggleContainer}>
                <ToggleSwitch
                  disabled
                  value={promotionValues.email[0].value}
                  // onAsyncPress={() => handleToggle("email", promotions.email)}
                />
              </View>
            </Col>
          </Row>
        </Grid>

        <Grid>
          <Row size={4} style={global.content}>
            <Col>
              <Text>
                <Typography text="Singlife complies with the Philippines’ data protection laws. Your personal details are safe with us. For more information, please read our " type="body" />
                <Typography
                  onPress={() => {
                    navigation.push("Webview", { passUrl: singLifePrivacyPolicyUrl });
                  }}
                  text="Privacy Policy"
                  type="body-bold"
                  style={global.iconColor}
                />
                <Typography text="." type="body1" />
              </Text>
            </Col>
          </Row>
        </Grid>

        <LoadingScreen isLoading={isLoading} />
      </Content>
    </Container>
  );
}

ProfilePromotionsAndCampaigns.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
