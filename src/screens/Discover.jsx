import React, { useEffect, useState } from "react";

import {
    FlatList,
    TextInput,
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    Alert,
    RefreshControl,
    Image,
    TouchableOpacity,
} from "react-native";

import { getFoods } from "../services/FoodService";

export default function Discover({ navigation }) {
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchFoods();
    }, []);

    const getImageUri = (image) => {
        if (!image) {
            return "https://picsum.photos/400";
        }

        if (typeof image === "string") {
            return image;
        }

        return "https://picsum.photos/400";
    };

    const fetchFoods = async () => {
        try {
            setLoading(true);

            const data = await getFoods();

            const formattedData = data.map((item) => ({
                ...item,
                title: item.title || item.name || "Nama makanan",
                name: item.name || item.title || "Nama makanan",
                category: item.category || "Rekomendasi",
                price: item.price || "0",
                description:
                    item.description ||
                    "Makanan ini merupakan salah satu rekomendasi yang tersedia pada halaman discover.",
                rating: item.rating || null,
                image: getImageUri(item.image),
            }));

            setFoods(formattedData.reverse());
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Gagal mengambil data makanan");
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchFoods();
        setRefreshing(false);
    };

    const filteredFoods = foods.filter((item) => {
        const foodName = item?.title || item?.name || "";

        return foodName
            .toLowerCase()
            .includes(search.toLowerCase());
    });

    const handleOpenDetail = (item) => {
        const foodData = {
            id: item.id,
            name: item.name || item.title || "Nama makanan",
            title: item.title || item.name || "Nama makanan",
            image: getImageUri(item.image),
            rating: item.rating || null,
            category: item.category || "Rekomendasi",
            price: item.price || "0",
            description:
                item.description ||
                "Makanan ini merupakan salah satu rekomendasi yang tersedia pada halaman discover.",
        };

        navigation.navigate("FoodDetail", {
            food: foodData,
        });
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => handleOpenDetail(item)}
                activeOpacity={0.8}
            >
                <Image
                    source={{ uri: getImageUri(item.image) }}
                    style={styles.foodImage}
                    resizeMode="cover"
                    onError={(error) => {
                        console.log("Gambar gagal dimuat:", error.nativeEvent);
                    }}
                />

                <View style={styles.cardContent}>
                    <Text style={styles.foodName}>
                        {item.name || item.title || "Nama makanan"}
                    </Text>

                    <Text style={styles.foodCategory}>
                        {item.category || "Rekomendasi"}
                    </Text>

                    <Text style={styles.foodPrice}>
                        Rp {item.price || "0"}
                    </Text>

                    <Text style={styles.foodDescription} numberOfLines={2}>
                        {item.description || "Tidak ada deskripsi"}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Cari makanan..."
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#ff7f50"
                    style={styles.loading}
                />
            ) : (
                <FlatList
                    data={filteredFoods}
                    keyExtractor={(item, index) =>
                        (item?.id || index).toString()
                    }
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            Makanan tidak ditemukan
                        </Text>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f6f6",
    },

    searchContainer: {
        padding: 15,
        backgroundColor: "#fff",
    },

    searchInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },

    listContent: {
        padding: 15,
        paddingBottom: 120,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        marginBottom: 18,
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 8,
    },

    foodImage: {
        width: "100%",
        height: 180,
        backgroundColor: "#ddd",
    },

    cardContent: {
        padding: 12,
    },

    foodName: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 4,
    },

    foodCategory: {
        fontSize: 13,
        color: "#777",
        marginBottom: 4,
    },

    foodPrice: {
        fontSize: 14,
        color: "#ff7f50",
        fontWeight: "bold",
        marginBottom: 6,
    },

    foodDescription: {
        fontSize: 13,
        color: "#555",
        lineHeight: 18,
    },

    loading: {
        marginTop: 30,
    },

    emptyText: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 16,
        color: "#777",
    },
});