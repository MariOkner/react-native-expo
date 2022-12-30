{
  /* <script src="http://localhost:19000"></script>; */
}
import React, { useCallback, useEffect, useState } from "react";
// import { globalStyle } from "./styles/style";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { View } from "react-native";

import LoginScreen from "./screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

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
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <LoginScreen />
    </View>
  );
}
