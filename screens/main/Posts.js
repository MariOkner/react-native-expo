import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./postsNested/HomeScreen";
import CommentsScreen from "./postsNested/CommentsScreen";
import MapScreen from "./postsNested/MapScreen";
// import { globalStyles } from "../../styles";
// import { Text, StyleSheet, View, FlatList, Image } from "react-native";

const NestedScreen = createNativeStackNavigator();

const Posts = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <NestedScreen.Screen options={{ headerShown: false }} name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen options={{ headerShown: false }} name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default Posts;
