import React from "react";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";

import { globalStyles } from "../../../styles";
import { mainStyles } from "../styles";
import { Text, Dimensions, View, StyleSheet } from "react-native";

const MapScreen = ({ route, navigation }) => {
  const { longitude, latitude } = route.params.location;

  return (
    <View style={mainStyles.container}>
      <View style={globalStyles.headerBox}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate("Home")} />
        <Text style={globalStyles.headerTitle}>Карта</Text>
        <View></View>
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
      >
        <Marker title="travel photo" coordinate={{ latitude: latitude, longitude: longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
