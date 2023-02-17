import React, {useState, useEffect, useCallback} from "react";
import {useRoute} from "../router";

// import * as SplashScreen from "expo-splash-screen";
// import * as Font from "expo-font";

import {useSelector, useDispatch} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";

import FlashMessage from "react-native-flash-message";

import {auth} from "../firebase";
import {onAuthStateChange} from "firebase/auth";
import {authStateChangeUser} from "../redux/auth/operation";

// import {View} from "react-native";
// import {globalStyles} from "../styles";

// SplashScreen.preventAutoHideAsync();

const Main = () => {
  //   const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState(null);

  const {stateChange} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  // Fonts
  //   useEffect(() => {
  //     async function prepare() {
  //       try {
  //         await Font.loadAsync({
  //           "andika-r": require("./assets/fonts/Andika-Regular.ttf"),
  //           "andika-b": require("./assets/fonts/Andika-Bold.ttf"),
  //           "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  //         });
  //       } catch (error) {
  //         console.log(message.error);
  //       } finally {
  //         setAppIsReady(true);
  //       }
  //     }
  //     prepare();
  //   }, []);

  //   const onLayoutRootView = useCallback(async () => {
  //     if (appIsReady) {
  //       await SplashScreen.hideAsync();
  //     }
  //   }, [appIsReady]);

  //   if (!appIsReady) {
  //     return null;
  //   }

  return (
    <NavigationContainer>
      {routing}
      {/* <View onLayout={onLayoutRootView} style={globalStyles.container}>
        {routing}
      </View> */}
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
};

export default Main;
