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

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleRegister = () => {
        let isValid = true;

        if (name.trim() === "") {
            setNameError("Nama wajib diisi");
            isValid = false;
        } else if (name.trim().length < 3) {
            setNameError("Nama minimal 3 karakter");
            isValid = false;
        } else {
            setNameError("");
        }

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

        Alert.alert("Berhasil", "Register berhasil, silakan login");

        navigation.replace("Login");
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
                    style={styles.button}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => navigation.navigate("Login")}
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