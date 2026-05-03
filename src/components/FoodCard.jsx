import React, { useRef, useEffect } from "react";
import {
View,
Text,
Image,
StyleSheet,
TouchableOpacity,
Animated
} from "react-native";

/*
  Komponen FoodCard
  Fungsi: menampilkan card makanan + animasi
*/

export default function FoodCard({ item, onPress }) {

const scaleAnim = useRef(new Animated.Value(1)).current;
const fadeAnim = useRef(new Animated.Value(0)).current;

/* Animasi muncul */
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
    toValue: 0.96,
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

<Image
source={item.image}
style={styles.image}
/>

<View style={styles.info}>

<Text style={styles.title}>
{item.title}
</Text>

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
backgroundColor:"#fff",
borderRadius:15,
marginBottom:15,
overflow:"hidden",
elevation:3   // biar lebih modern (shadow Android)
},

image:{
width:"100%",
height:170
},

info:{
padding:10
},

title:{
fontSize:18,
fontWeight:"bold"
},

rating:{
color:"gray"
}

});   