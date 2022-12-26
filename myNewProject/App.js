import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function App() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/images/background1.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{ ...styles.form, marginBottom: isShowKeyboard ? 20 : 20 }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
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
  container: {
    flex: 1,
    backgroundColor: "#000",
    // justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  form: {
    marginHorizontal: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 150,
  },
  headerTitle: {
    color: "#fff",
    // backgroundColor: "#f0f8ff",
    fontSize: 30,
    // borderRadius: 6,
    // paddingVertical: 5,
    // paddingHorizontal: 15,
  },
  inputTitle: {
    marginBottom: 2,
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: "900",
    ...Platform.select({
      ios: {
        color: "#ff8c00",
      },
      android: {
        color: "#fff",
      },
    }),
  },
  text: {
    color: "pink",
    fontSize: 30,
  },
});
