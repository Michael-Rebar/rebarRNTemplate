import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import ContactInfo from "../../components/ContactInfo";
import global from "../../utils/GlobalStyles";

export default function ContactPage({ navigation }) {
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
          <Typography type="title3" text="We're here to help you." />

          <Grid style={global.body}>
            <Row size={4}>
              <Col>
                <Typography text="Couldn't find the help you need? Our customer service team is happy to assist you." type="body" />
              </Col>
            </Row>

            <ContactInfo terms />
          </Grid>
        </View>
      </Content>
    </Container>
  );
}

ContactPage.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

