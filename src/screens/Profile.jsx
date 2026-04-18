import React,{useState} from "react";
import {
View,
Text,
StyleSheet,
Image,
ScrollView,
Switch
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Profile(){

const [darkMode,setDarkMode] = useState(false);

return(

<ScrollView style={styles.container}>

{/* HEADER PROFILE */}

<View style={styles.header}>

<Image
source={require("../../assets/madun.jpeg")}
style={styles.avatar}
/>

<View style={styles.info}>

<Text style={styles.name}>
Madun King
</Text>

<Text style={styles.email}>
madun@email.com
</Text>

</View>

<Ionicons name="settings-outline" size={24}/>

</View>


{/* USER STATISTICS */}

<View style={styles.statsContainer}>

<View style={styles.statBox}>
<Text style={styles.statNumber}>24</Text>
<Text style={styles.statText}>Orders</Text>
</View>

<View style={styles.statBox}>
<Text style={styles.statNumber}>12</Text>
<Text style={styles.statText}>Favorites</Text>
</View>

<View style={styles.statBox}>
<Text style={styles.statNumber}>8</Text>
<Text style={styles.statText}>Reviews</Text>
</View>

</View>


{/* WALLET CARD */}

<View style={styles.walletCard}>

<Ionicons name="wallet" size={30} color="#fff"/>

<View style={{marginLeft:10}}>

<Text style={styles.walletTitle}>
Food Wallet
</Text>

<Text style={styles.walletBalance}>
Rp 150.000
</Text>

</View>

</View>


{/* MENU LIST */}

<View style={styles.menu}>

<View style={styles.menuItem}>
<Ionicons name="gift-outline" size={22}/>
<Text style={styles.menuText}>Food Voucher</Text>
</View>

<View style={styles.menuItem}>
<Ionicons name="time-outline" size={22}/>
<Text style={styles.menuText}>Order History</Text>
</View>

<View style={styles.menuItem}>
<Ionicons name="heart-outline" size={22}/>
<Text style={styles.menuText}>Favorite Foods</Text>
</View>

<View style={styles.menuItem}>

<Ionicons name="moon-outline" size={22}/>
<Text style={styles.menuText}>Dark Mode</Text>

<Switch
value={darkMode}
onValueChange={()=>setDarkMode(!darkMode)}
/>

</View>

</View>

</ScrollView>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5"
},

header:{
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between",
padding:20
},

avatar:{
width:70,
height:70,
borderRadius:40
},

info:{
flex:1,
marginLeft:10
},

name:{
fontSize:18,
fontWeight:"bold"
},

email:{
color:"gray"
},

statsContainer:{
flexDirection:"row",
justifyContent:"space-around",
backgroundColor:"#fff",
margin:15,
padding:15,
borderRadius:15
},

statBox:{
alignItems:"center"
},

statNumber:{
fontSize:18,
fontWeight:"bold"
},

statText:{
color:"gray"
},

walletCard:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#ff6b6b",
marginHorizontal:15,
padding:20,
borderRadius:15
},

walletTitle:{
color:"#fff",
fontSize:16
},

walletBalance:{
color:"#fff",
fontWeight:"bold",
fontSize:18
},

menu:{
backgroundColor:"#fff",
margin:15,
padding:15,
borderRadius:15
},

menuItem:{
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between",
marginBottom:18
},

menuText:{
flex:1,
marginLeft:10,
fontSize:16
}

});