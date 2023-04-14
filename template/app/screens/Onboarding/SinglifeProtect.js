import React, { useRef } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet, Dimensions, Animated } from "react-native";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import PfeIllus from "../../assets/images/onboarding/pfe-illus.svg";
// import PffIllus from "../../assets/images/onboarding/pff-illus.svg";
// import PfmbIllus from "../../assets/images/onboarding/pfmb-illus.svg";
// import PfilIllus from "../../assets/images/onboarding/pfil-illus.svg";
import color from "../../utils/Color";
import global from "../../utils/GlobalStyles";

const itemHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderColor: color.veryLightPink,
    borderRadius: 4,
    paddingTop: 24,
    overflow: "hidden",
  },
  listDescription: {
    paddingHorizontal: 24,
  },
  listContent: {
    flexDirection: "column",
    height: itemHeight * 0.54,
    justifyContent: "space-between",
    marginTop: 24,
  },
  bottomContent: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  learnMoreButton: {
    position: "absolute",
    bottom: 24,
    left: 24,
  },
});

const content = [
  "After you’ve understood your financial needs, it's time to look at Singlife Protect: the easiest way to turn your Singlife Plan into reality.",
  "Singlife Protect policies are designed to be extra flexible. You'll find just the right coverage to that fits your budget and needs, made available 24/7 on your mobile. It's protection in your pocket.",
];
const items = [
  {
    key: 1,
    header: "LIFE INSURANCE",
    title: "Protect from Emergency",
    body: "We've made insurance extra flexible. You'll find the right coverage to sustain your lifestyle, for whatever may lie ahead.",
    link: "Learn More",
    image: <PfeIllus />,
  },
  // {
  //   key: 2,
  //   header: "LIFE INSURANCE",
  //   title: "Protect from Income Loss",
  //   body: "Have a continuous monthly income to support you and your family in case of anything that might prevent you from working as usual.",
  //   link: "Learn More",
  //   image: <PfilIllus />,
  // },
  // {
  //   key: 3,
  //   header: "HEALTH INSURANCE",
  //   title: "Protect from Medical Bills",
  //   body: "With our proprietary financial needs analysis (FNA) tool, we'll help you understand what you need to protect now and in the future. ",
  //   link: "Learn More",
  //   image: <PfmbIllus />,
  // },
  // {
  //   key: 4,
  //   header: "HEALTH INSURANCE",
  //   title: "Protect My Future",
  //   body: "Lorem ipsum dolor sir amet, consectetur adipiscing elit. Phasellus pellentesque ut ante non sodales. Cras feugiat fringilla purus vel laoreet. Quisque congue sapien felis, id tincidunt massa commodo ultricies.",
  //   link: "Learn More",
  //   image: <PffIllus />,
  // },
];

export default function SinglifeProtect({ navigation }) {
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
          <Typography type="title3" text="Singlife Protect" />

          <Grid style={global.body}>
            <Row size={4}>
              <Col>
                {content.map((desc, _index) => <Typography key={desc.trim()} style={_index !== 0 ? global.fieldSeparator : null} text={desc} type="body" />)}
              </Col>
            </Row>

            {items.map((_row) => (
              <Row size={4} key={`item-${_row.title}`}>
                <Col>
                  <View style={[styles.listItem, styles.listContent]}>
                    <View style={styles.listDescription}>
                      <Typography text={_row.header} type="body1" />
                      <Typography text={_row.title} style={global.buttonSeparator} type="title3" />
                      <Typography text={_row.body} style={global.buttonSeparator} type="body1" />
                    </View>

                    <View style={styles.bottomContent}>
                      <TouchableOpacity style={[global.iconButton, styles.learnMoreButton]}>
                        <Text style={global.textButton}>LEARN MORE</Text>
                      </TouchableOpacity>

                      <View style={styles.vectorImage}>
                        {_row.image}
                      </View>
                    </View>
                  </View>
                </Col>
              </Row>
            ))}
          </Grid>
        </View>
      </Content>
    </Container>
  );
}

SinglifeProtect.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
