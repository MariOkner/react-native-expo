import React, { useCallback, useEffect, useState } from "react";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import FlashMessage from "react-native-flash-message";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

import { View } from "react-native";
import { globalStyles } from "./styles";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const routing = useRoute({});
  // Fonts
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "andika-r": require("./assets/fonts/Andika-Regular.ttf"),
          "andika-b": require("./assets/fonts/Andika-Bold.ttf"),
          "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
        });
      } catch (error) {
        console.log(message.error);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  //__________________________________________________________________________
  return (
    <NavigationContainer>
      <View onLayout={onLayoutRootView} style={globalStyles.container}>
        {routing}
      </View>
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
}
