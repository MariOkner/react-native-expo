import React from 'react';

import { FontAwesome, Feather } from '@expo/vector-icons';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Post = ({ userName, userImageURL, id, imageURL, description, location, locationDescription }) => {
  return (
    <View style={styles.box}>
      <View style={styles.userBox}>
        <Image source={userImageURL ? { uri: userImageURL } : require('../assets/images/no-user-image.jpg')} style={styles.userImage} />
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.contentBox}>
        <Image source={{ uri: imageURL }} style={styles.image} />
        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.descriptionBox}>
          <TouchableOpacity style={styles.descriptionButton} onPress={() => navigation.navigate('Comments', { postId: id })}>
            <FontAwesome name='comment-o' size={24} color='#ff6c00' />
            <Text style={[styles.descriptionText, styles.descriptionTextPadding]}>0</Text>
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
    borderRadius: 20,
    backgroundColor: '#ccc',
    padding: 5,
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
  contentBox: {
    padding: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  descriptionText: {
    fontSize: 18,
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
