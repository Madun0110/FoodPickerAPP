import React,{useEffect,useRef} from "react";
import {
View,
FlatList,
StyleSheet,
Animated
} from "react-native";

import DiscoverCard from "../components/DiscoverCard";
import { discoverFoods } from "../Data/discoverFoods";

export default function Discover({ navigation }){

const scaleAnim = useRef(new Animated.Value(0.9)).current;

useEffect(()=>{
Animated.spring(scaleAnim,{
toValue:1,
useNativeDriver:true
}).start();
},[]);

return(

<Animated.View style={{
flex:1,
transform:[{scale:scaleAnim}]
}}>

<FlatList
data={discoverFoods}
numColumns={2}
keyExtractor={(item)=>item.id.toString()}
renderItem={({item})=>(
<DiscoverCard
item={item}
onPress={()=>navigation.navigate("FoodDetail",{food:item})}
/>
)}
/>

</Animated.View>

);
}