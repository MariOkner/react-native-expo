import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../styles';
import { authStyles } from './styles';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import { useDispatch } from 'react-redux';
import { singInUser } from '../../redux/auth/operation';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
    setIsSigningIn(true);
    dispatch(
      singInUser(state, () => {
        setIsSigningIn(false);
      })
    );
    setState(initialState);
  };

  const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 25 * 2);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 25 * 2;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription.remove();
  }, []);

  //__________________________________________________________________________
  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={globalStyles.container}>
        <Spinner visible={isSigningIn} color='#FFFFFF' size='large' />
        <ImageBackground style={authStyles.image} source={require('../../assets/images/pexels-photo-2088170.jpg')}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
            <View
              style={{
                ...styles.form,
                marginBottom: showKeyboard ? 20 : 50,
                width: dimensions,
              }}
            >
              <View style={authStyles.header}>
                <Text style={globalStyles.title}>Увійти</Text>
              </View>
              <View style={globalStyles.inputBox}>
                <TextInput
                  style={authStyles.input}
                  onFocus={() => setShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) => setState((prevState) => ({ ...prevState, email: value }))}
                  placeholder='Адреса електронної пошти'
                />
              </View>
              <View style={globalStyles.inputBox}>
                <TextInput
                  style={authStyles.input}
                  secureTextEntry={true}
                  onFocus={() => setShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}
                  placeholder='Пароль'
                />
              </View>
              <View style={globalStyles.buttonBox}>
                <TouchableOpacity activeOpacity={0.6} style={[globalStyles.enabledButton, globalStyles.button]} onPress={handleSubmit}>
                  <Text style={globalStyles.buttonTitle}>Увійти</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={authStyles.navText} onPress={() => navigation.navigate('Register')}>
                <Text style={authStyles.activeText}>
                  Нема акаунта?{'  '}
                  <Text style={authStyles.staticText}>Зареєструватися</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: {
    // marginHorizontal: 50,
  },
  buttonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
