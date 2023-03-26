import React, { useState, useEffect, useCallback } from 'react';
import { useRoute } from '../router';

import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import FlashMessage from 'react-native-flash-message';

import { authStateChangeUser } from '../redux/auth/operation';

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer>
      {routing}
      <FlashMessage position='bottom' />
    </NavigationContainer>
  );
};

export default Main;
