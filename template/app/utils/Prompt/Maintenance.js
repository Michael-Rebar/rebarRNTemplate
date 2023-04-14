import React from "react";
import PropTypes from "prop-types";
import { Container, Content, View } from "native-base";
import { scale } from "react-native-size-matters";
import Header from "../../components/Headers/Header";
import Typography from "../../components/Typography";
import Button from "../../components/Buttons/Button";
import MaintenanceIllustration from "../../assets/final-images/illustrations/hand-wrench-gears-illustration.svg";
import global from "../GlobalStyles";
import Footer from "../../components/Footer";

export default function Maintenance({ navigation }) {

  return (
    <Container>
      <Header transparent />
      <Content style={global.wrapper}>
        <View>
          <MaintenanceIllustration width={scale(350)} height={scale(290)} />
          <View>
            <Typography type="title" text="We will be back up and running shortly." style={{ textAlign: "center" }} />
          </View>
          <View style={global.fieldSeparator}>
            <Typography type="body" text="We’re upgrading our services and building new features to better serve you. " style={{ textAlign: "center" }} />
          </View>
        </View>
      </Content>
      <Footer>
        <Button full variant="primary-contained" text="CONTACT US" onPress={() => null} />
      </Footer>
    </Container>
  );
}

Maintenance.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
