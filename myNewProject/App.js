import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function App() {
  console.log(Platform.OS);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/images/background1.jpg")}
      >
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput style={styles.input} secureTextEntry={true} />
          </View>
          <TouchableOpacity activeOpacity={0.6} style={styles.button}>
            <Text style={styles.btnTitle}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Hello, friend!</Text>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // alignItems: "center",
  },
  form: { marginHorizontal: 50 },
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
    backgroundColor: Platform.OS === "ios" ? "transparent" : "#ff8c00",
    borderColor: Platform.OS === "ios" ? "#ff8c00" : "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#ff8c00" : "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  text: {
    color: "pink",
    fontSize: 30,
  },
});
