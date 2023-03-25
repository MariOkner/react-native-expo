import React from 'react';

import { Text, View, Image, StyleSheet } from 'react-native';

const Comment = ({ userName, comment }) => {
  console.log('comment', comment);
  return (
    <View style={styles.commentBox}>
      <View style={styles.userImageBox}>
        <Image source={require('../assets/images/no-user-image.jpg')} style={styles.userImage} />
      </View>
      <View style={styles.usercommentBox}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentBox: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  userImageBox: {
    // flex: 2,
    marginRight: 5,
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  usercommentBox: {
    flex: 2,
    backgroundColor: '#dddddd',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  userName: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'andika-b',
    color: '#5809de',
  },
  comment: {
    flexWrap: 'wrap',
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'andika-r',
  },
});

export default Comment;
