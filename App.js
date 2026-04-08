import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import Home from "./src/screens/Home";
import Discover from "./src/screens/Discover";
import Bookmark from "./src/screens/Bookmark";
import Profile from "./src/screens/Profile";

import { BookmarkProvider } from "./src/Context/BookmarkContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <BookmarkProvider>

      <NavigationContainer>

        <Tab.Navigator
          screenOptions={({ route }) => ({

            headerShown: false,

            tabBarStyle: {
              height: 60,
              paddingBottom: 5
            },

            tabBarActiveTintColor: "#ff6b00",

            tabBarIcon: ({ color, size }) => {

              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } 
              else if (route.name === "Discover") {
                iconName = "compass";
              } 
              else if (route.name === "Bookmark") {
                iconName = "bookmark";
              } 
              else if (route.name === "Profile") {
                iconName = "person";
              }

              return (
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            }

          })}
        >

          <Tab.Screen
            name="Home"
            component={Home}
          />

          <Tab.Screen
            name="Discover"
            component={Discover}
          />

          <Tab.Screen
            name="Bookmark"
            component={Bookmark}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
          />

        </Tab.Navigator>

      </NavigationContainer>

    </BookmarkProvider>
  );
}