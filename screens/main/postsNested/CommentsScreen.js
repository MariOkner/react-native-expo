import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';

import { firestore, collection, doc, setDoc, query, onSnapshot, orderBy } from '../../../firebase';

import Comment from '../../../components/Comment';

import uuid from 'react-native-uuid';

import helpers from '../../../helpers';

import { globalStyles } from '../../../styles';
import { mainStyles } from '../styles';
import { Text, View, SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const CommentsScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const { userId, userName, userImageURL } = useSelector((state) => state.auth);
  const [currentComment, setCurrentComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(firestore, 'posts', postId, 'comments'), orderBy('time', 'desc')), (comments) => {
      setComments(comments.docs.map((comment) => ({ ...comment.data(), id: comment.id })));
    });
    return unsubscribe;
  }, [postId]);

  const uploadComment = async () => {
    try {
      await setDoc(doc(firestore, 'posts', postId, 'comments', uuid.v4()), {
        userName,
        userImageURL,
        time: Date.now(),
        comment: currentComment,
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
    <View style={globalStyles.container}>
      <View style={globalStyles.headerBox}>
        <AntDesign name='arrowleft' size={24} color='black' onPress={() => navigation.navigate('Home')} />
        <Text style={globalStyles.headerTitle}>Коментарі</Text>
        <View></View>
      </View>

      <View style={[styles.commentsBox, mainStyles.mainBox]}>
        {comments && (
          <SafeAreaView style={styles.commentsScrollBox}>
            <FlatList
              inverted={true}
              showsVerticalScrollIndicator={false}
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Comment userName={item.userName} userImageURL={item.userImageURL} comment={item.comment} />}
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
});

export default CommentsScreen;
