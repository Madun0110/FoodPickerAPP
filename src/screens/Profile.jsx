import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { profileData } from "../data/profiledata";

export default function Profile() {

  const [darkMode, setDarkMode] = useState(false);

  const theme = {
    background: darkMode ? "#121212" : "#f5f5f5",
    card: darkMode ? "#1e1e1e" : "#fff",
    text: darkMode ? "#fff" : "#000"
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>

      {/* HEADER */}
      <View style={styles.header}>

        <Image
          source={require("../../assets/madun.jpeg")}
          style={styles.avatar}
        />

        <View style={styles.userInfo}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.university}>{profileData.university}</Text>
        </View>

      </View>

      {/* STATISTIK */}
      <View style={[styles.statsContainer, { backgroundColor: theme.card }]}>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statText}>Orders</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>10</Text>
          <Text style={styles.statText}>Favorites</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statText}>Reviews</Text>
        </View>

      </View>

      {/* WALLET */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>

        <Text style={styles.sectionTitle}>Wallet</Text>

        <View style={styles.menuItem}>
          <Ionicons name="wallet-outline" size={22} />
          <Text style={styles.menuText}>Saldo : Rp150.000</Text>
        </View>

        <View style={styles.menuItem}>
          <Ionicons name="ticket-outline" size={22} />
          <Text style={styles.menuText}>Voucher Makanan</Text>
        </View>

      </View>

      {/* ORDER HISTORY */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>

        <Text style={styles.sectionTitle}>Order History</Text>

        <View style={styles.menuItem}>
          <Ionicons name="restaurant-outline" size={22} />
          <Text style={styles.menuText}>Burger Special</Text>
        </View>

        <View style={styles.menuItem}>
          <Ionicons name="pizza-outline" size={22} />
          <Text style={styles.menuText}>Pizza Italian</Text>
        </View>

        <View style={styles.menuItem}>
          <Ionicons name="fish-outline" size={22} />
          <Text style={styles.menuText}>Sushi Jepang</Text>
        </View>

      </View>

      {/* DARK MODE */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>

        <View style={styles.menuItem}>

          <Ionicons name="moon-outline" size={22} />

          <Text style={styles.menuText}>Dark Mode</Text>

          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
            style={{ marginLeft: "auto" }}
          />

        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  header: {
    backgroundColor: "#ff6b00",
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff"
  },

  userInfo: {
    marginLeft: 15
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },

  university: {
    color: "#fff"
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
    borderRadius: 15,
    padding: 15,
    elevation: 3
  },

  statItem: {
    alignItems: "center"
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "bold"
  },

  statText: {
    color: "gray"
  },

  card: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    elevation: 3
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },

  menuText: {
    marginLeft: 12,
    fontSize: 16
  }

});