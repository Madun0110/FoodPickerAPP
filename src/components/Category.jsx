import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

/*
  Komponen kategori makanan
*/

const Category = () => {

  const categories = ["🍔 Burger", "🍕 Pizza", "🍣 Sushi"];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

      {categories.map((cat, index) => (
        <View key={index} style={styles.card}>
          <Text>{cat}</Text>
        </View>
      ))}

    </ScrollView>
  );
};

export default Category;

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    elevation: 2
  }

});