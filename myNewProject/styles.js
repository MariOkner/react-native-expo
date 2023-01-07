import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 30,
    color: "#000",
    fontFamily: "andika-b",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    marginLeft: 40,
  },
  headerBox: {
    // flex: 1,
    padding: 15,
    marginTop: 30,
    flexDirection: "row",
    borderColor: "#a9a9a9",
    borderBottomWidth: 2,
  },
  button: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },
});
