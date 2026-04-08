import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { BookmarkContext } from "../Context/BookmarkContext";

export default function FoodCard({ item }) {

  const { addBookmark, removeBookmark } = useContext(BookmarkContext);
  const [favorite, setFavorite] = useState(false);

  const scale = new Animated.Value(1);

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);

    if (!favorite) addBookmark(item);
    else removeBookmark(item.id);
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>

      <TouchableOpacity
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={styles.card}
      >

        <Image source={item.image} style={styles.image} />

        <TouchableOpacity
          style={styles.heart}
          onPress={toggleFavorite}
        >

          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={24}
            color="red"
          />

        </TouchableOpacity>

        <View style={styles.info}>

          <Text style={styles.name}>
            {item.title}
          </Text>

          <Text style={styles.rating}>
            ⭐ {item.rating}
          </Text>

        </View>

      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4
  },

  image: {
    width: "100%",
    height: 170,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },

  heart: {
    position: "absolute",
    right: 15,
    top: 15,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20
  },

  info: {
    padding: 10
  },

  name: {
    fontSize: 18,
    fontWeight: "bold"
  },

  rating: {
    color: "gray"
  }

});