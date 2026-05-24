import React, {
  useRef,
  useEffect,
  useState
} from "react";

import {
  Animated,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";

import FoodCard from "../components/FoodCard";

/* import API */
import { getFoods } from "../api/foodApi";

export default function Home({ navigation }) {

  const scrollY = useRef(new Animated.Value(0)).current;

  /* state foods */
  const [foods, setFoods] = useState([]);

  /* FORM STATE */
  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");

  /* GET API */
  useEffect(() => {

    fetchFoods();

  }, []);

  const fetchFoods = async () => {

    try {

      const data = await getFoods();

      console.log(data);

      setFoods(data);

    } catch(error){

      console.log(error);

    }

  };

  /* TAMBAH DATA */
  const handleAddFood = () => {

    if(!foodName){
      alert("Nama makanan wajib diisi");
      return;
    }

    const newFood = {
      id: Date.now(),
      name: foodName,
      image:
        foodImage ||
        "https://picsum.photos/400"
    };

    setFoods([newFood, ...foods]);

    setFoodName("");
    setFoodImage("");
  };

  return(

    <View style={{ flex:1 }}>

      {/* FORM */}
      <View style={styles.formContainer}>

        <Text style={styles.title}>
          Tambah Makanan
        </Text>

        <TextInput
          placeholder="Nama makanan"
          style={styles.input}
          value={foodName}
          onChangeText={setFoodName}
        />

        <TextInput
          placeholder="URL gambar makanan"
          style={styles.input}
          value={foodImage}
          onChangeText={setFoodImage}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddFood}
        >
          <Text style={styles.buttonText}>
            Tambah
          </Text>
        </TouchableOpacity>

      </View>


      <Animated.FlatList

        data={foods}

        /* FIX ERROR */
        keyExtractor={(item,index)=>
          (item?.id || index).toString()
        }

        showsVerticalScrollIndicator={false}

        /* scroll animation */
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}

        scrollEventThrottle={16}

        renderItem={({item,index}) => {

          /* kalau item kosong */
          if(!item) return null;

          const ITEM_HEIGHT = 220;

          const inputRange = [
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT
          ];

          /* fade */
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange:[0.3,1,0.3],
            extrapolate:"clamp"
          });

          /* scale */
          const scale = scrollY.interpolate({
            inputRange,
            outputRange:[0.9,1,0.9],
            extrapolate:"clamp"
          });

          /* parallax */
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange:[50,0,-50],
            extrapolate:"clamp"
          });

          return(

            <Animated.View style={{
              opacity,
              transform:[{ scale }]
            }}>

              {/* IMAGE PARALLAX */}
              <View style={styles.imageWrapper}>

                <Animated.Image

                  source={{
                    uri:
                    item.image ||
                    "https://picsum.photos/400"
                  }}

                  style={[
                    styles.image,
                    {
                      transform:[{ translateY }]
                    }
                  ]}

                />

              </View>

              {/* FOOD CARD */}
              <FoodCard
                item={item}
                onPress={() =>
                  navigation.navigate("FoodDetail",{food:item})
                }
              />

            </Animated.View>

          );

        }}

        contentContainerStyle={{
          padding:15,
          paddingTop:10
        }}

      />

    </View>

  );

}

const styles = StyleSheet.create({

  formContainer:{
    padding:15,
    backgroundColor:"#fff"
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:10
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:10,
    padding:12,
    marginBottom:10
  },

  button:{
    backgroundColor:"#ff7f50",
    padding:14,
    borderRadius:10,
    alignItems:"center"
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16
  },

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