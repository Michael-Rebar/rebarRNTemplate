/* eslint-disable global-require */

import React, { useEffect } from "react";
import { Root } from "native-base";
import { View, StyleSheet } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import IconDescription from "./components/IconDescription";
import Typography from "./components/Typography";
import ExclamationRedIcon from "./assets/final-images/circular-icons/exclamation-red-icon.svg";
import store from "./redux/store";
import Navigation from "./navigation/Navigation";
import { navigationRef } from './components/RootNavigation';
import colors from "./utils/Color";
import global from "./utils/GlobalStyles";

const navTheme = DefaultTheme;
navTheme.colors.background = "#fff";

const styles = StyleSheet.create({
  toast: {
    maxWidth: "90%",
    width: "100%",
    borderWidth: 1,
    borderColor: colors.singlifeRed,
    backgroundColor: colors.white,
    borderRadius: 4,
    marginTop: 60,
    padding: 20,
  },
});

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT).catch(() => false);
  }, []);

  return (
    <Root>
      <NavigationContainer theme={navTheme} ref={navigationRef}>
        <Provider store={store}>
          <ToastProvider
            renderType={{
              custom_type: (toast) => {
                const { message } = toast;

                return (
                  <View style={styles.toast}>
                    <IconDescription
                      icon={<ExclamationRedIcon width={20} height={20} />}
                    >
                      <Typography text="Error message" type="body-bold1" style={global.iconColor} />
                    </IconDescription>

                    <Typography text={message} type="body1" style={global.buttonSeparator} />
                  </View>
                );
              },
            }}
          >
            <Navigation />
          </ToastProvider>
        </Provider>
      </NavigationContainer>
    </Root>
  );
}
