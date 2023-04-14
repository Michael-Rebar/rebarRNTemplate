import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { Container, Content, View } from "native-base";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import global from "../../utils/GlobalStyles";
import Illustration from "../../assets/images/onboarding/singlife-account-illus.svg";
import { percentRate } from "../../constants/constants";

const content = [
  "The Singlife Account isn’t just for earning interest on your emergency fund and having a handy Singlife Card. It’s the key to doing more with your money in the app.​",
  `You start off earning 2% interest rate p.a. and having instant coverage for death or disability on day 1. The more complete your Singlife Plan, the higher interest you’ll earn – up to ${percentRate}% interest rate p.a.`,
  "The Singlife Account comes with a wallet to store and pay for your premiums.",
  "We've made it easy so you can also get protected without leaving the app.",
  "Simple, right?",
];

export default function SinglifeAccount({ navigation }) {
  const offset = useRef(new Animated.Value(0)).current;

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
          <Typography type="title3" text="Singlife Account" />
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Illustration height={250} width="85%" />
        </View>

        <View style={global.content}>
          {content.map((desc, _index) => <Typography key={desc.trim()} style={(_index !== 0 ? global.fieldSeparator : null)} text={desc} type="body" />)}
        </View>
      </Content>
    </Container>
  );
}

SinglifeAccount.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
