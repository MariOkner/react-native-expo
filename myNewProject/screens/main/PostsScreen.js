import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Home";
import CommentsScreen from "../CommentsScreen";
import MapScreen from "../MapScreen";

import { Text, StyleSheet, View, FlatList, Image } from "react-native";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="Home" component={Home} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>

    // <View style={styles.container}>
    //   <View style={styles.header}>
    //     <Text style={styles.headerTitle}>Публікації</Text>
    //     <AntDesign style={styles.logout} name="logout" size={24} color="black" />
    //   </View>
    //   <View style={styles.BoxGallery}>
    //     <FlatList
    //       data={posts}
    //       keyExtractor={(item, indx) => indx.toString()}
    //       renderItem={({ item }) => (
    //         <View style={styles.imageGalery}>
    //           <Image source={{ uri: item.image }} style={{ width: 350, height: 200 }} />
    //         </View>
    //       )}
    //     />
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 30,
    flexDirection: "row",
    borderColor: "#a9a9a9",
    borderBottomWidth: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    marginRight: 100,
  },
  logout: {
    // justifyContent: "flex-end",
  },
  BoxGallery: {
    flex: 8,
    justifyContent: "center",
    // alignItems: "center",
  },
  imageGalery: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;
