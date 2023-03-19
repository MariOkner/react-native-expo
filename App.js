import React, { useState, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Main from './components/Main';

import { store } from './redux/store';

import { View } from 'react-native';
import { globalStyles } from './styles';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'andika-r': require('./assets/fonts/Andika-Regular.ttf'),
          'andika-b': require('./assets/fonts/Andika-Bold.ttf'),
          'rubik-r': require('./assets/fonts/Rubik-Regular.ttf'),
          'rubik-b': require('./assets/fonts/Rubik-Bold.ttf'),
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

  return (
    <Provider store={store}>
      <View onLayout={onLayoutRootView} style={globalStyles.container}>
        <Main />
      </View>
    </Provider>
  );
}
