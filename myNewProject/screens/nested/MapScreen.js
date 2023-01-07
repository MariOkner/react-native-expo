import React from "react";
import MapView, { Marker } from "react-native-maps";

import { Dimensions, View, StyleSheet } from "react-native";

const MapScreen = () => {
  // console.log("route.params.location", route.params.location);
  // const { longitude, latitude } = route.params.location;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyles}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
      >
        <Marker title="travel photo" coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  mapStyles: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
