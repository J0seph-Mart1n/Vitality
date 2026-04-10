import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

// Extracted Theme Colors
const colors = {
    brandGreen: '#4CAF50',
    brandGreenLight: 'rgba(76, 175, 80, 0.1)',
    surface: '#ffffff',
    surfaceContainerLow: '#f0f1ed',
    surfaceContainerHighest: '#e1e4de',
    onSurface: '#191c19',
    onSurfaceVariant: '#43493f',
    outlineVariant: '#c3c8bc',
    tertiary: '#705d00',
    secondary: '#52634f',
    white: '#ffffff',
    zinc400: '#a1a1aa',
};

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

    const handleCalculateEstimate = async () => {
        setIsEstimating(true);
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (!user) {
                Alert.alert("Error", "Please log in");
                setIsEstimating(false);
                return;
            }
            const token = await user.getIdToken();
            
            let nutritionalFacts = undefined;
            if (scannedData) {
                try {
                    const parsed = JSON.parse(scannedData as string);
                    if (parsed && parsed.nutritional_facts) {
                        nutritionalFacts = parsed.nutritional_facts;
                    }
                } catch(e) {}
            }

            console.log(nutritionalFacts);

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/estimate-nutrition`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    food_name: foodName,
                    consumed_amount: `${quantity} ${unit}`,
                    nutritional_facts: nutritionalFacts
                })
            });

            if (response.ok) {
                const data = await response.json();
                setCalories(String(data.calories || ''));
                setProtein(String(data.protein || ''));
                setCarbs(String(data.carbs || ''));
                setShowEstimate(true);
            } else {
                Alert.alert("Error", "Failed to calculate estimate");
            }
        } catch (error) {
            Alert.alert("Error", "Network request failed");
        } finally {
            setIsEstimating(false);
        }
    };

    const handleSaveDailyLog = async () => {
        setIsSaving(true);
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (!user) return;
            const token = await user.getIdToken();

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/daily-log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    food_name: foodName,
                    quantity: quantity,
                    unit: unit,
                    calories: calories,
                    protein: protein,
                    carbs: carbs
                })
            });

            if (response.ok) {
                Alert.alert("Success", "Added to daily log!");
                router.back();
            } else {
                Alert.alert("Error", "Failed to save to daily log");
            }
        } catch(error) {
            Alert.alert("Error", "Network request failed");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

            {/* Top App Bar */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Log Nourishment</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Search Section */}
                <View style={styles.section}>

                    {/* Food Name Input */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>FOOD NAME</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter food item name..."
                            placeholderTextColor={colors.zinc400}
                            value={foodName}
                            onChangeText={setFoodName}
                        />
                    </View>
                </View>

                {/* Quantity Selector */}
                <View style={[styles.section, { zIndex: 10 }]}>
                    <Text style={styles.label}>QUANTITY & PORTION</Text>
                    <View style={styles.quantityRow}>
                        <TextInput
                            style={[styles.input, styles.quantityInput]}
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />
                        <View style={{ flex: 2, position: 'relative' }}>
                            <TouchableOpacity 
                                style={styles.dropdownSelector}
                                onPress={() => setShowUnitDropdown(!showUnitDropdown)}
                            >
                                <Text style={styles.dropdownText}>{unit === 'g' ? 'grams (g)' : 'milliliters (ml)'}</Text>
                                <MaterialIcons name={showUnitDropdown ? "expand-less" : "expand-more"} size={24} color={colors.onSurfaceVariant} />
                            </TouchableOpacity>
                            
                            {showUnitDropdown && (
                                <View style={styles.dropdownMenu}>
                                    <TouchableOpacity 
                                        style={styles.dropdownItem} 
                                        onPress={() => { setUnit('g'); setShowUnitDropdown(false); }}
                                    >
                                        <Text style={[styles.dropdownItemText, unit === 'g' && styles.dropdownItemTextActive]}>grams (g)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.dropdownDivider} />
                                    <TouchableOpacity 
                                        style={styles.dropdownItem} 
                                        onPress={() => { setUnit('ml'); setShowUnitDropdown(false); }}
                                    >
                                        <Text style={[styles.dropdownItemText, unit === 'ml' && styles.dropdownItemTextActive]}>milliLiters (ml)</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Optional Macro Nutritional Overrides */}
                <View style={styles.section}>
                    <Text style={styles.label}>NUTRITION FIELDS (OPTIONAL)</Text>
                    <View style={styles.macroInputRow}>
                        <View style={styles.macroInputCol}>
                            <TextInput
                                style={styles.input}
                                placeholder="Calories"
                                placeholderTextColor={colors.zinc400}
                                keyboardType="numeric"
                                value={calories}
                                onChangeText={setCalories}
                            />
                        </View>

                    </View>
                    <View style={[styles.macroInputRow, { marginTop: 16 }]}>
                        <View style={styles.macroInputCol}>
                            <TextInput
                                style={styles.input}
                                placeholder="Carbs (g)"
                                placeholderTextColor={colors.zinc400}
                                keyboardType="numeric"
                                value={carbs}
                                onChangeText={setCarbs}
                            />
                        </View>
                        <View style={styles.macroInputCol}>
                            <TextInput
                                style={styles.input}
                                placeholder="Protein (g)"
                                placeholderTextColor={colors.zinc400}
                                keyboardType="numeric"
                                value={protein}
                                onChangeText={setProtein}
                            />
                        </View>
                    </View>
                </View>

                {!showEstimate ? (
                    <TouchableOpacity style={[styles.submitButton, { marginBottom: 24 }]} activeOpacity={0.8} onPress={handleCalculateEstimate} disabled={isEstimating}>
                        {isEstimating ? (
                            <ActivityIndicator color={colors.white} size="small" />
                        ) : (
                            <>
                                <MaterialIcons name="insights" size={24} color={colors.white} />
                                <Text style={styles.submitButtonText}>Calculate Estimate</Text>
                            </>
                        )}
                    </TouchableOpacity>
                ) : (
                    <View style={styles.nutritionCard}>
                        <View style={styles.cardHeaderRow}>
                            <View>
                                <Text style={styles.cardSupertitle}>NUTRITIONAL ESTIMATE</Text>
                                <Text style={styles.cardTitle}>{foodName || 'Unknown Food'}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.caloriesValue}>{calories || '265'}</Text>
                                <Text style={styles.caloriesLabel}>CALORIES</Text>
                            </View>
                        </View>

                        {/* Macro Bento Grid */}
                        <View style={styles.macroGrid}>
                            {/* Protein */}
                            <View style={styles.macroBox}>
                                <View style={styles.macroHeader}>
                                    <MaterialIcons name="fitness-center" size={14} color={colors.brandGreen} />
                                    <Text style={[styles.macroLabel, { color: colors.brandGreen }]}>PROTEIN</Text>
                                </View>
                                <Text style={styles.macroValue}>{protein || '9.2'}<Text style={styles.macroUnit}>g</Text></Text>
                                <View style={styles.progressBarBg}>
                                    <View style={[styles.progressBarFill, { width: '40%', backgroundColor: colors.brandGreen }]} />
                                </View>
                            </View>

                            {/* Carbs */}
                            <View style={styles.macroBox}>
                                <View style={styles.macroHeader}>
                                    <MaterialIcons name="grain" size={14} color={colors.tertiary} />
                                    <Text style={[styles.macroLabel, { color: colors.tertiary }]}>CARBS</Text>
                                </View>
                                <Text style={styles.macroValue}>{carbs || '45.8'}<Text style={styles.macroUnit}>g</Text></Text>
                                <View style={styles.progressBarBg}>
                                    <View style={[styles.progressBarFill, { width: '75%', backgroundColor: colors.tertiary }]} />
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Action Area */}
            {showEstimate && (
                <View style={styles.bottomActionArea}>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <TouchableOpacity 
                            style={[styles.submitButton, { flex: 1, backgroundColor: colors.surfaceContainerHighest }]} 
                            activeOpacity={0.8} 
                            onPress={handleCalculateEstimate} 
                            disabled={isEstimating || isSaving}
                        >
                            {isEstimating ? (
                                <ActivityIndicator color={colors.secondary} size="small" />
                            ) : (
                                <>
                                    <MaterialIcons name="refresh" size={24} color={colors.secondary} />
                                    <Text style={[styles.submitButtonText, { color: colors.secondary }]}>Re-Analyze</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.submitButton, { flex: 1.5 }]} 
                            activeOpacity={0.8} 
                            onPress={handleSaveDailyLog} 
                            disabled={isSaving || isEstimating}
                        >
                            {isSaving ? (
                                <ActivityIndicator color={colors.white} size="small" />
                            ) : (
                                <>
                                    <MaterialIcons name="add-task" size={24} color={colors.white} />
                                    <Text style={styles.submitButtonText}>Save Log</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'android' ? 16 : 12,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        zIndex: 50,
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: colors.surfaceContainerLow,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.onSurface,
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
    label: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
        paddingLeft: 4,
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    inputIconLeft: {
        position: 'absolute',
        left: 16,
        zIndex: 10,
    },
    input: {
        height: 56,
        backgroundColor: colors.surfaceContainerLow,
        borderWidth: 1,
        borderColor: 'rgba(195, 200, 188, 0.4)',
        borderRadius: 16,
        paddingHorizontal: 24,
        fontSize: 16,
        fontWeight: '500',
        color: colors.onSurface,
    },
    macroInputRow: {
        flexDirection: 'row',
        gap: 16,
    },
    macroInputCol: {
        flex: 1,
    },
    quantityRow: {
        flexDirection: 'row',
        gap: 16,
    },
    quantityInput: {
        flex: 1,
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        paddingHorizontal: 0,
    },
    dropdownSelector: {
        height: 56,
        backgroundColor: colors.surfaceContainerLow,
        borderWidth: 1,
        borderColor: 'rgba(195, 200, 188, 0.4)',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 64,
        left: 0,
        right: 0,
        backgroundColor: colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(195, 200, 188, 0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        zIndex: 50,
        overflow: 'hidden', // to ensure rounded corners on items
    },
    dropdownItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    dropdownItemText: {
        fontSize: 16,
        color: colors.onSurfaceVariant,
        fontWeight: '500',
    },
    dropdownItemTextActive: {
        color: colors.onSurface,
        fontWeight: '700',
    },
    dropdownDivider: {
        height: 1,
        backgroundColor: 'rgba(195, 200, 188, 0.4)',
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.onSurface,
    },
    nutritionCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: 'rgba(195, 200, 188, 0.4)',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    cardSupertitle: {
        fontSize: 10,
        fontWeight: '800',
        color: colors.brandGreen,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.onSurface,
    },
    caloriesValue: {
        fontSize: 36,
        fontWeight: '800',
        color: colors.onSurface,
        letterSpacing: -1,
        lineHeight: 40,
    },
    caloriesLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    macroGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    macroBox: {
        flex: 1,
        backgroundColor: colors.surfaceContainerLow,
        borderRadius: 16,
        padding: 12,
    },
    macroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    macroLabel: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    macroValue: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.onSurface,
        marginBottom: 8,
    },
    macroUnit: {
        fontSize: 12,
        color: colors.onSurfaceVariant,
        fontWeight: '500',
    },
    progressBarBg: {
        height: 4,
        backgroundColor: colors.surfaceContainerHighest,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    },
    infoBanner: {
        flexDirection: 'row',
        backgroundColor: colors.brandGreenLight,
        padding: 16,
        borderRadius: 16,
        gap: 12,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.2)',
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: colors.onSurfaceVariant,
        lineHeight: 18,
    },
    bottomActionArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 120 : 140, // Taller padding to raise content above the navbar
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    submitButton: {
        height: 64,
        backgroundColor: colors.brandGreen,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: colors.brandGreen,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
});