import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

import PromoBanner from "../components/PromoBanner";
import CategoryScroll from "../components/CategoryScroll";
import FoodCard from "../components/FoodCard";
import RestaurantGrid from "../components/RestaurantGrid";

import { blogs } from "../data/blogs";

export default function Home() {

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        🍔 AppFoodPicker
      </Text>

      <PromoBanner />

      <Text style={styles.section}>
        Kategori
      </Text>

      <CategoryScroll />

      <Text style={styles.section}>
        Makanan Populer
      </Text>

      {blogs.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}

      <Text style={styles.section}>
        Restoran Populer
      </Text>

      <View style={styles.grid}>

        {blogs.map((item) => (
          <RestaurantGrid key={item.id} item={item} />
        ))}

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }

});