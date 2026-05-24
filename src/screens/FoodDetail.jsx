import React from "react";

import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from "react-native";

export default function FoodDetail({ route, navigation }) {

    const { food } = route.params;

    const imageSource =
        typeof food.image === "string"
            ? { uri: food.image }
            : food.image;

    return (

        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >

            <Image
                source={imageSource || { uri: "https://picsum.photos/400" }}
                style={styles.image}
            />

            <View style={styles.detailCard}>

                <Text style={styles.title}>
                    {food.name || food.title || "Nama makanan"}
                </Text>

                <View style={styles.row}>

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {food.category || "Umum"}
                        </Text>
                    </View>

                    {food.rating ? (
                        <Text style={styles.rating}>
                            ⭐ {food.rating}
                        </Text>
                    ) : null}

                </View>

                <Text style={styles.price}>
                    Rp {food.price || "0"}
                </Text>

                <Text style={styles.sectionTitle}>
                    Deskripsi
                </Text>

                <Text style={styles.description}>
                    {food.description || "Tidak ada deskripsi makanan."}
                </Text>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>
                        Kembali
                    </Text>
                </TouchableOpacity>

            </View>

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f6f6f6"
    },

    contentContainer: {
        paddingBottom: 120
    },

    image: {
        width: "100%",
        height: 280,
        resizeMode: "cover"
    },

    detailCard: {
        backgroundColor: "#fff",
        marginTop: -25,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        padding: 20,
        minHeight: 400
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 12
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14
    },

    badge: {
        backgroundColor: "#fff0e8",
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20
    },

    badgeText: {
        color: "#ff7f50",
        fontWeight: "bold"
    },

    rating: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#333"
    },

    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2ecc71",
        marginBottom: 24
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 8
    },

    description: {
        fontSize: 15,
        color: "#555",
        lineHeight: 23
    },

    backButton: {
        backgroundColor: "#ff7f50",
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 30
    },

    backButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    }

});