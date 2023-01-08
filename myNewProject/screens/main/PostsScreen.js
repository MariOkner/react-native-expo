import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "../nested/Home";
// import CommentsScreen from "../nested/CommentsScreen";
// import MapScreen from "../nested/MapScreen";
import { globalStyles } from "../../styles";
import { Text, StyleSheet, View, FlatList, Image } from "react-native";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);

  return (
    // <NestedScreen.Navigator>
    //   <NestedScreen.Screen name="Home" component={Home} />
    //   <NestedScreen.Screen name="Comments" component={CommentsScreen} />
    //   <NestedScreen.Screen name="Map" component={MapScreen} />
    // </NestedScreen.Navigator>

    <View style={styles.container}>
      <View style={globalStyles.headerBox}>
        <View></View>
        <Text style={globalStyles.headerTitle}>Публікації</Text>
        <AntDesign name="logout" size={24} color="black" />
      </View>

      <View style={styles.galleryBox}>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageStyles}>
              <Image source={{ uri: item.image }} style={{ width: 350, height: 200 }} />
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
    flex: 8,
    justifyContent: "center",
    // alignItems: "center",
  },
  imageStyles: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;
