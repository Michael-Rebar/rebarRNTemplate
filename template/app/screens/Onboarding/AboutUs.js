import React, { useRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Linking, Text, Animated } from "react-native";
import { Container, Content, View } from "native-base";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import BurstLogoFaded from "../../assets/images/onboarding/burst-faded.svg";
import LockIcon from "../../assets/images/onboarding/lock icon.svg";
import { helpEmail, contactNumber } from "../../constants/constants";
import global from "../../utils/GlobalStyles";
import color from "../../utils/Color";

const content = `It's difficult to stay in control of your finances. Products have countless variants and advisors give different advice. How do you know what to do next?\n\nWe're here to help you do more with your money. We’re making it easy with our mobile-first tools and solutions.\n\nWe use the smartest technologies to give you 24/7 access and control straight from your mobile phone—so you can live your life with confidence.\n\nWe’re here to unlock the potential of money for everyone.`;

export default function AboutUs({ navigation }) {
  const offset = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create({
    security: {
      backgroundColor: color.black,
    },
    hr: {
      width: 32,
      borderWidth: 1,
      borderColor: color.white,
    },
    burstBackgroundImage: {
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: -1,
    },
  });

  return (
    <Container>
      <Header
        contained="solid"
        back
        backAction={() => navigation.goBack()}
        transparent
        animated
        animatedValue={offset}
      />

      <Content
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false },
        )}
        style={global.wrapper}
      >
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography type="title3" text="Our mission is to unlock the potential of money for everyone." />
          <Typography text={content} type="body" style={global.fieldSeparator} />

          <Typography style={[global.body]} type="title3" text="SINGLIFE PHILIPPINES INC." />
          <Typography style={global.fieldSeparator} type="body" text={`12F Net Quad (now, Four/NEO), 30th Street Cor. 4th Avenue Bonifacio Global City, Taguig, Philippines 1634 \n\n\nOpen Monday to Friday, 9:00 AM to 8:00 PM`} />

          <Text style={[global.textlink, global.fieldSeparator]}>
            Contact us at
            {" "}
            <Text style={[global.textlinkButtonBold, global.iconColor]} onPress={() => Linking.openURL(`mailto:${helpEmail}`)}>{helpEmail}</Text>
            {" or "}
            <Text style={[global.textlinkButtonBold, global.iconColor]} onPress={() => Linking.openURL(`tel:${contactNumber}`)}>{contactNumber}</Text>
            .
          </Text>

          <BurstLogoFaded style={styles.burstBackgroundImage} />
        </View>

        <View style={[global.content, styles.security]}>
          <LockIcon />
          <Typography style={[global.fieldSeparator, global.whiteText]} type="title3" text="Secure, Licensed, and Accredited" />

          <Text style={[global.textlink, global.whiteText, global.fieldSeparator]}>
            Licensed by
            {" "}
            <Text style={[global.textlinkButtonBold, global.textWithUnderline]} onPress={() => Linking.openURL('https://www.insurance.gov.ph')}>Insurance Commission (IC)</Text>
            {" "}
            to operate as a Life Insurance company, with License No. 2020-02-0-A, valid until December 31, 2022.
          </Text>

          <Typography style={[global.fieldSeparator, global.whiteText]} type="body-bold" text="Atty. Brian Gale T. Sibuyan" />
          <Typography style={global.whiteText} type="body" text="Manager" />
          <Typography style={global.whiteText} type="body" text="Regulation, Enforcement and Prosecution" />
          <Typography style={global.whiteText} type="body" text="Division" />

          <Typography style={[global.fieldSeparator, global.whiteText]} type="body-bold" text="LOCAL 115" />
          <Text style={[global.textlinkButtonBold, global.whiteText, global.textWithUnderline]} onPress={() => Linking.openURL('mailto:bgt.sibuyan@insurance.gov.ph')}>
            bgt.sibuyan@insurance.gov.ph
          </Text>

          <View style={[styles.hr, global.fieldSeparator]} />

          <Typography style={[global.fieldSeparator, global.whiteText]} type="body-bold" text="Ma. Lourdes L. Ramos" />
          <Typography style={global.whiteText} type="body" text="Officer-In-Charge" />
          <Typography style={global.whiteText} type="body" text="Public Assistance and Mediation Division" />

          <Typography style={[global.fieldSeparator, global.whiteText]} type="body-bold" text="LOCAL 103" />
          <Text style={[global.textlinkButtonBold, global.whiteText, global.textWithUnderline]} onPress={() => Linking.openURL('mailto:mll.ramos@insurance.gov.ph')}>
            mll.ramos@insurance.gov.ph
          </Text>
          <Text style={[global.textlinkButtonBold, global.whiteText, global.textWithUnderline]} onPress={() => Linking.openURL('mailto:publicassistance@insurance.gov.ph')}>
            publicassistance@insurance.gov.ph
          </Text>
        </View>
      </Content>
    </Container>
  );
}

AboutUs.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
