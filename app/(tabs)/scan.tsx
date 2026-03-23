import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const ScanScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default ScanScreen;