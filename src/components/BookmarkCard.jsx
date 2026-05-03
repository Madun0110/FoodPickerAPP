import React, { useRef, useEffect } from "react";
import {
View,
Text,
Image,
StyleSheet,
TouchableOpacity,
Animated
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

/*
  Komponen BookmarkCard
  Fungsi: menampilkan makanan favorit + animasi
*/

export default function BookmarkCard({ item, onPress }) {

const scaleAnim = useRef(new Animated.Value(1)).current;
const fadeAnim = useRef(new Animated.Value(0)).current;

/* Animasi muncul (fade in) */
useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 600,
    useNativeDriver: true
  }).start();
}, []);

/* Animasi tekan */
const pressIn = () => {
  Animated.spring(scaleAnim, {
    toValue: 0.95,
    useNativeDriver: true
  }).start();
};

const pressOut = () => {
  Animated.spring(scaleAnim, {
    toValue: 1,
    useNativeDriver: true
  }).start();
};

return(

<Animated.View
style={{
opacity: fadeAnim,
transform: [{ scale: scaleAnim }]
}}
>

<TouchableOpacity
style={styles.card}
onPress={onPress}
onPressIn={pressIn}
onPressOut={pressOut}
activeOpacity={0.9}
>

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

</Animated.View>

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