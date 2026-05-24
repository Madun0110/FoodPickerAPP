import React, { useEffect, useRef, useState } from "react";

import {
    Animated,
    FlatList,
    TextInput,
    View,
    StyleSheet,
    Text,
} from "react-native";

import DiscoverCard from "../components/DiscoverCard";
import { discoverFoods } from "../Data/discoverFoods";

export default function Discover({ navigation }) {

    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    const [search, setSearch] = useState("");

    useEffect(() => {

        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true
        }).start();

    }, []);

    const filteredFoods = discoverFoods.filter((item) => {
        const foodName = item?.title || "";

        return foodName.toLowerCase().includes(search.toLowerCase());
    });

    return (

        <Animated.View style={{
            flex: 1,
            transform: [{ scale: scaleAnim }]
        }}>

            <View style={styles.searchContainer}>

                <TextInput
                    placeholder="Cari makanan..."
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                />

            </View>

            <FlatList
                data={filteredFoods}

                keyExtractor={(item, index) =>
                    (item?.id || index).toString()
                }

                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => (

                    <DiscoverCard
                        item={item}
                        onPress={() =>
                            navigation.navigate("FoodDetail", { food: item })
                        }
                    />

                )}

                ListEmptyComponent={

                    <Text style={styles.emptyText}>
                        Makanan tidak ditemukan
                    </Text>

                }

                contentContainerStyle={{
                    paddingBottom: 20
                }}

            />

        </Animated.View>

    );

}

const styles = StyleSheet.create({

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

    emptyText: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 16,
        color: "#777",
    },

});