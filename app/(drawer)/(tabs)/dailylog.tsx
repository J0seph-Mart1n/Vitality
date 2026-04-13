import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { DailyLogColors } from '@/constants/Colors';
import InputFields from '@/components/DailyLogPage/InputFields';
import NutritionCard from '@/components/DailyLogPage/NutritionCard';
import BottomAction from '@/components/DailyLogPage/BottomAction';
import { handleCalculateEstimate, handleSaveDailyLog } from '@/functions/DailyPageFunc';

export default function LogNourishmentScreen() {
    const [foodName, setFoodName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [showEstimate, setShowEstimate] = useState(false);
    const [unit, setUnit] = useState('g');
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);
    const [isEstimating, setIsEstimating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const { scannedData } = useLocalSearchParams();

    useFocusEffect(
        useCallback(() => {
            if (scannedData) {
                try {
                    const parsed = JSON.parse(scannedData as string);
                    if (parsed && parsed.title) {
                        setFoodName(parsed.title);
                    } else {
                        setFoodName('');
                    }
                } catch (e) {
                    setFoodName('');
                }
            } else {
                setFoodName('');
            }
            setQuantity('');
            setCalories('');
            setProtein('');
            setCarbs('');
            setShowEstimate(false);
            setUnit('g');
            setShowUnitDropdown(false);
        }, [scannedData])
    );

    const onCalculateEstimate = () => {
        handleCalculateEstimate(
            foodName, quantity, unit, scannedData,
            setIsEstimating, setCalories, setProtein, setCarbs, setShowEstimate
        );
    };

    const onSaveDailyLog = () => {
        handleSaveDailyLog(
            foodName, quantity, unit, calories, protein, carbs,
            setIsSaving
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={DailyLogColors.surface} />

            {/* Top App Bar */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={24} color={DailyLogColors.onSurface} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Log Nourishment</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <InputFields
                    foodName={foodName}
                    setFoodName={setFoodName}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    unit={unit}
                    setUnit={setUnit}
                    calories={calories}
                    setCalories={setCalories}
                    carbs={carbs}
                    setCarbs={setCarbs}
                    protein={protein}
                    setProtein={setProtein}
                    showUnitDropdown={showUnitDropdown}
                    setShowUnitDropdown={setShowUnitDropdown}
                />

                {!showEstimate ? (
                    <TouchableOpacity style={[styles.submitButton, { opacity: isEstimating || !foodName || !quantity ? 0.5 : 1 }]}
                        onPress={onCalculateEstimate}
                        disabled={isEstimating || !foodName || !quantity}
                    >
                        {isEstimating ? (
                            <ActivityIndicator color={DailyLogColors.white} size="small" />
                        ) : (
                            <>
                                <MaterialIcons name="insights" size={24} color={DailyLogColors.white} />
                                <Text style={styles.submitButtonText}>Calculate Estimate</Text>
                            </>
                        )}
                    </TouchableOpacity>
                ) : (
                    <NutritionCard
                        foodName={foodName}
                        calories={calories}
                        protein={protein}
                        carbs={carbs}
                    />
                )}
            </ScrollView>

            {/* Bottom Action Area */}
            <BottomAction
                isEstimating={isEstimating}
                isSaving={isSaving}
                showEstimate={showEstimate}
                handleCalculateEstimate={onCalculateEstimate}
                handleSaveDailyLog={onSaveDailyLog}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DailyLogColors.surface,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'android' ? 16 : 12,
        backgroundColor: DailyLogColors.surface,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        zIndex: 50,
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: DailyLogColors.surfaceContainerLow,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: DailyLogColors.onSurface,
        letterSpacing: -0.5,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 220, // Space for the taller fixed bottom button
    },
    section: {
        marginBottom: 24,
    },
    fieldContainer: {
        marginTop: 16,
    },
    submitButton: {
        height: 64,
        backgroundColor: DailyLogColors.brandGreen,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: DailyLogColors.brandGreen,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        marginBottom: 24,
    },
    submitButtonText: {
        color: DailyLogColors.white,
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
});