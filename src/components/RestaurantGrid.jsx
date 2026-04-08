import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function RestaurantGrid({ item }) {

  return (
    <View style={styles.card}>

      <Image source={item.image} style={styles.image} />

      <Text style={styles.name}>
        {item.title}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    elevation: 3
  },

  image: {
    width: "100%",
    height: 90,
    borderRadius: 10
  },

  name: {
    marginTop: 6,
    fontWeight: "bold"
  }

});