import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { BookmarkContext } from "../Context/BookmarkContext";

export default function Bookmark() {

  const { bookmarks } = useContext(BookmarkContext);

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Food</Text>
        <Ionicons name="heart" size={26} color="white" />
      </View>

      {/* Jika tidak ada bookmark */}
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>

          <Ionicons name="heart-outline" size={70} color="gray" />

          <Text style={styles.emptyText}>
            Belum ada makanan favorit
          </Text>

          <Text style={styles.emptySub}>
            Tambahkan makanan favorit dari halaman Home
          </Text>

        </View>
      ) : (

        <View style={styles.grid}>

          {bookmarks.map((item) => (

            <TouchableOpacity key={item.id} style={styles.card}>

              <Image
                source={item.image}
                style={styles.image}
              />

              <View style={styles.info}>

                <Text style={styles.name}>
                  {item.title}
                </Text>

                <Text style={styles.rating}>
                  ⭐ {item.rating}
                </Text>

              </View>

              <Ionicons
                name="heart"
                size={22}
                color="red"
                style={styles.favoriteIcon}
              />

            </TouchableOpacity>

          ))}

        </View>

      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },

  header: {
    backgroundColor: "#ff6b00",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },

  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold"
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15
  },

  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4
  },

  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },

  info: {
    padding: 10
  },

  name: {
    fontSize: 16,
    fontWeight: "bold"
  },

  rating: {
    color: "gray"
  },

  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 100
  },

  emptyText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold"
  },

  emptySub: {
    color: "gray",
    marginTop: 5
  }

});