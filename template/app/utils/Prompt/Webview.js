import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { Container, Content } from "native-base";
import NetInfo from '@react-native-community/netinfo';
import { scale } from "react-native-size-matters";
import Header from "../../components/Headers/Common";
import LoadingScreen from "../../components/LoadingScreen";
import Typography from "../../components/Typography";
import global from "../GlobalStyles";
import NoInternetConnection from "../../assets/images/common/no-internet-connection.svg";

const styles = StyleSheet.create({
  webview: { height: "100%", width: "100%" },
});

export default function WebviewDisplay({ navigation, route }) {
  const { passUrl } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const onNavigationSateChange = (navState) => {
    // eslint-disable-next-line no-unused-vars
    const { url } = navState;
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setIsLoading(false);
      }
      setIsConnected(state.isConnected);
    });
  }, []);

  return (
    <Container>
      <Header transparent back backAction={() => navigation.goBack()} actionButton="left" />

      <Content style={global.wrapper} contentContainerStyle={[global.contentFlex, global.contentNoTopPadding]}>
        {!isConnected
          ? (
            <View>
              <NoInternetConnection width={scale(350)} height={scale(290)} />
              <View>
                <Typography type="title" text="Please check your wifi or data connection." style={{ textAlign: "center" }} />
              </View>
              <View style={global.fieldSeparator}>
                <Typography type="body" text="You’re not connected to the internet." style={{ textAlign: "center" }} />
              </View>
            </View>
          )
          : (
            <WebView
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              source={{ uri: passUrl }}
              style={styles.webview}
              onNavigationStateChange={(navState) => onNavigationSateChange(navState)}
            />
          )}

      </Content>
      <LoadingScreen isLoading={isLoading} />
    </Container>
  );
}

WebviewDisplay.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
};

WebviewDisplay.defaultProps = {
  route: {},
};
