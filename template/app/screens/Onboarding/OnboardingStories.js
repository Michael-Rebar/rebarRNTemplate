import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Platform, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Constants from "expo-constants";
import Typography from "../../components/Typography";
import Button from "../../components/Buttons/Button";
import global from "../../utils/GlobalStyles";
import InvertedLogo from "../../assets/images/common/logo-white.svg";
import Illustration1 from "../../assets/images/onboarding/onboarding-1.svg";
import Illustration2 from "../../assets/images/onboarding/onboarding-2.svg";
import Illustration3 from "../../assets/images/onboarding/onboarding-3.svg";
import Illustration4 from "../../assets/images/onboarding/onboarding-4.svg";
import HeaderProgressBar from "../../components/HeaderProgressBar";
import color from "../../utils/Color";

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentPadding: {
    paddingBottom: 0,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  imageContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    marginBottom: -13,
  },
  barContainer: {
    ...Platform.select({
      ios: {
        marginTop: Constants.statusBarHeight - 20,
      },
      android: {
        marginTop: Constants.statusBarHeight + 20,
      },
      default: {
        // other platforms, web for example
        marginTop: Constants.statusBarHeight + 20,
      },
    }),
    alignContent: "center",
    paddingBottom: 10,
  },
  root: {
    flex: 1,
  },
  icon: {
    color: color.white,
  },
  floatingClose: {
    ...Platform.select({
      ios: {
        top: StatusBar.currentHeight + 135,
      },
      android: {
        top: StatusBar.currentHeight + 80,
      },
      default: {
        top: 90,
      },
    }),
    position: "absolute",
    width: "100%",
    zIndex: 2,
    elevation: 2,
    alignItems: "flex-end",
    right: "5%",
  },
  floatingButton: {
    paddingHorizontal: "5%",
    bottom: 20,
    position: "absolute",
    width: "100%",
    zIndex: 2,
    elevation: 2,
    alignItems: "center",
  },
});

let timer1 = null;
let timer2 = null;
let timer3 = null;
const timer4 = null;

export default function OnboardingStories({ navigation }) {
  const [index, setIndex] = useState(1);
  const [bgColor, setBgColor] = useState("#FF0008");
  const [title, setTitle] = useState("A better, smarter emergency fund");
  const [description, setDescription] = useState("An account for your emergency fund that earns more interest as you protect yourself from day 1 and comes with nifty Singlife Card.");
  const [illustration, setIllustration] = useState(<Illustration1 width="70%" height="100%" />);
  const [hidden, setHidden] = useState("none");
  const [duration, setDuration] = useState(5000);

  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);

  const onboarding4 = () => {
    setIndex(4);
    setBgColor("#FF0008");
    setTitle("You’re in control");
    setDescription("We put you in control of how you save and get protected with just your mobile phone.");
    setIllustration(<Illustration4 width={width * 0.99} height={width * 1.12} />);
    setHidden("flex");

    setValue4(100.9);
    setDuration(5000);
  };

  const onboarding3 = () => {
    setIndex(3);
    setBgColor("#FFD504");
    setTitle("Protection is saving");
    setDescription("We give you the tools to prepare yourself for expected & unexpected financial needs. As you take more control we reward you with a higher interest rate to grow your emergency fund with.");
    setIllustration(<Illustration3 width={width * 0.99} height={width * 1} />);
    setHidden("none");

    setValue3(100.9);
    setDuration(5000);

    timer3 = setTimeout(() => {
      onboarding4();
    }, 5000);
  };

  const onboarding2 = () => {
    setIndex(2);
    setBgColor("#6CD3C9");
    setTitle("Saving is protection");
    setDescription("Building an emergency fund is the 1st step to protecting yourself.");
    setIllustration(<Illustration2 width={width * 0.99} height={width * 1.12} />);

    setValue2(100.9);
    setDuration(5000);

    timer2 = setTimeout(() => {
      onboarding3();
    }, 5000);
  };

  const onboarding1 = () => {
    setIndex(1);
    setBgColor("#FF0008");
    setTitle("A better, smarter emergency fund");
    setDescription("An account for your emergency fund that earns more interest as you protect yourself from day 1 and comes with nifty Singlife Card.");
    setIllustration(<Illustration1 width="70%" height="100%" />);
    setValue1(100.9);
    setDuration(5000);

    timer1 = setTimeout(() => {
      onboarding2();
    }, 5000);
  };

  const clearOnboarding1 = () => {
    clearTimeout(timer1);
    setValue1(0);
    setDuration(10);
  };

  const clearOnboarding2 = () => {
    clearTimeout(timer2);
    setValue2(0);
    setDuration(10);
  };

  const clearOnboarding3 = () => {
    clearTimeout(timer3);
    setValue3(0);
    setDuration(10);
  };

  const clearOnboarding4 = () => {
    clearTimeout(timer4);
    setValue4(0);
    setDuration(10);
  };

  const skipOnboarding1 = () => {
    clearTimeout(timer1);
    setValue1(99.99);
    setDuration(10);
  };

  const skipOnboarding2 = () => {
    clearTimeout(timer2);
    setValue2(99.99);
    setDuration(10);
  };

  const skipOnboarding3 = () => {
    clearTimeout(timer3);
    setValue3(99.99);
    setDuration(10);
  };

  useEffect(() => {
    onboarding1();
  }, []);

  const previousStory = () => {
    if (index === 1) {
      clearOnboarding1();

      setTimeout(() => {
        onboarding1();
      }, 90);
    } else if (index === 2) {
      clearOnboarding2();
      clearOnboarding1();

      setTimeout(() => {
        onboarding1();
      }, 90);
    } else if (index === 3) {
      clearOnboarding3();
      clearOnboarding2();

      setTimeout(() => {
        onboarding2();
      }, 90);
    } else if (index === 4) {
      clearOnboarding4();
      clearOnboarding3();

      setTimeout(() => {
        onboarding3();
      }, 90);
    }
  };

  const nextStory = () => {
    if (index === 1) {
      skipOnboarding1();

      setTimeout(() => {
        onboarding2();
      }, 90);
    } else if (index === 2) {
      skipOnboarding2();

      setTimeout(() => {
        onboarding3();
      }, 90);
    } else if (index === 3) {
      skipOnboarding3();

      setTimeout(() => {
        onboarding4();
      }, 90);
    }
  };

  const onLongPress = () => {
    // console.log("TRIGGER LOONNG PRESS");
  };

  return (
    <Container style={{ backgroundColor: bgColor }}>
      <View style={{ position: "absolute", width: "100%", zIndex: 1, elevation: 1 }}>
        <Row>
          <TouchableOpacity style={{ width: "50%" }} onPress={() => previousStory()} onLongPress={() => onLongPress()}>
            <Col style={{ height, backgroundColor: "transparent", opacity: 0.4 }} />
          </TouchableOpacity>

          <TouchableOpacity style={{ width: "50%" }} onPress={() => nextStory()} onLongPress={() => onLongPress()}>
            <Col style={{ height, backgroundColor: "transparent", opacity: 0.4 }} />
          </TouchableOpacity>
        </Row>
      </View>

      <View style={styles.floatingClose}>
        <TouchableOpacity onPress={() => navigation.push("Login")}>
          <MaterialIcon style={[global.iconColor, styles.icon]} name="close" size={25} />
        </TouchableOpacity>
      </View>

      <View style={styles.floatingButton}>
        <Row style={{ display: hidden }}>
          <Col>
            <TouchableOpacity>
              <Button full variant="default-outlined" text="Get Started" onPress={() => navigation.push("Login")} />
            </TouchableOpacity>
          </Col>
        </Row>
      </View>

      <Content contentContainerStyle={[styles.root, { backgroundColor: bgColor }]}>
        <View style={styles.content}>
          <View style={styles.contentPadding}>
            <Grid style={styles.barContainer}>
              <Row>
                <Col item xs={3} style={{ paddingHorizontal: 2, paddingVertical: 0 }}>
                  <HeaderProgressBar progressVal={value1} durationVal={duration} />
                </Col>
                <Col item xs={3} style={{ paddingHorizontal: 2, paddingVertical: 0 }}>
                  <HeaderProgressBar progressVal={value2} durationVal={duration} />
                </Col>
                <Col item xs={3} style={{ paddingHorizontal: 2, paddingVertical: 0 }}>
                  <HeaderProgressBar progressVal={value3} durationVal={duration} />
                </Col>
                <Col item xs={3} style={{ paddingHorizontal: 2, paddingVertical: 0 }}>
                  <HeaderProgressBar progressVal={value4} durationVal={duration} />
                </Col>
              </Row>
            </Grid>

            <View style={[global.iconListItemCenter, global.iconListItemContentBetween, global.fieldSeparator, { flex: 0 }]}>
              <InvertedLogo />
            </View>

            <Typography text={title} type="title" style={[global.body, { color: index === 3 ? color.black : color.white }]} />
            <Typography text={description} type="body-bold" style={[global.fieldSeparator, { color: index === 3 ? color.black : color.white }]} />
          </View>

          <View style={styles.imageContent}>
            {illustration}
          </View>
        </View>
      </Content>
    </Container>
  );
}

OnboardingStories.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
