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
  },
  headerBox: {
    justifyContent: "space-between",
    // flex: 1,
    padding: 15,
    marginTop: 30,
    flexDirection: "row",
    borderColor: "#a9a9a9",
    borderBottomWidth: 2,
  },
  enabledButton: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6c00",
    paddingVertical: 10,
    borderRadius: 50,
  },
  disabledButton: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a9a9a9",
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },
});
