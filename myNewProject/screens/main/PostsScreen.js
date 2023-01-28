import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../nested/Home";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
// import { globalStyles } from "../../styles";
// import { Text, StyleSheet, View, FlatList, Image } from "react-native";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen options={{ headerShown: false }} name="AAA" component={Home} />
      <NestedScreen.Screen options={{ headerShown: false }} name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
