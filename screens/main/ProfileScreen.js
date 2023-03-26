import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { firestore, collection, query, onSnapshot, where, orderBy } from '../../firebase';
import { singOutUser } from '../../redux/auth/operation';

import { AntDesign } from '@expo/vector-icons';

import helpers from '../../helpers';
import Post from '../../components/Post';

import { globalStyles } from '../../styles';
import { mainStyles } from './styles';
import { Text, View, FlatList } from 'react-native';

const ProfileScreen = ({ route, navigation, item }) => {
  const [posts, setPosts] = useState([]);

  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'posts'), where('userId', '==', userId), orderBy('time', 'desc')),
      (posts) => {
        setPosts(posts.docs.map((post) => ({ ...post.data(), id: post.id })));
      },
      (error) => {
        helpers.showWarningMsg('Помилка підписки на оновлення');
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

      <View style={mainStyles.mainBox}>
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
              imageId={item.imageId}
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

export default ProfileScreen;
