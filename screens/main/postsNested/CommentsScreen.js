import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import { globalStyles } from "../../../styles";
import { Text, View, FlatList, StyleSheet } from "react-native";

const CommentsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={globalStyles.headerBox}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate("Home")} />
        <Text style={globalStyles.headerTitle}>Коментарі</Text>
        <View></View>
      </View>

      <View style={styles.galleryBox}>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageBox}>
              <Image source={{ uri: item.image }} style={styles.imageStyles} />
              <View style={styles.textDescriptionBox}>
                <Text style={styles.infoDescriptionText}>Ліс</Text>
              </View>
              <View style={styles.infoImageBox}>
                <View style={styles.commentBox}>
                  <FontAwesome name="comment-o" size={24} color="black" />
                  <Text style={styles.infoCommentText}>0</Text>
                </View>
                <View style={styles.likeBox}>
                  <AntDesign name="like2" size={24} color="black" />
                  <Text style={styles.infoLikeText}>0</Text>
                </View>
                <View style={styles.mapBox}>
                  <Feather name="map-pin" size={24} color="black" />
                  <Text style={styles.infoMapText}>ЛісЛісЛісЛісЛісЛіс</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  galleryBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd700",
  },
  imageBox: {
    width: 350,
    // height: 300,
    // borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#808000",
  },
  imageStyles: {
    width: 350,
    height: 300,
    borderRadius: 20,
  },
  textDescriptionBox: {
    alignItems: "flex-start",
  },
  infoDescriptionText: {
    fontSize: 18,
    fontFamily: "andika-b",
  },
  infoImageBox: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00ff00",
    flexDirection: "row",
  },
  commentBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  infoCommentText: {
    paddingLeft: 8,
    fontSize: 18,
    fontFamily: "andika-b",
  },
  mapBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  infoMapText: {
    paddingLeft: 8,
    fontSize: 18,
    fontFamily: "andika-b",
  },
});

export default CommentsScreen;
