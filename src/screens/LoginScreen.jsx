import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = () => {
        let isValid = true;

        if (email.trim() === "") {
            setEmailError("Email wajib diisi");
            isValid = false;
        } else if (!email.includes("@")) {
            setEmailError("Format email tidak valid");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (password.trim() === "") {
            setPasswordError("Password wajib diisi");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password minimal 6 karakter");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!isValid) return;

        Alert.alert("Berhasil", "Login berhasil");

        navigation.replace("MainTabs");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>

                <Text style={styles.subtitle}>
                    Masuk untuk mengelola data makanan
                </Text>

                <TextInput
                    placeholder="Email"
                    style={[
                        styles.input,
                        emailError ? styles.inputError : null
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {emailError ? (
                    <Text style={styles.errorText}>{emailError}</Text>
                ) : null}

                <TextInput
                    placeholder="Password"
                    style={[
                        styles.input,
                        passwordError ? styles.inputError : null
                    ]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {passwordError ? (
                    <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.linkText}>
                        Belum punya akun? Daftar
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f6f6f6",
        justifyContent: "center",
        padding: 15
    },

    card: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 18,
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
        fontSize: 26,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 4,
        textAlign: "center"
    },

    subtitle: {
        fontSize: 13,
        color: "#777",
        marginBottom: 18,
        textAlign: "center"
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

    inputError: {
        borderColor: "#e74c3c"
    },

    errorText: {
        color: "#e74c3c",
        fontSize: 12,
        marginBottom: 8
    },

    button: {
        backgroundColor: "#ff7f50",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },

    linkButton: {
        marginTop: 14,
        alignItems: "center"
    },

    linkText: {
        color: "#ff7f50",
        fontWeight: "bold",
        fontSize: 14
    }

});