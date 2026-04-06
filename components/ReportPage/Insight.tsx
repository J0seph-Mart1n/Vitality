import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ReportColors } from '@/constants/Colors';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

interface InsightProps {
    summaryInsight: string;
    parsedData: any;
}

export default function Insight({ summaryInsight, parsedData }: InsightProps) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const user = FIREBASE_AUTH.currentUser;
            if (!user) {
                Alert.alert("Authentication Required", "Please log in to save scans.");
                setIsSaving(false);
                return;
            }

            const idToken = await user.getIdToken();
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/save-scan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,
                },
                body: JSON.stringify({ data: parsedData }),
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert("Success", "Scan saved successfully to your log!", [
                    { text: "OK", onPress: () => router.back() }
                ]);
            } else {
                Alert.alert("Failed", result.error || "Failed to save scan");
            }
        } catch (error) {
            Alert.alert("Error", "Check your internet connection and try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <View style={styles.insightCard}>
            <View style={styles.insightGlow} />
            <Text style={styles.insightTitle}>Vitality Insight</Text>
            <Text style={styles.insightDesc}>
              "{summaryInsight}"
            </Text>
            <TouchableOpacity 
              style={styles.insightButton} 
              onPress={handleSave} 
              disabled={isSaving}
            >
              {isSaving ? (
                 <ActivityIndicator color={ReportColors.white} size="small" />
              ) : (
                 <>
                   <Text style={styles.insightButtonText}>Save My Scan</Text>
                   <MaterialIcons name="bookmark" size={20} color={ReportColors.white} />
                 </>
              )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    insightCard: {
        backgroundColor: ReportColors.inverseSurface,
        borderRadius: 32,
        padding: 32,
        position: 'relative',
        overflow: 'hidden',
    },
    insightGlow: {
        position: 'absolute',
        right: -40,
        bottom: -40,
        width: 150,
        height: 150,
        backgroundColor: 'rgba(27, 109, 36, 0.4)',
        borderRadius: 75,
        opacity: 0.5,
    },
    insightTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: ReportColors.inverseOnSurface,
        marginBottom: 16,
    },
    insightDesc: {
        fontSize: 16,
        color: ReportColors.inverseOnSurface,
        lineHeight: 26,
        opacity: 0.9,
        marginBottom: 24,
    },
    insightButton: {
        backgroundColor: ReportColors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 16,
    },
    insightButtonText: {
        fontSize: 16,
        fontWeight: '800',
        color: ReportColors.white,
    },
});