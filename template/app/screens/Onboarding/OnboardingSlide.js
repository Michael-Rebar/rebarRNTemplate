import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Typography from "../../components/Typography";
import Button from "../../components/Buttons/Button";
import HeaderProgressBar from "../../components/HeaderProgressBar";
import InvertedLogo from "../../assets/images/common/logo-white.svg";
import Illustration1 from "../../assets/final-images/onboarding-slides/slide-1.svg";
import Illustration2 from "../../assets/final-images/onboarding-slides/slide-2.svg";
import Illustration3 from "../../assets/final-images/onboarding-slides/slide-3.svg";
import Illustration4 from "../../assets/final-images/onboarding-slides/slide-4.svg";
import Illustration5 from "../../assets/final-images/onboarding-slides/slide-5.svg";
import color from "../../utils/Color";
import global from "../../utils/GlobalStyles";

// Helper - Utils - Constant
import { percentRate } from "../../constants/constants";
import { getSecureStore, saveSecureStore } from "../../constants/helper";

const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  root: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentPadding: {
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  header: {
    flex: 0,
    marginTop: 30,
  },
  imageContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  icon: {
    color: color.white,
    padding: 10,
    paddingRight: 0,
  },
  progress: {
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: "5%",
    paddingBottom: 20,
  },
});

const content = [
  {
    id: 1,
    title: "Have money when you need it​",
    description: `Build a better and smarter emergency fund with the Singlife Account. It earns up to ${percentRate}% interest p.a.*, gives you coverage for death or disability from day 1, and comes with a handy Singlife Card.\n\n*promo rate`,
    text: color.white,
    bg_color: color.singlifeRed,
    illustration: <Illustration1 width={screenWidth * 1} height={screenWidth * 0.74} />,
  },
  {
    id: 2,
    title: "Learn how to make your money ​work for you​",
    description: "(Coming Soon) Get support and guidance on what you need to protect with the Singlife Plan. It’s our proprietary financial needs analysis tool that grows smarter the more you use it.",
    text: color.white,
    bg_color: color.singlifeRed,
    illustration: <Illustration2 width={screenWidth * 1.5} height={screenWidth * 0.9} />,
  },
  {
    id: 3,
    title: "Do more with your money ​for when things go wrong​",
    description: "(Coming Soon)  You’ll need more than an emergency fund when things really go bad. With Protect from Income Loss and Protect from Medical Bills, you’ll be ready for whatever life throws at you.",
    text: color.white,
    bg_color: color.teal,
    illustration: <Illustration3 width={screenWidth * 1} height={screenWidth * 0.75} />,
  },
  {
    id: 4,
    title: "Do more with your money ​so that things go right​",
    description: "(Coming Soon) You have dreams and goals you want to achieve. With Protect My Future, you’ll get the tools you need to bring these to life.​",
    text: color.black,
    bg_color: color.singlifeYellow,
    illustration: <Illustration4 width={screenWidth * 0.99} height={screenWidth * 0.92} />,
  },
  {
    id: 5,
    title: "Take control of your finances​",
    description: "Get confident in how you save and get protected all through your mobile phone.​",
    text: color.white,
    bg_color: color.singlifeRed,
    illustration: <Illustration5 width={screenWidth * 1} height={screenWidth * 0.97} />,
  },
];

let timer = null;
let timerBack = null;

function OnboardingSlide({ navigation }) {
  const slideRef = useRef({
    slide1: { duration: 5000, progress: 0 },
    slide2: { duration: 5000, progress: 0 },
    slide3: { duration: 5000, progress: 0 },
    slide4: { duration: 5000, progress: 0 },
    slide5: { duration: 5000, progress: 0 },
  });

  const [activeSlide, setActiveSlide] = useState(1);
  const [activeContent, setActiveContent] = useState(content[0]);
  const [slide, setSlide] = useState(slideRef.current);
  const [closing, setClosing] = useState(false);

  const onboarding = (board) => {
    setActiveSlide(board);
    setActiveContent(content[board - 1]);
    slideRef.current = { ...slideRef.current, [`slide${board}`]: { duration: 5000, progress: 100.99 } };
    setSlide(slideRef.current);

    if (board !== 5) {
      timer = setTimeout(() => {
        onboarding(board + 1);
      }, 5000);
    }
  };

  const clearOnboarding = (board) => {
    clearTimeout(timer);
    clearTimeout(timerBack);
    slideRef.current = board - 1 !== 0 ? {
      ...slideRef.current,
      [`slide${board}`]: { duration: 5, progress: 0 },
      [`slide${board - 1}`]: { duration: 5, progress: 0 },
    } : {
      ...slideRef.current,
      [`slide${board}`]: { duration: 5, progress: 0 },
    };
    setSlide(slideRef.current);
  };

  const skipOnboarding = (board) => {
    clearTimeout(timer);
    clearTimeout(timerBack);
    slideRef.current = { ...slideRef.current, [`slide${board}`]: { duration: 10, progress: 100 } };
  };

  const previousSlide = () => {
    const prevSlide = activeSlide !== 1 ? activeSlide - 1 : 1;
    clearOnboarding(activeSlide);
    setActiveSlide(prevSlide);
    setActiveContent(content[prevSlide - 1]);
    slideRef.current = { ...slideRef.current, [`slide${prevSlide}`]: { duration: 5000, progress: 100.99 } };
    timerBack = setTimeout(() => {
      setSlide(slideRef.current);
      if (prevSlide !== 5) {
        timer = setTimeout(() => {
          onboarding(prevSlide + 1);
        }, 5000);
      }
    }, 500);
  };

  const nextSlide = () => {
    if (activeSlide < 5) {
      skipOnboarding(activeSlide);
      onboarding(activeSlide + 1);
    }
  };

  const onChangeSlide = (e) => {
    const screenWidthHalf = (screenWidth / 2);
    const contentCounter = content.length;

    if (e.nativeEvent.pageX >= screenWidthHalf && activeSlide <= (contentCounter - 1)) {
      if (closing === false) {
        setTimeout(() => {
          nextSlide();
        }, 150);
      }
    }

    if (e.nativeEvent.pageX <= screenWidthHalf && activeSlide >= 1) {
      previousSlide();
    }
  };

  const onClose = async () => {
    try {
      await AsyncStorage.setItem("isOnboarded", "1");
      const deviceInfo = await getSecureStore("singlifeDeviceInfo");
      const parseDevice = JSON.parse(deviceInfo);
      const updatedDeviceInfo = {
        ...parseDevice,
        mobile_num: "",
      };

      saveSecureStore("singlifeDeviceInfo", JSON.stringify(updatedDeviceInfo));
      clearTimeout(timer);
      clearTimeout(timerBack);
      navigation.push("Login");
    } catch (err) {
      console.log(err); // For bug tracking
    }
  };

  useEffect(() => {
    onboarding(1);
  }, []);

  return (
    <Container style={{ backgroundColor: activeContent.bg_color }}>
      <Content contentContainerStyle={styles.root} onTouchStart={(e) => onChangeSlide(e)}>
        <View style={styles.content}>
          <View style={styles.contentPadding}>
            <Grid style={styles.barContainer}>
              <Row>
                <Col item xs={2} style={styles.progress}>
                  <HeaderProgressBar progressVal={slide.slide1.progress} durationVal={slide.slide1.duration} />
                </Col>
                <Col item xs={2} style={styles.progress}>
                  <HeaderProgressBar progressVal={slide.slide2.progress} durationVal={slide.slide2.duration} />
                </Col>
                <Col item xs={2} style={styles.progress}>
                  <HeaderProgressBar progressVal={slide.slide3.progress} durationVal={slide.slide3.duration} />
                </Col>
                <Col item xs={2} style={styles.progress}>
                  <HeaderProgressBar progressVal={slide.slide4.progress} durationVal={slide.slide4.duration} />
                </Col>
                <Col item xs={2} style={styles.progress}>
                  <HeaderProgressBar progressVal={slide.slide5.progress} durationVal={slide.slide5.duration} />
                </Col>
              </Row>
            </Grid>

            <View style={[global.iconListItemCenter, global.iconListItemContentBetween, styles.header]}>
              <InvertedLogo />

              <TouchableOpacity onPress={() => { setClosing(true); onClose(); }}>
                <MaterialIcon style={[global.iconColor, styles.icon]} name="close" size={25} />
              </TouchableOpacity>
            </View>

            <Typography text={activeContent.title} type="title3" style={[global.body, { color: activeContent.text }]} />
            <Typography text={activeContent.description} type="body-bold" style={[global.fieldSeparator, { color: activeContent.text }]} />
          </View>

          <View style={styles.imageContent}>
            {activeContent.illustration}
          </View>

          {activeContent.id === 5 && (
            <View style={styles.footer}>
              <Button variant="default-outlined" text="GET STARTED" full onPress={() => onClose()} />
            </View>
          )}
        </View>
      </Content>
    </Container>
  );
}

OnboardingSlide.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OnboardingSlide;
