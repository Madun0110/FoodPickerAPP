import React from "react";
import {
View,
Text,
FlatList,
StyleSheet
} from "react-native";

import BookmarkCard from "../components/BookmarkCard";
import { bookmarkFoods } from "../Data/bookmarkFoods";

/*
  Screen Bookmark
  Fungsi: menampilkan daftar makanan favorit
*/

export default function Bookmark({ navigation }) {

return(

<View style={styles.container}>

<Text style={styles.title}>
My Favorite Foods
</Text>

<FlatList
data={bookmarkFoods}
keyExtractor={(item)=>item.id.toString()}

renderItem={({item}) => (

<BookmarkCard
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
marginBottom:15
}

});