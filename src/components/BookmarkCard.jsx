import React from "react";
import {
View,
Text,
Image,
StyleSheet,
TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

/*
  Komponen BookmarkCard
  Fungsi: menampilkan makanan favorit
*/

export default function BookmarkCard({ item, onPress }) {

return(

<TouchableOpacity style={styles.card} onPress={onPress}>

<Image source={item.image} style={styles.image}/>

<View style={styles.overlay}>

<View style={styles.row}>

<Text style={styles.title}>
{item.title}
</Text>

<Ionicons
name="bookmark"
size={22}
color="#fff"
/>

</View>

<Text style={styles.rating}>
⭐ {item.rating}
</Text>

</View>

</TouchableOpacity>

);

}

const styles = StyleSheet.create({

card:{
marginBottom:20,
borderRadius:15,
overflow:"hidden"
},

image:{
width:"100%",
height:180
},

overlay:{
position:"absolute",
bottom:0,
left:0,
right:0,
padding:12,
backgroundColor:"rgba(0,0,0,0.4)"
},

row:{
flexDirection:"row",
justifyContent:"space-between"
},

title:{
color:"#fff",
fontSize:18,
fontWeight:"bold"
},

rating:{
color:"#fff",
marginTop:5
}

});