import React, { useState, useRef, useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { globalStyles } from "../../styles";
import { mainStyles } from "./styles";
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from "react-native";

const CreatePostScreen = ({ navigation }) => {
  const focused = useIsFocused();

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.auto);
  const cameraRef = useRef(null);

  const [image, setImage] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [imageLocationDescription, setImageLocationDescription] = useState("");

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
        <Text style={styles.errorTitle}>Немає доступу до камери</Text>
      </View>
    );
  }

  const goBack = (event) => {
    console.log("goBack");
  };

  return (
    <View style={mainStyles.container}>
      <View style={globalStyles.headerBox}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Створити публікацію</Text>
      </View>

      <View style={mainStyles.mainBox}>
        {focused && (
          <View style={styles.cameraBox}>
            {!image && (
              <Camera style={styles.camera} type={cameraType} flashMode={cameraFlash} ref={cameraRef}>
                <TouchableOpacity style={styles.takePhotoButton} onPress={takePhoto}>
                  <MaterialCommunityIcons name="camera" size={32} color="#808080" />
                </TouchableOpacity>
              </Camera>
            )}
            {image && <Image source={{ uri: image }} style={styles.camera} />}
          </View>
        )}

        <View style={styles.inputBox}>
          <TextInput style={styles.input} onChangeText={setImageDescription} placeholder="Назва..." />
          <TextInput style={styles.input} onChangeText={setImageLocationDescription} placeholder="Місцевість..." />
        </View>

        <View style={styles.buttonBox}>
          <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={savePhoto}>
            <Text style={globalStyles.buttonTitle}>Опублікувати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={savePhoto}>
            <Text style={globalStyles.buttonTitle}>Видалити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraBox: {
    borderRadius: 20,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoButton: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
  },
  inputBox: {
    marginTop: 20,
  },
  input: {
    textAlignVertical: "top",
    paddingVertical: 10,
    fontSize: 18,
    borderBottomColor: "#a9a9a9",
    borderBottomWidth: 1,
  },
  buttonBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: 280,
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

export default CreatePostScreen;
