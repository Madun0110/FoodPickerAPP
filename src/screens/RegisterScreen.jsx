import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator
} from "react-native";

import { registerUser } from "../services/AuthService";

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        let isValid = true;

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        if (cleanName === "") {
            setNameError("Nama wajib diisi");
            isValid = false;
        } else if (cleanName.length < 3) {
            setNameError("Nama minimal 3 karakter");
            isValid = false;
        } else {
            setNameError("");
        }

        if (cleanEmail === "") {
            setEmailError("Email wajib diisi");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            setEmailError("Format email tidak valid. Contoh: nama@gmail.com");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (cleanPassword === "") {
            setPasswordError("Password wajib diisi");
            isValid = false;
        } else if (cleanPassword.length < 6) {
            setPasswordError("Password minimal 6 karakter");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!isValid) return;

        try {
            setLoading(true);

            await registerUser(
                cleanName,
                cleanEmail,
                cleanPassword
            );

            Alert.alert(
                "Berhasil",
                "Register berhasil, silakan login"
            );

            navigation.replace("Login");

        } catch (error) {
            console.log("REGISTER ERROR:", error);

            Alert.alert(
                "Register Gagal",
                error.message
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Register</Text>

                <Text style={styles.subtitle}>
                    Buat akun baru untuk mulai menggunakan aplikasi
                </Text>

                <TextInput
                    placeholder="Nama lengkap"
                    style={[
                        styles.input,
                        nameError ? styles.inputError : null
                    ]}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                {nameError ? (
                    <Text style={styles.errorText}>{nameError}</Text>
                ) : null}

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
                    style={[
                        styles.button,
                        loading && styles.buttonDisabled
                    ]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => navigation.navigate("Login")}
                    disabled={loading}
                >
                    <Text style={styles.linkText}>
                        Sudah punya akun? Login
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

    buttonDisabled: {
        backgroundColor: "#ccc"
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