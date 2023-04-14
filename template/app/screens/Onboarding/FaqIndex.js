import React from "react";
import PropTypes from "prop-types";
import { Container, Content } from "native-base";
import { WebView } from 'react-native-webview';
import Header from "../../components/Headers/Common";
import global from "../../utils/GlobalStyles";

// Helper - Utils - Constant
import { faqUrl } from "../../constants/constants";

export default function FaqIndex({ navigation }) {
  return (
    <Container>
      <Header back backAction={() => navigation.goBack()} transparent actionButton="left" />
      <Content style={global.wrapper}>
        <WebView
          originWhitelist={['*']}
          javaScriptEnabled
          domStorageEnabled
          source={{
            uri: faqUrl,
          }}
        />
      </Content>
    </Container>
  );
}

FaqIndex.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
