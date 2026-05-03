import React, { useRef } from "react";
import {
Animated,
View,
StyleSheet,
Image
} from "react-native";

import FoodCard from "../components/FoodCard";
import { blogs } from "../Data/blogs";

export default function Home({ navigation }) {

const scrollY = useRef(new Animated.Value(0)).current;

return(

<Animated.FlatList
data={blogs}
keyExtractor={(item)=>item.id.toString()}

showsVerticalScrollIndicator={false}

/* Scroll tracking */
onScroll={Animated.event(
[{ nativeEvent: { contentOffset: { y: scrollY } } }],
{ useNativeDriver: true }
)}

scrollEventThrottle={16}

renderItem={({item, index}) => {

/* ukuran card */
const ITEM_HEIGHT = 200;

const inputRange = [
(index - 1) * ITEM_HEIGHT,
index * ITEM_HEIGHT,
(index + 1) * ITEM_HEIGHT
];

/* fade */
const opacity = scrollY.interpolate({
inputRange,
outputRange: [0.3, 1, 0.3],
extrapolate: "clamp"
});

/* scale */
const scale = scrollY.interpolate({
inputRange,
outputRange: [0.9, 1, 0.9],
extrapolate: "clamp"
});

/* parallax image */
const translateY = scrollY.interpolate({
inputRange,
outputRange: [50, 0, -50],
extrapolate: "clamp"
});

return(

<Animated.View style={{
opacity,
transform:[{ scale }]
}}>

{/* Parallax Image Wrapper */}
<View style={styles.imageWrapper}>

<Animated.Image
source={item.image}
style={[
styles.image,
{ transform: [{ translateY }] }
]}
/>

</View>

{/* Card */}
<FoodCard
item={item}
onPress={()=>navigation.navigate("FoodDetail",{food:item})}
/>

</Animated.View>

);

}}

contentContainerStyle={{padding:15}}
/>

);
}

const styles = StyleSheet.create({

imageWrapper:{
height:150,
overflow:"hidden",
borderRadius:15,
marginBottom:10
},

image:{
width:"100%",
height:"100%"
}

});