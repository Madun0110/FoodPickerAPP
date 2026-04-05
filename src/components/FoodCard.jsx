import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

/*
  Komponen FoodCard
  menerima props foodList dan onFavorite
*/

const FoodCard = ({ foodList, onFavorite }) => {

  return (
    <ScrollView>

      {foodList.map((food) => (

        <View key={food.id} style={styles.card}>

          {/* gambar makanan dari assets */}
          <Image source={food.image} style={styles.image} />

          {/* tombol favorit */}
          <TouchableOpacity
            style={styles.favorite}
            onPress={() => onFavorite(food.id)}
          >
            <Text style={styles.favoriteText}>
              {food.favorite ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>

          <View style={styles.info}>

            <Text style={styles.name}>{food.name}</Text>

            <Text style={styles.rating}>{food.rating}</Text>

          </View>

        </View>

      ))}

    </ScrollView>
  );
};

export default FoodCard;

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
    elevation: 4
  },

  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },

  favorite: {
    position: "absolute",
    right: 15,
    top: 15,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20
  },

  favoriteText: {
    fontSize: 18
  },

  info: {
    padding: 12
  },

  name: {
    fontSize: 18,
    fontWeight: "bold"
  },

  rating: {
    color: "gray",
    marginTop: 5
  }

});