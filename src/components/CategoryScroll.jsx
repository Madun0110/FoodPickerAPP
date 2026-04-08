import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { categories } from "../data/categories";

export default function CategoryScroll() {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >

      {categories.map((item) => (
        <View key={item.id} style={styles.category}>

          <Text style={styles.icon}>
            {item.icon}
          </Text>

          <Text>
            {item.name}
          </Text>

        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: 20
  },

  category: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
    elevation: 2
  },

  icon: {
    fontSize: 20
  }

});