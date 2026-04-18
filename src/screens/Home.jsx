import React from "react";
import {
View,
FlatList,
StyleSheet
} from "react-native";

import FoodCard from "../components/FoodCard";
import { blogs } from "../Data/blogs";

/*
  Screen Home
  Fungsi: menampilkan daftar makanan
*/

export default function Home({ navigation }) {

return(

<View style={styles.container}>

<FlatList
data={blogs}
keyExtractor={(item)=>item.id.toString()}

renderItem={({item}) => (

<FoodCard
item={item}
onPress={()=>navigation.navigate("FoodDetail",{food:item})}
/>

)}

/>

</View>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5",
padding:15
}

});