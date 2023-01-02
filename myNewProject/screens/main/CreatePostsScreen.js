import React from "react";
import { Camera } from "expo-camera";

import { Text, StyleSheet, View } from "react-native";

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}></Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    marginTop: 50,
    height: 300,
  },
});

export default CreatePostsScreen;
