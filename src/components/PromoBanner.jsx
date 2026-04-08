import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";

export default function PromoBanner() {

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

      <Image
        source={require("../../assets/banner1.jpg")}
        style={styles.banner}
      />

      <Image
        source={require("../../assets/banner2.jpg")}
        style={styles.banner}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  banner: {
    width: 300,
    height: 140,
    borderRadius: 15,
    marginRight: 10
  }

});