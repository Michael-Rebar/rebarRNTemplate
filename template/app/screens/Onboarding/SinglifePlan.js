import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { Container, Content, View } from "native-base";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import global from "../../utils/GlobalStyles";
import Illustration from "../../assets/images/onboarding/singlife-plan-illus.svg";

const content = [
  "Being in control starts with understanding your current situation and future goals. It’s about knowing, how much you need, what you need it for, and by when.",
  "This is what we designed the Singlife Plan for: it’s our proprietary financial needs analysis (FNA) tool that supports and guides you in understanding what you need to protect now and in the future.",
  "We'll recommend what you need to protect for, the coverage you need, and what Singlife Protect policies can help you achieve them.",
];

export default function SinglifePlan({ navigation }) {
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
          <Typography type="title3" text="Singlife Plan" />
        </View>

        <Illustration width="100%" height={225} />

        <View style={global.content}>
          {content.map((desc, _index) => <Typography key={desc.trim()} style={(_index !== 0 ? global.fieldSeparator : null)} text={desc} type="body" />)}
        </View>
      </Content>
    </Container>
  );
}

SinglifePlan.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
