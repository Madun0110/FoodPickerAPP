import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Discover from "../screens/Discover";
import Bookmark from "../screens/Bookmark";
import FoodDetail from "../screens/FoodDetail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// STACK PROFILE
function ProfileStack(){
  return(
    <Stack.Navigator>

      <Stack.Screen
        name="ProfileMain"
        component={Profile}
        options={{headerShown:false}}
      />

    </Stack.Navigator>
  );
}


// STACK BOOKMARK
function BookmarkStack(){
  return(
    <Stack.Navigator>

      <Stack.Screen
        name="BookmarkMain"
        component={Bookmark}
        options={{headerShown:false}}
      />

      <Stack.Screen
        name="FoodDetail"
        component={FoodDetail}
      />

    </Stack.Navigator>
  );
}


// STACK HOME
function HomeStack(){
  return(
    <Stack.Navigator>

      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{headerShown:false}}
      />

      <Stack.Screen
        name="FoodDetail"
        component={FoodDetail}
      />

    </Stack.Navigator>
  );
}


// STACK DISCOVER
function DiscoverStack(){
  return(
    <Stack.Navigator>

      <Stack.Screen
        name="DiscoverMain"
        component={Discover}
        options={{headerShown:false}}
      />

      <Stack.Screen
        name="FoodDetail"
        component={FoodDetail}
      />

    </Stack.Navigator>
  );
}


// BOTTOM TAB NAVIGATION
export default function Router(){

  return(

  <NavigationContainer>

  <Tab.Navigator
    screenOptions={({route})=>({

      tabBarIcon:({color,size})=>{

        let iconName;

        if(route.name === "Home"){
          iconName="home";
        }

        else if(route.name === "Discover"){
          iconName="search";
        }

        else if(route.name === "Bookmark"){
          iconName="bookmark";
        }

        else if(route.name === "Profile"){
          iconName="person";
        }

        return <Ionicons name={iconName} size={size} color={color}/>

      }

    })}
  >

  <Tab.Screen name="Home" component={HomeStack} />
  <Tab.Screen name="Discover" component={DiscoverStack} />
  <Tab.Screen name="Bookmark" component={BookmarkStack} />
  <Tab.Screen name="Profile" component={ProfileStack} />

  </Tab.Navigator>

  </NavigationContainer>

  )

}