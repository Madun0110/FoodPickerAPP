import React from "react";
import {
View,
Text,
StyleSheet,
FlatList
} from "react-native";

import SearchBar from "../components/SearchBar";
import DiscoverCard from "../components/DiscoverCard";

import { discoverFoods } from "../Data/discoverFoods";

/*
  Screen Discover
  Fungsi: menampilkan daftar makanan populer
*/

export default function Discover({ navigation }){

return(

<View style={styles.container}>

<Text style={styles.title}>
Discover Food
</Text>

<SearchBar/>

<FlatList
data={discoverFoods}
numColumns={2}
keyExtractor={(item)=>item.id.toString()}

columnWrapperStyle={{
justifyContent:"space-between"
}}

renderItem={({item}) => (

<DiscoverCard
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
},

title:{
fontSize:24,
fontWeight:"bold",
marginBottom:10
}

});