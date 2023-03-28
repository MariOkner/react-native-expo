import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { firestore, collection, doc, deleteDoc, query, onSnapshot, storage, ref, deleteObject } from '../firebase';

import Spinner from 'react-native-loading-spinner-overlay';
import helpers from '../helpers';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Post = ({ navigation, userId, userName, userImageURL, id, imageId, imageURL, description, location, locationDescription }) => {
  const { userId: currentUserId } = useSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);
  const [commentsNumber, setCommentsNumber] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'posts', id, 'comments')),
      (comments) => {
        setCommentsNumber(comments.docs.length);
      },
      (error) => {
        helpers.showWarningMsg('Помилка підписки на оновлення');
      }
    );
    return unsubscribe;
  }, [id]);

  const deletePost = async () => {
    setIsProcessing(true);
    try {
      const storageRef = ref(storage, `postImages/${imageId}`);
      await deleteObject(storageRef).catch((error) => {
        throw new Error();
      });
      await deleteDoc(doc(firestore, 'posts', id)).catch((error) => {
        throw new Error();
      });
    } catch (error) {
      helpers.showWarningMsg('Помилка видалення посту');
    }
    setIsProcessing(false);
  };

  return (
    <View style={styles.box}>
      <Spinner visible={isProcessing} color='#FFFFFF' size='large' />
      <View style={styles.userBox}>
        <View style={styles.userInfoBox}>
          <Image source={userImageURL ? { uri: userImageURL } : require('../assets/images/no-user-image.jpg')} style={styles.userImage} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        {userId === currentUserId && (
          <TouchableOpacity style={styles.deletePostButton} onPress={deletePost}>
            <MaterialCommunityIcons name='trash-can' size={32} color='#808080' />
          </TouchableOpacity>
        )}
      </View>
      <Image source={{ uri: imageURL }} style={styles.image} />
      <View style={styles.contentBox}>
        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.descriptionBox}>
          <TouchableOpacity style={styles.descriptionButton} onPress={() => navigation.navigate('Comments', { postId: id })}>
            <FontAwesome name='comment-o' size={24} color='#ff6c00' />
            <Text style={[styles.descriptionText, styles.descriptionTextPadding]}>{commentsNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.descriptionButton}
            onPress={() =>
              navigation.navigate('Map', {
                location: location,
              })
            }
          >
            <Feather name='map-pin' size={24} color='#ff6c00' />
            <Text style={[styles.descriptionText, styles.descriptionTextPadding]}>{locationDescription}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: 5,
    backgroundColor: '#dddddd',
    borderRadius: 20,
    overflow: 'hidden',
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    padding: 5,
  },
  userInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  userName: {
    marginLeft: 8,
    fontSize: 20,
    fontFamily: 'andika-b',
  },
  deletePostButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    padding: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 0,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'andika-r',
  },
  descriptionBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  descriptionButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  descriptionTextPadding: {
    paddingLeft: 5,
  },
});

export default Post;
