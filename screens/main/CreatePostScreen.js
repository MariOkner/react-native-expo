import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { firestore, doc, setDoc, storage, ref, uploadBytes, getDownloadURL } from '../../firebase';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

import uuid from 'react-native-uuid';

import helpers from '../../helpers';

import { globalStyles } from '../../styles';
import { mainStyles } from './styles';
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';

const CreatePostScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [locationDescription, setLocationDescription] = useState(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.auto);
  const cameraRef = useRef(null);

  const [hasForegroundPermissions, setHasForegroundPermissions] = useState(null);

  const { userId, userName } = useSelector((state) => state.auth);

  const focused = useIsFocused();

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermissions.status === 'granted');

      const foregroundPermissions = await Location.requestForegroundPermissionsAsync();
      setHasForegroundPermissions(foregroundPermissions.status === 'granted');
    })();
  }, []);

  const getUserImageURL = async (userId) => {
    const storageRef = ref(storage, `userImages/${userId}`);
    return await getDownloadURL(ref(storage, storageRef)).catch((error) => {
      return null;
    });
  };

  const takeImage = async (event) => {
    if (!useRef) {
      helpers.showWarningMsg('Помилка камери');
      return;
    }

    try {
      const image = await cameraRef.current.takePictureAsync();
      setImage(image.uri);
    } catch (error) {
      helpers.showWarningMsg('Помилка камери');
    }

    const location = await Location.getLastKnownPositionAsync({});
    if (location) {
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  const saveImage = () => {
    uploadPost();

    navigation.navigate('Home');

    setImage(null);
    setLocation(null);
    setDescription('');
    setLocationDescription('');
  };

  const uploadPost = async () => {
    const userImageURL = await getUserImageURL(userId);
    const imageURL = await uploadImage();
    if (!imageURL) {
      return;
    }

    const time = new Date().toUTCString();

    try {
      await setDoc(doc(firestore, 'posts', uuid.v4()), {
        userId,
        userName,
        userImageURL,
        time,
        imageURL,
        location,
        description,
        locationDescription,
      }).catch((error) => {
        throw new Error();
      });
    } catch (error) {
      helpers.showWarningMsg('Помилка створення посту');
      return;
    }

    helpers.showSuccessMsg('Пост створено');
  };

  const uploadImage = async () => {
    const imageRef = await fetch(image);
    const imageData = await imageRef.blob();
    const storageRef = ref(storage, `postImages/${uuid.v4()}`);
    await uploadBytes(storageRef, imageData).catch((error) => {});

    return await getDownloadURL(ref(storage, storageRef)).catch((error) => {
      helpers.showWarningMsg('Помилка завантаження фото');
      return null;
    });
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
    <View style={globalStyles.container}>
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
                  <MaterialCommunityIcons name='camera' size={32} color='#808080' />
                </TouchableOpacity>
              </Camera>
            )}
            {image && <Image source={{ uri: image }} style={styles.camera} />}
          </View>
        )}

        <View style={globalStyles.inputBox}>
          <TextInput style={mainStyles.input} onChangeText={setDescription} placeholder='Назва...' value={description} />
          <TextInput
            style={mainStyles.input}
            onChangeText={setLocationDescription}
            placeholder='Місцевість...'
            value={locationDescription}
          />
        </View>

        <View style={globalStyles.buttonBox}>
          <TouchableOpacity
            style={[image ? globalStyles.enabledButton : globalStyles.disabledButton, globalStyles.button]}
            onPress={saveImage}
            disabled={!image}
            activeOpacity={1}
          >
            <Text style={globalStyles.buttonTitle}>Опублікувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[image ? globalStyles.enabledButton : globalStyles.disabledButton, globalStyles.button]}
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
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  takeImageButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 50,
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: 'rubik-b',
  },
});

export default CreatePostScreen;
