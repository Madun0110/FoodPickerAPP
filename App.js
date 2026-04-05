import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import Header from "./src/components/Header";
import Category from "./src/components/Category";
import FoodCard from "./src/components/FoodCard";

/*
  Komponen utama aplikasi
  Menyimpan data makanan menggunakan STATE
*/

export default function App() {

  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Burger King",
      rating: "4.8 ⭐",
      image: require("./assets/burger.jpg"),
      favorite: false
    },
    {
      id: 2,
      name: "Pizza Hut",
      rating: "4.7 ⭐",
      image: require("./assets/pizza.jpg"),
      favorite: false
    },
    {
      id: 3,
      name: "Sushi House",
      rating: "4.9 ⭐",
      image: require("./assets/sushi.jpg"),
      favorite: false
    }
  ]);

  /*
    Fungsi untuk mengubah status favorit
  */

  const toggleFavorite = (id) => {

    const updatedFoods = foods.map((food) =>
      food.id === id
        ? { ...food, favorite: !food.favorite }
        : food
    );

    setFoods(updatedFoods);
  };

  return (
    <SafeAreaView style={styles.container}>

      <Header />

      <Category />

      {/* mengirim data ke komponen */}
      <FoodCard
        foodList={foods}
        onFavorite={toggleFavorite}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  }
});