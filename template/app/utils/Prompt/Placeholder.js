import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Container, Content, View } from "native-base";
import Header from "../../components/Headers/Header";
import Typography from "../../components/Typography";
import Button from "../../components/Buttons/Button";
import global from "../GlobalStyles";

const styles = StyleSheet.create({
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default function Placeholder({ navigation, route }) {
  const { page, next } = route.params;

  const onSubmit = () => {
    if (next !== "") {
      navigation.push(page, {
        next,
      });
    } else {
      navigation.push(page);
    }
  };

  return (
    <Container>
      <Header transparent />

      <Content style={global.wrapper} contentContainerStyle={styles.content}>
        <View style={[global.content, global.contentNoTopPadding]}>
          <Typography text={`Connecting to SG SSO - ${page}`} type="body-bold" />

          <View style={global.fieldSeparator}>
            <Button
              full
              variant="primary-contained"
              text="Go to next page"
              onPress={onSubmit}
            />
          </View>
        </View>
      </Content>
    </Container>
  );
}

Placeholder.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
};

Placeholder.defaultProps = {
  route: {},
};
