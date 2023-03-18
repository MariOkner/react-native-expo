import React from 'react';

import { mainStyles } from '../screens/main/styles';

import { FontAwesome, Feather } from '@expo/vector-icons';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Post = ({ id, imageURL, description, location, locationDescription }) => {
  return (
    <View style={styles.box}>
      <Image source={{ uri: imageURL }} style={styles.image} />
      <Text style={styles.descriptionText}>{description}</Text>
      <View style={styles.descriptionBox}>
        <TouchableOpacity style={styles.descriptionButton} onPress={() => navigation.navigate('Comments', { postId: id })}>
          <FontAwesome name='comment-o' size={24} color='black' />
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
          <Feather name='map-pin' size={24} color='black' />
          <Text style={[mainStyles.descriptionText, mainStyles.descriptionTextPadding]}>{locationDescription}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 350,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 350,
    height: 300,
    borderRadius: 20,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: 'andika-b',
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
    paddingLeft: 2,
  },
});

export default Post;
