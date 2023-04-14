import React, { useRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Animated } from "react-native";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import GrayTextIconButton from "../../components/Buttons/GrayTextIconButton";
import TermsIcon from "../../assets/images/onboarding/terms-icon.svg";
import PrivacyPolicyIcon from "../../assets/images/onboarding/policy.svg";
import SecurityIcon from "../../assets/images/onboarding/security-icon.svg";
import CharterIcon from "../../assets/images/onboarding/charter-icon.svg";
import global from "../../utils/GlobalStyles";

// Helper - Utils - Constants
import { singlifeInternetSecurityUrl, singlifeCustomerCharterUrl, singLifePrivacyPolicyUrl } from "../../constants/constants";

const styles = StyleSheet.create({
  buttonText: {
    letterSpacing: 0.5,
    lineHeight: 16,
    marginTop: 15,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default function Legal({ navigation }) {
  const offset = useRef(new Animated.Value(0)).current;
  const onRedirect = (url) => {
    navigation.push("Webview", {
      passUrl: url,
    });
  };

  return (
    <Container>
      <Header contained="solid" transparent animated animatedValue={offset} back backAction={() => navigation.goBack()} actionButton="left" />
      <Content
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false },
        )}
        style={global.wrapper}
      >
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography type="title3" text="Legal" />

          <Grid style={global.body}>
            <Row style={global.fieldSeparator}>
              <Col style={global.betweenButtonsLeft}>
                <GrayTextIconButton onPress={() => navigation.navigate("TermsOfUse")}>
                  <TermsIcon />
                  <Typography type="body-bold1" text="TERMS OF USE" style={styles.buttonText} />
                </GrayTextIconButton>
              </Col>

              <Col style={global.betweenButtonsRight}>
                <GrayTextIconButton onPress={() => onRedirect(singLifePrivacyPolicyUrl)}>
                  <PrivacyPolicyIcon />
                  <Typography type="body-bold1" text="PRIVACY POLICY" style={styles.buttonText} />
                </GrayTextIconButton>
              </Col>
            </Row>

            <Row style={global.fieldSeparator}>
              <Col style={global.betweenButtonsLeft}>
                <GrayTextIconButton onPress={() => onRedirect(singlifeInternetSecurityUrl)}>
                  <SecurityIcon />
                  <Typography type="body-bold1" text="INTERNET SECURITY INFORMATION POLICY" style={styles.buttonText} />
                </GrayTextIconButton>
              </Col>

              <Col style={global.betweenButtonsRight}>
                <GrayTextIconButton onPress={() => onRedirect(singlifeCustomerCharterUrl)}>
                  <CharterIcon />
                  <Typography type="body-bold1" text="CUSTOMER CHARTER" style={styles.buttonText} />
                </GrayTextIconButton>
              </Col>
            </Row>
          </Grid>
        </View>
      </Content>
    </Container>
  );
}

Legal.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
