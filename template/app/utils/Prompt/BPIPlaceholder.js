import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Container, Content, View } from "native-base";
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import Button from "../../components/Buttons/Button";
import global from "../GlobalStyles";

const styles = StyleSheet.create({
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default function BPIPlaceholder({ navigation }) {
  return (
    <Container>
      <Header transparent />

      <Content style={global.wrapper} contentContainerStyle={styles.content}>
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography text="Login using BPI Credentials" type="body-bold" />

          <View style={global.fieldSeparator}>
            <Button
              full
              variant="primary-contained"
              text="Proceed"
              onPress={() => navigation.navigate("BPIAccountList")}
            />
          </View>
        </View>
      </Content>
    </Container>
  );
}

BPIPlaceholder.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
