import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Switch,
    ActivityIndicator,
    Alert,
    TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { supabase } from "../lib/supabase";
import { logoutUser } from "../services/AuthService";

export default function Profile({ navigation }) {

    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        photo_url: "",
        order: 0,
        favorite: 0,
        review: 0,
    });

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            setLoading(true);

            const { data: userData, error: userError } =
                await supabase.auth.getUser();

            if (userError) {
                throw new Error(userError.message);
            }

            const user = userData.user;

            if (!user) {
                throw new Error("User belum login");
            }

            const { data, error } = await supabase
                .from("users")
                .select("name, email, photo_url, order, favorite, review")
                .eq("id", user.id)
                .maybeSingle();

            if (error) {
                throw new Error(error.message);
            }

            setProfile({
                name: data?.name || user.user_metadata?.name || "User",
                email: data?.email || user.email || "-",
                photo_url: data?.photo_url || "",
                order: data?.order || 0,
                favorite: data?.favorite || 0,
                review: data?.review || 0,
            });

        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();

            navigation
                .getParent()
                ?.getParent()
                ?.replace("Login");

        } catch (error) {
            Alert.alert("Logout Gagal", error.message);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ff7f50" />
                <Text style={styles.loadingText}>Memuat profil...</Text>
            </View>
        );
    }

    return (

        <ScrollView style={styles.container}>

            {/* HEADER PROFILE */}

            <View style={styles.header}>

                <Image
                    source={
                        profile.photo_url
                            ? { uri: profile.photo_url }
                            : require("../../assets/madun.jpeg")
                    }
                    style={styles.avatar}
                />

                <View style={styles.info}>

                    <Text style={styles.name}>
                        {profile.name}
                    </Text>

                    <Text style={styles.email}>
                        {profile.email}
                    </Text>

                </View>

                <Ionicons name="settings-outline" size={24} />

            </View>


            {/* USER STATISTICS */}

            <View style={styles.statsContainer}>

                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>
                        {profile.order}
                    </Text>
                    <Text style={styles.statText}>Orders</Text>
                </View>

                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>
                        {profile.favorite}
                    </Text>
                    <Text style={styles.statText}>Favorites</Text>
                </View>

                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>
                        {profile.review}
                    </Text>
                    <Text style={styles.statText}>Reviews</Text>
                </View>

            </View>


            {/* WALLET CARD */}

            <View style={styles.walletCard}>

                <Ionicons name="wallet" size={30} color="#fff" />

                <View style={{ marginLeft: 10 }}>

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
                    <Ionicons name="gift-outline" size={22} />
                    <Text style={styles.menuText}>Food Voucher</Text>
                </View>

                <View style={styles.menuItem}>
                    <Ionicons name="time-outline" size={22} />
                    <Text style={styles.menuText}>Order History</Text>
                </View>

                <View style={styles.menuItem}>
                    <Ionicons name="heart-outline" size={22} />
                    <Text style={styles.menuText}>Favorite Foods</Text>
                </View>

                <View style={styles.menuItem}>

                    <Ionicons name="moon-outline" size={22} />
                    <Text style={styles.menuText}>Dark Mode</Text>

                    <Switch
                        value={darkMode}
                        onValueChange={() => setDarkMode(!darkMode)}
                    />

                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={22} color="#fff" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },

    loadingText: {
        marginTop: 10,
        color: "gray"
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20
    },

    avatar: {
        width: 70,
        height: 70,
        borderRadius: 40
    },

    info: {
        flex: 1,
        marginLeft: 10
    },

    name: {
        fontSize: 18,
        fontWeight: "bold"
    },

    email: {
        color: "gray"
    },

    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        margin: 15,
        padding: 15,
        borderRadius: 15
    },

    statBox: {
        alignItems: "center"
    },

    statNumber: {
        fontSize: 18,
        fontWeight: "bold"
    },

    statText: {
        color: "gray"
    },

    walletCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ff6b6b",
        marginHorizontal: 15,
        padding: 20,
        borderRadius: 15
    },

    walletTitle: {
        color: "#fff",
        fontSize: 16
    },

    walletBalance: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18
    },

    menu: {
        backgroundColor: "#fff",
        margin: 15,
        padding: 15,
        borderRadius: 15
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18
    },

    menuText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16
    },

    logoutButton: {
        flexDirection: "row",
        backgroundColor: "#e74c3c",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5
    },

    logoutText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 8
    }

});