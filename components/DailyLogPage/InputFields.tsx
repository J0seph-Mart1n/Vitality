import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DailyLogColors } from '@/constants/Colors';

interface InputFieldsProps {
    foodName: string;
    setFoodName: (foodName: string) => void;
    quantity: string;
    setQuantity: (quantity: string) => void;
    unit: string;
    setUnit: (unit: string) => void;
    calories: string;
    setCalories: (calories: string) => void;
    carbs: string;
    setCarbs: (carbs: string) => void;
    protein: string;
    setProtein: (protein: string) => void;
    showUnitDropdown: boolean;
    setShowUnitDropdown: (showUnitDropdown: boolean) => void;
}

export default function InputFields({ foodName, setFoodName, quantity, setQuantity, unit, setUnit, calories, setCalories, carbs, setCarbs, protein, setProtein, showUnitDropdown, setShowUnitDropdown }: InputFieldsProps) {
    return (
        <>
            <View style={styles.section}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>FOOD NAME</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter food item name..."
                        placeholderTextColor={DailyLogColors.zinc400}
                        value={foodName}
                        onChangeText={setFoodName}
                    />
                </View>
            </View>

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
                            <MaterialIcons name={showUnitDropdown ? "expand-less" : "expand-more"} size={24} color={DailyLogColors.onSurfaceVariant} />
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
                            placeholderTextColor={DailyLogColors.zinc400}
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
                            placeholderTextColor={DailyLogColors.zinc400}
                            keyboardType="numeric"
                            value={carbs}
                            onChangeText={setCarbs}
                        />
                    </View>
                    <View style={styles.macroInputCol}>
                        <TextInput
                            style={styles.input}
                            placeholder="Protein (g)"
                            placeholderTextColor={DailyLogColors.zinc400}
                            keyboardType="numeric"
                            value={protein}
                            onChangeText={setProtein}
                        />
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    fieldContainer: {
        marginTop: 16,
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        color: DailyLogColors.onSurfaceVariant,
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
        backgroundColor: DailyLogColors.surfaceContainerLow,
        borderWidth: 1,
        borderColor: 'rgba(195, 200, 188, 0.4)',
        borderRadius: 16,
        paddingHorizontal: 24,
        fontSize: 16,
        fontWeight: '500',
        color: DailyLogColors.onSurface,
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
        backgroundColor: DailyLogColors.surfaceContainerLow,
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
        backgroundColor: DailyLogColors.surface,
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
        color: DailyLogColors.onSurfaceVariant,
        fontWeight: '500',
    },
    dropdownItemTextActive: {
        color: DailyLogColors.onSurface,
        fontWeight: '700',
    },
    dropdownDivider: {
        height: 1,
        backgroundColor: 'rgba(195, 200, 188, 0.4)',
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '500',
        color: DailyLogColors.onSurface,
    },
    nutritionCard: {
        backgroundColor: DailyLogColors.surface,
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
        color: DailyLogColors.brandGreen,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: DailyLogColors.onSurface,
    },
    caloriesValue: {
        fontSize: 36,
        fontWeight: '800',
        color: DailyLogColors.onSurface,
        letterSpacing: -1,
        lineHeight: 40,
    },
    caloriesLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: DailyLogColors.onSurfaceVariant,
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
        backgroundColor: DailyLogColors.surfaceContainerLow,
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
        color: DailyLogColors.onSurface,
        marginBottom: 8,
    },
    macroUnit: {
        fontSize: 12,
        color: DailyLogColors.onSurfaceVariant,
        fontWeight: '500',
    },
})