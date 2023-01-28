import React, { useState, useRef, useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

import helpers from "../../helpers";

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
  const [imageLocation, setImageLocation] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [imageLocationDescription, setImageLocationDescription] = useState("");

  const [hasForegroundPermissions, setHasForegroundPermissions] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermissions.status === "granted");

      const foregroundPermissions = await Location.requestForegroundPermissionsAsync();
      setHasForegroundPermissions(foregroundPermissions.status === "granted");
    })();
  }, []);

  const takeImage = async (event) => {
    if (!useRef) {
      helpers.showWarning("Помилка камери");
      return;
    }

    try {
      const image = await cameraRef.current.takePictureAsync();
      setImage(image.uri);
    } catch (error) {
      helpers.showWarning("Помилка камери");
    }

    const location = await Location.getLastKnownPositionAsync({});
    if (location) {
      setImageLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  const saveImage = () => {
    navigation.navigate("AAA", {
      image: image,
      imageLocation: imageLocation,
      imageDescription: imageDescription,
      imageLocationDescription: imageLocationDescription,
    });
    setImage(null);
    setImageLocation(null);
    setImageDescription("");
    setImageLocationDescription("");
  };

  const deleteImage = (event) => {
    setImage(null);
  };

  if (hasCameraPermission === false) {
    return (
      <View style={styles.errorBox}>
        <Text style={styles.errorTitle}>Немає доступу до камери</Text>
      </View>
    );
  }

  return (
    <View style={mainStyles.container}>
      <View style={globalStyles.headerBox}>
        <View></View>
        <Text style={globalStyles.headerTitle}>Створити публікацію</Text>
        <View></View>
      </View>

      <View style={mainStyles.mainBox}>
        {focused && (
          <View style={styles.cameraBox}>
            {!image && (
              <Camera style={styles.camera} type={cameraType} flashMode={cameraFlash} ref={cameraRef}>
                <TouchableOpacity style={styles.takeImageButton} onPress={takeImage}>
                  <MaterialCommunityIcons name="camera" size={32} color="#808080" />
                </TouchableOpacity>
              </Camera>
            )}
            {image && <Image source={{ uri: image }} style={styles.camera} />}
          </View>
        )}

        <View style={styles.inputBox}>
          <TextInput style={styles.input} onChangeText={setImageDescription} placeholder="Назва..." value={imageDescription} />
          <TextInput
            style={styles.input}
            onChangeText={setImageLocationDescription}
            placeholder="Місцевість..."
            value={imageLocationDescription}
          />
        </View>

        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={[image ? globalStyles.enabledButton : globalStyles.disabledButton, styles.button]}
            onPress={saveImage}
            disabled={!image}
            activeOpacity={1}
          >
            <Text style={globalStyles.buttonTitle}>Опублікувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[image ? globalStyles.enabledButton : globalStyles.disabledButton, styles.button]}
            onPress={deleteImage}
            disabled={!image}
            activeOpacity={1}
          >
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
  takeImageButton: {
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
