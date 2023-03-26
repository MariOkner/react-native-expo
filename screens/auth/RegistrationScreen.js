import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

import { singUpUser } from '../../redux/auth/operation';
import helpers from '../../helpers';

import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import { useIsFocused } from '@react-navigation/native';

import { globalStyles } from '../../styles';
import { authStyles } from './styles';
import {
  StyleSheet,
  Keyboard,
  Dimensions,
  Platform,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
  userName: '',
  image: null,
};

export default function RegistrationScreen({ navigation }) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 25 * 2);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.auto);
  const cameraRef = useRef(null);
  const scrollRef = useRef(null);

  const dispatch = useDispatch();

  const focused = useIsFocused();

  const scrollViewRef = useRef();

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermissions.status === 'granted');
    })();
  }, []);

  const takeImage = async (event) => {
    if (!useRef) {
      helpers.showWarningMsg('Помилка камери');
      return;
    }

    try {
      let image = await cameraRef.current.takePictureAsync({ skipProcessing: true });

      if (cameraType === Camera.Constants.Type.front) {
        image = await manipulateAsync(
          image.localUri || image.uri,
          [{ rotate: 180 }, { flip: FlipType.Vertical }, { resize: { height: 512, width: 512 } }],
          {
            compress: 0.5,
            format: SaveFormat.JPEG,
          }
        );
      }

      setState((prevState) => ({ ...prevState, image: image.uri }));
    } catch (error) {
      helpers.showWarningMsg('Помилка камери');
      console.log(error.message);
    }
  };

  const handleSubmit = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
    setIsSigningUp(true);
    dispatch(
      singUpUser(state, () => {
        setIsSigningUp(false);
      })
    );
    setState(initialState);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 25 * 2;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription.remove();
  }, []);

  const deleteImage = (event) => {
    setState((prevState) => ({ ...prevState, image: null }));
  };

  return (
    <View style={globalStyles.container}>
      <Spinner visible={isSigningUp} color='#FFFFFF' size='large' />
      <ImageBackground style={authStyles.image} source={require('../../assets/images/auth-background.jpg')}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
          <View
            style={{
              width: dimensions,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef} onContentSizeChange={() => scrollRef.current.scrollToEnd()}>
              <View style={styles.cameraBox}>
                {focused && (
                  <View style={styles.cameraRoundedBox}>
                    {!state.image && (
                      <Camera style={styles.camera} type={cameraType} flashMode={cameraFlash} ref={cameraRef}>
                        <TouchableOpacity style={styles.takeImageButton} onPress={takeImage}>
                          <MaterialCommunityIcons name='camera' size={32} color='#808080' />
                        </TouchableOpacity>
                      </Camera>
                    )}
                    {state.image && (
                      <ImageBackground source={{ uri: state.image }} style={styles.camera}>
                        <TouchableOpacity style={styles.deleteImageButton} onPress={deleteImage}>
                          <MaterialCommunityIcons name='trash-can' size={32} color='#808080' />
                        </TouchableOpacity>
                      </ImageBackground>
                    )}
                  </View>
                )}
              </View>
              <View style={authStyles.header}>
                <Text style={globalStyles.title}>Реєстрація</Text>
              </View>
              <View>
                <TextInput
                  style={authStyles.input}
                  onFocus={() => setShowKeyboard(true)}
                  value={state.userName}
                  onChangeText={(value) => setState((prevState) => ({ ...prevState, userName: value }))}
                  placeholder="Ім'я"
                />
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
                  <Text style={globalStyles.buttonTitle}>Зареєструватися</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={authStyles.navText} onPress={() => navigation.navigate('Login')}>
                <Text style={authStyles.activeText}>
                  Вже є акаунт?{'  '}
                  <Text style={authStyles.staticText}>Увійти</Text>
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraBox: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraRoundedBox: {
    width: 165,
    height: 165,
    borderRadius: 25,
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  takeImageButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteImageButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
