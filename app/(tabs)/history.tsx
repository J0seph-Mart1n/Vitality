import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const HistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
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

export default HistoryScreen;