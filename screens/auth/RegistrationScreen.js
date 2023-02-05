import React, {useEffect, useState} from "react";
import {globalStyles} from "../../styles";

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
  nickname: "",
};

export default function RegistrationScreen({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  // const [appIsReady, setAppIsReady] = useState(false);
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
    Dimensions.addEventListener("change", onChange);
    return () => Dimensions.remove();
  }, []);

  //__________________________________________________________________________
  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={globalStyles.container}>
        <ImageBackground style={styles.image} source={require("../../assets/images/background1.jpg")}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 20,
                width: dimensions,
              }}>
              <View style={styles.header}>
                <Text style={globalStyles.title}>Реєстрація</Text>
              </View>
              <View>
                {/* <Text style={styles.inputTitle}>Логин</Text> */}
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.nickname}
                  onChangeText={value => setState(prevState => ({...prevState, nickname: value}))}
                  placeholder="Прізвище"
                />
              </View>
              <View style={{marginTop: 20}}>
                {/* <Text style={styles.inputTitle}>Email</Text> */}
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={value => setState(prevState => ({...prevState, email: value}))}
                  placeholder="Адреса електронної пошти"
                />
              </View>
              <View style={{marginTop: 20}}>
                {/* <Text style={styles.inputTitle}>Password</Text> */}
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={value => setState(prevState => ({...prevState, password: value}))}
                  placeholder="Пароль"
                />
              </View>
              <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleSubmit}>
                <Text style={globalStyles.buttonTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navText} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.activeText}>
                  Вже є акаунт?{"  "}
                  <Text style={styles.staticText}>Увійти</Text>
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
  // container: {
  //   flex: 1,
  //   backgroundColor: "#000",
  //   // justifyContent: "center",
  // },
  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    // marginHorizontal: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  inputTitle: {
    marginBottom: 2,
    fontSize: 16,
    fontFamily: "andika-r",
  },
  input: {
    borderWidth: 2,
    borderColor: "",
    height: 40,
    borderRadius: 6,

    color: "#000000",
    backgroundColor: "#f0f8ff",
    opacity: 0.6,
    paddingLeft: 10,
  },
  button: {
    marginTop: 20,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#ff8c00",
      },
      android: {
        backgroundColor: "#ff8c00",
        borderColor: "transparent",
      },
    }),
  },
  navText: {
    marginTop: 20,
  },
  activeText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  staticText: {
    color: "#00ffff",
    textAlign: "center",
    fontSize: 16,
  },
});
