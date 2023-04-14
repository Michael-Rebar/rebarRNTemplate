import React from "react";
import PropTypes from "prop-types";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Feather from "react-native-vector-icons/Feather";
import Header from "../../components/Headers/Header";
import Typography from "../../components/Typography";
import global from "../GlobalStyles";
import color from "../Color";

export default function EmailSent({ navigation }) {
  return (
    <Container>
      <Header close closeAction={() => {}} transparent />

      <Content style={global.wrapper} contentContainerStyle={{ borderWidth: 1, height: "100%", justifyContent: "space-between" }}>
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography text="Email Sent!" type="title2" />

          <Grid style={global.body}>
            <Row size={4}>
              <Col>
                <Typography type="body" text="We’ve sent an email to j***@e****.com. Please click the [NAME OF BUTTON] button when you get it to reset your password." />
              </Col>
            </Row>
          </Grid>
        </View>

        <View style={global.carouselImage}>
          <Feather name="image" size={30} color={color.black} />
        </View>
      </Content>
    </Container>
  );
}

EmailSent.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
