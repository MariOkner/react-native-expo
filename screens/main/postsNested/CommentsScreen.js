import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';

import { firestore, collection, doc, setDoc, query, onSnapshot } from '../../../firebase';

import uuid from 'react-native-uuid';

import { globalStyles } from '../../../styles';
import { mainStyles } from '../styles';
import { Text, View, SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const CommentsScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [currentComment, setCurrentComment] = useState('');
  const [comments, setComments] = useState([]);
  const { userName } = useSelector((state) => state.auth);

  useEffect(() => {
    onSnapshot(query(collection(firestore, 'posts', postId, 'comments')), (comments) => {
      setComments(comments.docs.map((comment) => ({ ...comment.data(), id: comment.id })));
    });
  }, []);

  const uploadComment = async () => {
    try {
      await setDoc(doc(firestore, 'posts', postId, 'comments', uuid.v4()), {
        userName,
        currentComment,
      }).catch((error) => {
        throw new Error();
      });
    } catch (error) {
      helpers.showWarningMsg('Помилка створення коментаря');
      return;
    }
    setCurrentComment('');
  };

  return (
    <View style={mainStyles.container}>
      <View style={globalStyles.headerBox}>
        <AntDesign name='arrowleft' size={24} color='black' onPress={() => navigation.navigate('Home')} />
        <Text style={globalStyles.headerTitle}>Коментарі</Text>
        <View></View>
      </View>

      <View style={[styles.commentsBox, mainStyles.mainBox]}>
        {comments && (
          <SafeAreaView style={styles.commentsScrollBox}>
            <FlatList
              data={comments}
              renderItem={({ item }) => (
                <View style={styles.commentBox}>
                  <Text>{item.userName}</Text>
                  <Text>{item.comment}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        )}

        <View style={globalStyles.inputBox}>
          <TextInput
            style={mainStyles.input}
            onChangeText={setCurrentComment}
            placeholder='Введіть ваш коментар...'
            value={currentComment}
          />
        </View>

        <View style={globalStyles.buttonBox}>
          <TouchableOpacity
            style={[currentComment ? globalStyles.enabledButton : globalStyles.disabledButton, globalStyles.button]}
            onPress={uploadComment}
            disabled={!currentComment}
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
  commentsBox: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  commentsScrollBox: {
    flex: 1,
  },
  commentBox: {
    borderWidth: 1,
    borderColor: '#20b2aa',
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default CommentsScreen;
