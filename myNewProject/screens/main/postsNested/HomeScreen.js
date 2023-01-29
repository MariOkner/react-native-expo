import React, { useState, useEffect } from "react";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";

import { globalStyles } from "../../../styles";
import { mainStyles } from "../styles";
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from "react-native";

const HomeScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={mainStyles.container}>
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
            <View style={mainStyles.postBox}>
              <Image source={{ uri: item.image }} style={mainStyles.image} />
              <Text style={mainStyles.descriptionText}>{item.imageDescription}</Text>
              <View style={mainStyles.postDescriptionBox}>
                <TouchableOpacity style={mainStyles.postDescriptionButton} onPress={() => navigation.navigate("Comments")}>
                  <FontAwesome name="comment-o" size={24} color="black" />
                  <Text style={[mainStyles.descriptionText, mainStyles.descriptionTextPadding]}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={mainStyles.postDescriptionButton}
                  onPress={() =>
                    navigation.navigate("Map", {
                      location: item.imageLocation,
                    })
                  }
                >
                  <Feather name="map-pin" size={24} color="black" />
                  <Text style={[mainStyles.descriptionText, mainStyles.descriptionTextPadding]}>{item.imageLocationDescription}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  galleryBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ffd700",
  },
});

export default HomeScreen;
