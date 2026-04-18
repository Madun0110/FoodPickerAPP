import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/*
  Komponen SearchBar
  Fungsi: mencari makanan
*/

export default function SearchBar(){

return(

<View style={styles.container}>

<Ionicons name="search" size={20} color="gray"/>

<TextInput
placeholder="Search food..."
style={styles.input}
/>

</View>

);

}

const styles = StyleSheet.create({

container:{
flexDirection:"row",
backgroundColor:"#eee",
padding:12,
borderRadius:12,
alignItems:"center",
marginBottom:15
},

input:{
marginLeft:10,
flex:1
}

});