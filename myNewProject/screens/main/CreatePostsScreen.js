import React, { useState, useRef, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
// import { BoxShadow } from "react-native-shadow";
import * as Location from "expo-location";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";

const CreatePostsScreen = ({ navigation }) => {
  const focused = useIsFocused();

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermissions.status === "granted");

      const foregroundPermissions = await Location.requestForegroundPermissionsAsync();
      if (foregroundPermissions.status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (useRef) {
      try {
        const image = await cameraRef.current.takePictureAsync();
        console.log(image);
        setImage(image.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePhoto = () => {
    navigation.navigate("Posts", { image });
  };

  if (hasCameraPermission === false) {
    return (
      <View style={styles.errorBox}>
        <Text style={styles.errorTitle}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {focused && (
        <Camera style={styles.camera} type={cameraType} flashMode={flash} ref={cameraRef}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <MaterialCommunityIcons name="camera" size={32} color="#808080" />
          </TouchableOpacity>
          {image && (
            <View style={styles.takePhotoContainer}>
              <Image source={{ uri: image }} style={{ height: 200, width: 250 }} />
            </View>
          )}
        </Camera>
      )}
      <View style={styles.saveBox}>
        <TouchableOpacity style={styles.saveButtom} onPress={savePhoto}>
          <Text style={styles.saveTitle}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    marginTop: 50,
    marginHorizontal: 10,
    height: 300,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // color: "#E8E8E8",
  },
  button: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
  },
  takePhotoContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderColor: "#fff",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // height: 100,
    // width: 200,
  },
  saveBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  saveButtom: {
    // marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff00ff",
    paddingVertical: 10,
    borderRadius: 50,
    width: 280,
    shadowOffset: 10,
  },
  saveTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },
  errorBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },
});

export default CreatePostsScreen;
