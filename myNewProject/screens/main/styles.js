import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainBox: {
    padding: 15,
  },
  postBox: {
    width: 350,
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: "#808000",
  },
  image: {
    width: 350,
    height: 300,
    borderRadius: 20,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: "andika-b",
  },
  postDescriptionBox: {
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#00ff00",
    flexDirection: "row",
  },
  postDescriptionButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  descriptionTextPadding: {
    paddingLeft: 2,
  },
});
