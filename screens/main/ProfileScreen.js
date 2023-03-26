import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { firestore, collection, query, onSnapshot, where, storage, orderBy, ref } from '../../firebase';
import { singOutUser } from '../../redux/auth/operation';

import Post from '../../components/Post';

import { globalStyles } from '../../styles';
import { mainStyles } from './styles';

import { AntDesign } from '@expo/vector-icons';
import { Text, StyleSheet, View, FlatList } from 'react-native';

const ProfileScreen = ({ route, navigation, item }) => {
  const [posts, setPosts] = useState([]);

  const { userId, userName, userImageURL } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'posts'), where('userId', '==', userId), orderBy('time', 'desc')),
      (posts) => {
        setPosts(posts.docs.map((post) => ({ ...post.data(), id: post.id })));
      }
    );
    return unsubscribe;
  }, [userId]);

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
        <FlatList
          inverted={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <Post
              navigation={navigation}
              userId={item.userId}
              userName={item.userName}
              userImageURL={item.userImageURL}
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
    flex: 1,
  },
});

export default ProfileScreen;
