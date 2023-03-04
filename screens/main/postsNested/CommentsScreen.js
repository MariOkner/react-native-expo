import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';

import { firestore, doc, setDoc, storage, ref, uploadBytes, getDownloadURL } from '../../../firebase';

import uuid from 'react-native-uuid';

import { globalStyles } from '../../../styles';
import { mainStyles } from '../styles';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const CommentsScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState('');
  const { userName } = useSelector((state) => state.auth);

  const uploadComment = async () => {
    try {
      await setDoc(doc(firestore, 'posts', postId, 'comments', uuid.v4()), {
        userName,
        comment,
      }).catch((error) => {
        throw new Error();
      });
    } catch (error) {
      helpers.showWarningMsg('Помилка створення коментаря');
      return;
    }
    setComment('');
  };

  return (
    <View style={mainStyles.container}>
      <View style={globalStyles.headerBox}>
        <AntDesign name='arrowleft' size={24} color='black' onPress={() => navigation.navigate('Home')} />
        <Text style={globalStyles.headerTitle}>Коментарі</Text>
        <View></View>
      </View>

      <View style={[styles.galleryBox, mainStyles.mainBox]}>
        <View style={globalStyles.inputBox}>
          <TextInput style={mainStyles.input} onChangeText={setComment} placeholder='Введіть ваш коментар...' value={comment} />
        </View>

        <View style={globalStyles.buttonBox}>
          <TouchableOpacity
            style={[comment ? globalStyles.enabledButton : globalStyles.disabledButton, globalStyles.button]}
            onPress={uploadComment}
            disabled={!comment}
            activeOpacity={1}
          >
            <Text style={globalStyles.buttonTitle}>Опублікувати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  galleryBox: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});

export default CommentsScreen;
