/* eslint-disable no-console */
import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Clipboard from "expo-clipboard";
import { Container, Content, View, Toast } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useSelector } from "react-redux";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import CopyIcon from "../../assets/images/common/copy-icon.svg";
import CircleCheckIcon from "../../assets/images/common/circle-check-icon.svg";
import global from "../../utils/GlobalStyles";
import color from "../../utils/Color";

// Helper - Utils - Constants
import { formatToEonAccountNumber } from "../../constants/helper";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    borderColor: color.veryLightPink,
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    marginTop: 35,
    padding: 25,
    paddingRight: 5,
  },
  button: { flexDirection: "row", alignItems: "center" },
});

export default function ProfileCustomerId({ navigation }) {
  const customerInfo = useSelector(state => state.customer.customer_info);
  const showToast = () => {
    Toast.show({
      text: (
        <View style={global.toastContent}>
          <CircleCheckIcon width={25} height={25} />
          <Text style={global.toastTextColor}>
            {"   "}
            COPIED
          </Text>
        </View>),
      position: "bottom",
      style: global.toastView,
      textStyle: global.toastText,
      duration: 3000,
    });


    Clipboard.setString(customerInfo.sl_account_no);
  };

  const onBack = () => {
    navigation.reset({
      routes: [{ name: "ProfileOptions" }],
    });
  };

  return (
    <Container>
      <Header contained="solid" transparent back backAction={onBack} actionButton="left" />

      <Content style={global.wrapper}>
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography type="title3" text="This is your Customer ID." />

          <Grid>
            <Row size={4} style={[global.body, styles.box]}>
              <Col size={10.5}>
                <Typography type="body-bold" text={formatToEonAccountNumber(customerInfo.sl_account_no)} />
              </Col>
              <Col size={1.5}>
                <TouchableOpacity
                  transparent
                  style={[global.iconButton, styles.button]}
                  onPress={showToast}
                >
                  <CopyIcon />
                </TouchableOpacity>
              </Col>
            </Row>

            <Row size={4} style={global.body}>
              <Col>
                <Typography type="body" text="In case you encounter any issues, we will ask for your customer ID to verify your identity." />
              </Col>
            </Row>
          </Grid>
        </View>
      </Content>
    </Container>
  );
}

ProfileCustomerId.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
