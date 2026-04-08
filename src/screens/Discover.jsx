import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CategoryScroll from "../components/CategoryScroll";
import RestaurantGrid from "../components/RestaurantGrid";

import { blogs } from "../data/blogs";

export default function Discover() {

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>
        Discover Food
      </Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>

        <Ionicons name="search" size={20} color="gray" />

        <TextInput
          placeholder="Cari restoran atau makanan..."
          style={styles.input}
        />

      </View>

      {/* Kategori */}
      <Text style={styles.section}>
        Kategori
      </Text>

      <CategoryScroll />

      {/* Restoran Populer */}
      <Text style={styles.section}>
        Restoran Populer
      </Text>

      <View style={styles.grid}>

        {blogs.map((item) => (
          <RestaurantGrid
            key={item.id}
            item={item}
          />
        ))}

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3
  },

  input: {
    marginLeft: 10,
    flex: 1
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }

});