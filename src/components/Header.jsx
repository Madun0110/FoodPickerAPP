import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

/*
  Header aplikasi
*/

const Header = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>🍔 AppFoodPicker</Text>

      <TextInput
        placeholder="Cari makanan..."
        style={styles.search}
      />

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#00aa13",
    padding: 20
  },

  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10
  },

  search: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10
  }

});