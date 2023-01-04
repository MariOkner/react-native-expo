import React from "react";

import { AntDesign } from "@expo/vector-icons";

import { Text, StyleSheet, View } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Публікації</Text>
        <AntDesign
          style={styles.logout}
          name="logout"
          size={24}
          color="black"
        />
      </View>
      <View style={styles.mainBox}>
        <Text>PostsScreen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 30,
    flexDirection: "row",
    borderColor: "#a9a9a9",
    borderBottomWidth: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    marginRight: 100,
  },
  logout: {
    // justifyContent: "flex-end",
  },
  mainBox: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;
