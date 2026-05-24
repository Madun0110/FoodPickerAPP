import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function FoodDetail({ route }) {

    const { food } = route.params;

    return (

        <View style={styles.container}>

            <Image
                source={food.image}
                style={styles.image}
            />

            <Text style={styles.title}>
                {food.title}
            </Text>

            <Text>
                ⭐ {food.rating}
            </Text>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    image: {
        width: 300,
        height: 200,
        borderRadius: 15
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10
    }

});