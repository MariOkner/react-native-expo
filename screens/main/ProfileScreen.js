import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { firestore, collection, query, onSnapshot, where, storage, orderBy, ref } from '../../firebase';
import { singOutUser } from '../../redux/auth/operation';

import Post from '../../components/Post';

import { globalStyles } from '../../styles';
import { mainStyles } from './styles';

import { AntDesign } from '@expo/vector-icons';
import { Text, StyleSheet, View, FlatList, Image } from 'react-native';

const ProfileScreen = ({ route, navigation, item }) => {
  const [posts, setPosts] = useState([]);

  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'posts'), where('userId', '==', userId), orderBy('time', 'desc')),
      (posts) => {
        setPosts(posts.docs.map((post) => ({ ...post.data(), id: post.id })));
      }
    );
    return unsubscribe;
  }, []);

  const getUserImageURL = async (userId) => {
    const storageRef = ref(storage, `userImages/${userId}`);
    return await getDownloadURL(ref(storage, storageRef)).catch((error) => {
      return null;
    });
  };

  const userImageURL = getUserImageURL(userId);

  console.log('userImageURL', userImageURL);

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(singOutUser());
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.headerBox}>
        <View></View>
        <Text style={globalStyles.headerTitle}>Профіль</Text>
        <AntDesign name='logout' size={24} color='black' onPress={signOut} />
      </View>

      <View style={styles.galleryBox}>
        <View style={styles.userInfoBox}>
          <Image source={require('../../assets/images/no-user-image.jpg')} style={styles.userImage} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <Post
              navigation={navigation}
              id={item.id}
              imageURL={item.imageURL}
              description={item.description}
              location={item.location}
              locationDescription={item.locationDescription}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  galleryBox: {
    marginTop: 10,
  },
  userInfoBox: {
    alignItems: 'center',
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  userName: {
    marginLeft: 8,
    fontSize: 20,
    fontFamily: 'andika-b',
  },
});

export default ProfileScreen;
