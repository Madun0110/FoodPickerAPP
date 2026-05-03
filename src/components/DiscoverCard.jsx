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
  Komponen DiscoverCard
  Fungsi: menampilkan grid makanan
*/

export default function DiscoverCard({ item, onPress }) {

return(

<TouchableOpacity
style={styles.card}
onPress={onPress}
>

<Image
source={item.image}
style={styles.image}
/>

<View style={styles.info}>

<Text style={styles.title}>
{item.title}
</Text>

<View style={styles.row}>

<Text style={styles.rating}>
⭐ {item.rating}
</Text>

<Ionicons
name="bookmark-outline"
size={18}
/>

</View>

</View>

</TouchableOpacity>

);

}

const styles = StyleSheet.create({

card:{
width:"100%",
backgroundColor:"#fff",
borderRadius:12,
marginBottom:10,
overflow:"hidden"
},

image:{
width:"100%",
height:100
},

info:{
padding:8
},

title:{
fontWeight:"bold"
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:5
},

rating:{
color:"gray"
}

});