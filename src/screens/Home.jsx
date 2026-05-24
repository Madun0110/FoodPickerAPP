import React, {
  useRef,
  useEffect,
  useState
} from "react";

import * as ImagePicker from "expo-image-picker";

import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Keyboard,
  ActivityIndicator,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import FoodCard from "../components/FoodCard";

import {
  getFoods,
  addFood,
  updateFood,
  deleteFood
} from "../services/FoodService";

export default function Home({ navigation }) {

  const listRef = useRef(null);

  const [foods, setFoods] = useState([]);

  const [foodName, setFoodName] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodImage, setFoodImage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [foodNameError, setFoodNameError] = useState("");
  const [foodPriceError, setFoodPriceError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);

      const data = await getFoods();

      setFoods([...data].reverse());
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal mengambil data makanan");
    } finally {
      setLoading(false);
    }
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

  const handleFoodPriceChange = (text) => {
    setFoodPrice(text);

    if (text.trim() !== "" && isNaN(Number(text))) {
      setFoodPriceError("Harga harus berupa angka");
    } else {
      setFoodPriceError("");
    }
  };

  const handlePickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Izin ditolak",
          "Aplikasi membutuhkan izin akses galeri"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        setFoodImage(result.assets[0].uri);
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal memilih gambar");
    }
  };

  const handleRemoveImage = () => {
    setFoodImage("");
  };

  const resetForm = () => {
    setFoodName("");
    setFoodCategory("");
    setFoodPrice("");
    setFoodDescription("");
    setFoodImage("");

    setFoodNameError("");
    setFoodPriceError("");

    setEditingId(null);

    Keyboard.dismiss();
  };

  const validateForm = () => {
    let isValid = true;

    if (foodName.trim().length === 0) {
      setFoodNameError("Nama makanan wajib diisi");
      isValid = false;
    } else if (foodName.trim().length < 3) {
      setFoodNameError("Nama makanan minimal 3 karakter");
      isValid = false;
    }

    if (foodPrice.trim() !== "" && isNaN(Number(foodPrice))) {
      setFoodPriceError("Harga harus berupa angka");
      isValid = false;
    }

    return isValid;
  };

  const handleSaveFood = async () => {
    if (!validateForm()) return;

    const payload = {
      name: foodName.trim(),
      category: foodCategory.trim() || "Umum",
      price: foodPrice.trim() || "0",
      description: foodDescription.trim() || "Tidak ada deskripsi",
      image: foodImage || "https://picsum.photos/400"
    };

    try {
      setLoading(true);

      if (editingId) {
        const updatedFood = await updateFood(editingId, payload);

        setFoods(
          foods.map((item) =>
            item.id === editingId ? updatedFood : item
          )
        );

        Alert.alert("Berhasil", "Data makanan berhasil diubah");
      } else {
        const newFood = await addFood(payload);

        setFoods([newFood, ...foods]);

        Alert.alert("Berhasil", "Data makanan berhasil ditambahkan");
      }

      resetForm();

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal menyimpan data makanan");
    } finally {
      setLoading(false);
    }
  };

  const handleEditFood = (item) => {
    setEditingId(item.id);

    setFoodName(item.name || "");
    setFoodCategory(item.category || "");
    setFoodPrice(item.price?.toString() || "");
    setFoodDescription(item.description || "");
    setFoodImage(item.image || "");

    listRef.current?.scrollToOffset({
      offset: 0,
      animated: false
    });
  };

  const handleDeleteFood = (id) => {
    Alert.alert(
      "Konfirmasi",
      "Apakah kamu yakin ingin menghapus data ini?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);

              await deleteFood(id);

              setFoods(foods.filter((item) => item.id !== id));

              Alert.alert("Berhasil", "Data makanan berhasil dihapus");

              if (editingId === id) {
                resetForm();
              }

            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Gagal menghapus data makanan");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const isButtonDisabled =
    foodName.trim().length < 3 ||
    foodNameError !== "" ||
    foodPriceError !== "" ||
    loading;

  const renderForm = () => (
    <View style={styles.formCard}>

      <Text style={styles.title}>
        {editingId ? "Edit Makanan" : "Tambah Makanan"}
      </Text>

      <Text style={styles.subtitle}>
        Lengkapi data makanan di bawah ini
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
      />

      {foodNameError ? (
        <Text style={styles.errorText}>{foodNameError}</Text>
      ) : null}

      <TextInput
        placeholder="Kategori makanan"
        style={styles.input}
        value={foodCategory}
        onChangeText={setFoodCategory}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="Harga makanan"
        style={[
          styles.input,
          foodPriceError ? styles.inputError : null
        ]}
        value={foodPrice}
        onChangeText={handleFoodPriceChange}
        keyboardType="numeric"
      />

      {foodPriceError ? (
        <Text style={styles.errorText}>{foodPriceError}</Text>
      ) : null}

      <TextInput
        placeholder="Deskripsi makanan"
        style={[styles.input, styles.textArea]}
        value={foodDescription}
        onChangeText={setFoodDescription}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity
        style={styles.imageButton}
        onPress={handlePickImage}
      >
        <Text style={styles.imageButtonText}>
          {foodImage ? "Ganti Gambar" : "Pilih Gambar"}
        </Text>
      </TouchableOpacity>

      {foodImage ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: foodImage }}
            style={styles.previewImage}
          />

          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={handleRemoveImage}
          >
            <Text style={styles.removeImageText}>
              Hapus Gambar
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <TouchableOpacity
        style={[
          styles.button,
          isButtonDisabled && styles.buttonDisabled
        ]}
        onPress={handleSaveFood}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Menyimpan..."
            : editingId
              ? "Update Data"
              : "Tambah Data"
          }
        </Text>
      </TouchableOpacity>

      {editingId ? (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={resetForm}
        >
          <Text style={styles.cancelButtonText}>
            Batal Edit
          </Text>
        </TouchableOpacity>
      ) : null}

    </View>
  );

  const renderItem = ({ item }) => {
    if (!item) return null;

    return (
      <View style={styles.itemCard}>

        <FoodCard
          item={item}
          onPress={() =>
            navigation.navigate("FoodDetail", { food: item })
          }
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Kategori: {item.category || "Umum"}
          </Text>

          <Text style={styles.infoText}>
            Harga: Rp {item.price || "0"}
          </Text>
        </View>

        <View style={styles.actionContainer}>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditFood(item)}
          >
            <Text style={styles.actionText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteFood(item.id)}
          >
            <Text style={styles.actionText}>
              Hapus
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  };

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >

      <FlatList
        ref={listRef}
        data={foods}
        keyExtractor={(item, index) =>
          (item?.id || index).toString()
        }
        renderItem={renderItem}

        // UBAH BAGIAN INI
        ListHeaderComponent={renderForm()}

        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        removeClippedSubviews={false}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#ff7f50"
              style={{ marginVertical: 20 }}
            />
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />

    </KeyboardAvoidingView>

  );

}

const styles = StyleSheet.create({

  listContent: {
    padding: 15,
    paddingBottom: 130,
    backgroundColor: "#f6f6f6"
  },

  formCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 8,
    elevation: 3
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222"
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginBottom: 14
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    fontSize: 14
  },

  textArea: {
    height: 85,
    textAlignVertical: "top"
  },

  inputError: {
    borderColor: "#e74c3c"
  },

  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginBottom: 8
  },

  imageButton: {
    backgroundColor: "#2ecc71",
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 10
  },

  imageButtonText: {
    color: "#fff",
    fontWeight: "bold"
  },

  previewContainer: {
    marginBottom: 10
  },

  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 14,
    marginBottom: 8
  },

  removeImageButton: {
    backgroundColor: "#fff0f0",
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },

  removeImageText: {
    color: "#e74c3c",
    fontWeight: "bold"
  },

  button: {
    backgroundColor: "#ff7f50",
    padding: 14,
    borderRadius: 12,
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

  cancelButton: {
    backgroundColor: "#eeeeee",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8
  },

  cancelButtonText: {
    color: "#333",
    fontWeight: "bold"
  },

  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 8,
    elevation: 3
  },

  foodImage: {
    width: "100%",
    height: 170,
    borderRadius: 15,
    marginBottom: 10
  },

  infoBox: {
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 10
  },

  infoText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 3
  },

  actionContainer: {
    flexDirection: "row",
    gap: 10
  },

  editButton: {
    flex: 1,
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 12,
    alignItems: "center"
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 12,
    alignItems: "center"
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold"
  }

});