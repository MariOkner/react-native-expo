{
  /* <script src="http://localhost:19000"></script>; */
}
import React, { useEffect, useState } from "react";
import { globalStyle } from "../styles/style";

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
};

export default function LoginScreen() {
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  // const [appIsReady, setAppIsReady] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    // console.log(state);
  };

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 25 * 2
  );

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
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={globalStyle.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/background1.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 20,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={globalStyle.title}>Регистрация</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
            </View>

            {/* <Text style={styles.text}>Hello, friend!</Text> */}
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
    marginBottom: 100,
  },
  // headerTitle: {
  //   color: "#fff",
  //   // backgroundColor: "#f0f8ff",
  //   fontSize: 30,
  //   fontFamily: "Andika-Regular",
  //   // borderRadius: 6,
  //   // paddingVertical: 5,
  //   // paddingHorizontal: 15,
  // },
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
    borderRadius: 6,
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
  btnTitle: {
    fontFamily: "Rubik-Bold",
    fontSize: 18,
    // fontWeight: "900",
    ...Platform.select({
      ios: {
        color: "#ff8c00",
      },
      android: {
        color: "#fff",
      },
    }),
  },
  // text: {
  //   color: "pink",
  //   fontSize: 30,
  // },
});
