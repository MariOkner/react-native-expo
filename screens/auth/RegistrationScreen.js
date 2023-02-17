import React, {useEffect, useState} from "react";
import {globalStyles} from "../../styles";
import {authStyles} from "./styles";

import {useDispatch} from "react-redux";
import {singUpUser} from "../../redux/auth/operation";

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
} from "react-native";

const initialState = {
  email: "",
  password: "",
  nickName: "",
};

export default function RegistrationScreen({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width - 25 * 2);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(singUpUser(state));
    setState(initialState);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 25 * 2;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription.remove();
  }, []);

  //__________________________________________________________________________
  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={globalStyles.container}>
        <ImageBackground style={authStyles.image} source={require("../../assets/images/pexels-photo-2088170.jpg")}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 50,
                width: dimensions,
              }}>
              <View style={authStyles.header}>
                <Text style={globalStyles.title}>Реєстрація</Text>
              </View>
              <View>
                <TextInput
                  style={authStyles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.nickName}
                  onChangeText={value => setState(prevState => ({...prevState, nickName: value}))}
                  placeholder="Прізвище"
                />
              </View>
              <View style={globalStyles.inputBox}>
                <TextInput
                  style={authStyles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={value => setState(prevState => ({...prevState, email: value}))}
                  placeholder="Адреса електронної пошти"
                />
              </View>
              <View style={globalStyles.inputBox}>
                <TextInput
                  style={authStyles.input}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={value => setState(prevState => ({...prevState, password: value}))}
                  placeholder="Пароль"
                />
              </View>
              <View style={globalStyles.buttonBox}>
                <TouchableOpacity activeOpacity={0.6} style={[globalStyles.enabledButton, globalStyles.button]} onPress={handleSubmit}>
                  <Text style={globalStyles.buttonTitle}>Зареєструватися</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={authStyles.navText} onPress={() => navigation.navigate("Login")}>
                <Text style={authStyles.activeText}>
                  Вже є акаунт?{"  "}
                  <Text style={authStyles.staticText}>Увійти</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>

        {/* <StatusBar style="auto" /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: {
    // marginHorizontal: 50,
  },
});
