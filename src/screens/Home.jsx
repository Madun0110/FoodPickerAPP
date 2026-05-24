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
  Text,
  Alert,
  Keyboard
} from "react-native";

import FoodCard from "../components/FoodCard";

// pastikan getFoods sudah di-import sesuai lokasi file kamu
import { getFoods } from "../services/FoodService";

export default function Home({ navigation }) {

  const scrollY = useRef(new Animated.Value(0)).current;

  const [foods, setFoods] = useState([]);

  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");

  const [foodNameError, setFoodNameError] = useState("");
  const [foodImageError, setFoodImageError] = useState("");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const data = await getFoods();
      console.log(data);
      setFoods(data);
    } catch (error) {
      console.log(error);
    }
  };

  const validateImageUrl = (url) => {
    if (!url) return true;

    const cleanUrl = url.trim();

    const urlPattern = /^(https?:\/\/)[^\s]+$/i;

    return urlPattern.test(cleanUrl);
  };

  const handleFoodNameChange = (text) => {
    setFoodName(text);

    if (text.trim().length === 0) {
      setFoodNameError("Nama makanan wajib diisi");
    } else if (text.trim().length < 3) {
      setFoodNameError("Nama makanan minimal 3 karakter");
    } else {
      setFoodNameError("");
    }
  };

  const handleFoodImageChange = (text) => {
    setFoodImage(text);

    const cleanUrl = text.trim();

    if (cleanUrl !== "" && !validateImageUrl(cleanUrl)) {
      setFoodImageError(
        "URL gambar harus diawali http:// atau https://"
      );
    } else {
      setFoodImageError("");
    }

    const handleAddFood = () => {
      const name = foodName.trim();
      const image = foodImage.trim();

      let isValid = true;

      if (name.length === 0) {
        setFoodNameError("Nama makanan wajib diisi");
        isValid = false;
      } else if (name.length < 3) {
        setFoodNameError("Nama makanan minimal 3 karakter");
        isValid = false;
      }

      if (image !== "" && !validateImageUrl(image)) {
        setFoodImageError("URL gambar harus valid");
        isValid = false;
      }

      if (!isValid) return;

      const newFood = {
        id: Date.now(),
        name: name,
        image: image || "https://picsum.photos/400"
      };

      setFoods([newFood, ...foods]);

      setFoodName("");
      setFoodImage("");
      setFoodNameError("");
      setFoodImageError("");

      Keyboard.dismiss();

      Alert.alert("Berhasil", "Data makanan berhasil ditambahkan");
    };

    const isButtonDisabled =
      foodName.trim().length < 3 ||
      foodNameError !== "" ||
      foodImageError !== "";

    return (

      <View style={{ flex: 1 }}>

        <View style={styles.formContainer}>

          <Text style={styles.title}>
            Tambah Makanan
          </Text>

          <TextInput
            placeholder="Nama makanan"
            style={[
              styles.input,
              foodNameError ? styles.inputError : null
            ]}
            value={foodName}
            onChangeText={handleFoodNameChange}
            autoCapitalize="words"
            returnKeyType="next"
          />

          {foodNameError ? (
            <Text style={styles.errorText}>{foodNameError}</Text>
          ) : null}

          <TextInput
            placeholder="URL gambar makanan"
            style={[
              styles.input,
              foodImageError ? styles.inputError : null
            ]}
            value={foodImage}
            onChangeText={handleFoodImageChange}
            autoCapitalize="none"
            keyboardType="url"
            returnKeyType="done"
            onSubmitEditing={handleAddFood}
          />

          {foodImageError ? (
            <Text style={styles.errorText}>{foodImageError}</Text>
          ) : null}

          <TouchableOpacity
            style={[
              styles.button,
              isButtonDisabled && styles.buttonDisabled
            ]}
            onPress={handleAddFood}
            disabled={isButtonDisabled}
          >
            <Text style={styles.buttonText}>
              Tambah
            </Text>
          </TouchableOpacity>

        </View>

        <Animated.FlatList

          data={foods}

          keyExtractor={(item, index) =>
            (item?.id || index).toString()
          }

          showsVerticalScrollIndicator={false}

          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}

          scrollEventThrottle={16}

          renderItem={({ item, index }) => {

            if (!item) return null;

            const ITEM_HEIGHT = 220;

            const inputRange = [
              (index - 1) * ITEM_HEIGHT,
              index * ITEM_HEIGHT,
              (index + 1) * ITEM_HEIGHT
            ];

            const opacity = scrollY.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp"
            });

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [0.9, 1, 0.9],
              extrapolate: "clamp"
            });

            const translateY = scrollY.interpolate({
              inputRange,
              outputRange: [50, 0, -50],
              extrapolate: "clamp"
            });

            return (

              <Animated.View style={{
                opacity,
                transform: [{ scale }]
              }}>

                <View style={styles.imageWrapper}>

                  <Animated.Image
                    source={{
                      uri: item.image || "https://picsum.photos/400"
                    }}
                    style={[
                      styles.image,
                      {
                        transform: [{ translateY }]
                      }
                    ]}
                  />

                </View>

                <FoodCard
                  item={item}
                  onPress={() =>
                    navigation.navigate("FoodDetail", { food: item })
                  }
                />

              </Animated.View>

            );

          }}

          contentContainerStyle={{
            padding: 15,
            paddingTop: 10
          }}

        />

      </View>

    );

  }
}
const styles = StyleSheet.create({

  formContainer: {
    padding: 15,
    backgroundColor: "#fff"
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 5
  },

  inputError: {
    borderColor: "red"
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10
  },

  button: {
    backgroundColor: "#ff7f50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5
  },

  buttonDisabled: {
    backgroundColor: "#ccc"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },

  imageWrapper: {
    height: 150,
    overflow: "hidden",
    borderRadius: 15,
    marginBottom: 10
  },

  image: {
    width: "100%",
    height: "100%"
  }

});