/* eslint-disable global-require */
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleProvider } from "native-base";
import App from "../App";
import getTheme from "../../native-base-theme/components";
import material from "../../native-base-theme/variables/material";

export default function Setup() {
  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      SharpSansBook: require("../assets/fonts/SharpSansDispNo1-Book.otf"),
      SharpSansBookItalic: require("../assets/fonts/SharpSansDispNo1-BookIt.otf"),
      SharpSansSemibold: require("../assets/fonts/SharpSansDispNo1-Semibold.otf"),
      SharpSansBold: require("../assets/fonts/SharpSansDispNo1-Bold.otf"),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!isReady) return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} onError={console.warn} />;
  return (
    <StyleProvider style={getTheme(material)}>
      <App />
    </StyleProvider>
  );
}
