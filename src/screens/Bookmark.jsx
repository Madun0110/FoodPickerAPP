import React, { useRef } from "react";
import { Animated } from "react-native";

import BookmarkCard from "../components/BookmarkCard";
import { bookmarkFoods } from "../Data/bookmarkFoods";

export default function Bookmark({ navigation }){

const scrollY = useRef(new Animated.Value(0)).current;

return(

<Animated.FlatList
data={bookmarkFoods}
keyExtractor={(item)=>item.id.toString()}

onScroll={Animated.event(
[{ nativeEvent: { contentOffset: { y: scrollY } } }],
{ useNativeDriver: true }
)}

renderItem={({item,index}) => {

const inputRange = [
(index - 1) * 200,
index * 200,
(index + 1) * 200
];

const scale = scrollY.interpolate({
inputRange,
outputRange:[0.9,1,0.9],
extrapolate:"clamp"
});

return(

<Animated.View style={{
transform:[{ scale }]
}}>

<BookmarkCard
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