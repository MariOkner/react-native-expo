import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const Home = ({ route, navigation }) => {
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
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.homeBox}>
            <Image source={{ uri: item.image }} style={styles.imageStyle} />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => {
          navigation.navigate("Map");
        }}
      >
        <Text style={styles.mapTitle}>go to Map</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => {
          navigation.navigate("Comments");
        }}
      >
        <Text style={styles.mapTitle}>go to Comments</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  homeBox: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 350,
    height: 200,
  },
  mapButton: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
  },
  mapTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },
});

export default Home;
