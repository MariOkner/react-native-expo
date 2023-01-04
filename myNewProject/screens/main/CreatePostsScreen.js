import React, { useState, useRef, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import { useIsFocused } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // _________
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const focused = useIsFocused();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  //  useFocusEffect(() => {
  //    (async () => {
  //      MediaLibrary.requestPermissionsAsync();
  //      const cameraStatus = await Camera.requestCameraPermissionsAsync();
  //      console.log(cameraStatus);
  //      setHasCameraPermission(cameraStatus.status === "granted");
  //    })();
  //  });
  // ___________

  const takePhoto = async () => {
    if (useRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {focused && (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <MaterialCommunityIcons name="camera" size={32} color="#808080" />
          </TouchableOpacity>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    // marginTop: 50,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    color: "#E8E8E8",
  },
  button: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
  },
});

export default CreatePostsScreen;
