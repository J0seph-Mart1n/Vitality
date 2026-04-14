import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DailyLogColors } from '@/constants/Colors';

const DAILY_GOALS = {
    calories: 2400,
    carbs: 325,
    protein: 120,
};

interface NutritionCardProps {
    foodName: string;
    calories: string;
    protein: string;
    carbs: string;
}

export default function NutritionCard({ foodName, calories, protein, carbs }: NutritionCardProps) {
    const proteinPct = Math.min(((parseFloat(protein) || 0) / DAILY_GOALS.protein) * 100, 100);
    const carbsPct = Math.min(((parseFloat(carbs) || 0) / DAILY_GOALS.carbs) * 100, 100);

    return (
        <View style={styles.nutritionCard}>
            <View style={styles.cardHeaderRow}>
                <View style={{ flex: 1, paddingRight: 16 }}>
                    <Text style={styles.cardSupertitle}>NUTRITIONAL ESTIMATE</Text>
                    <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">{foodName}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
                    <Text style={styles.caloriesValue}>{calories}</Text>
                    <Text style={styles.caloriesLabel}>CALORIES</Text>
                </View>
            </View>

            {/* Macro Bento Grid */}
            <View style={styles.macroGrid}>
                {/* Protein */}
                <View style={styles.macroBox}>
                    <View style={styles.macroHeader}>
                        <MaterialIcons name="fitness-center" size={14} color={DailyLogColors.brandGreen} />
                        <Text style={[styles.macroLabel, { color: DailyLogColors.brandGreen }]}>PROTEIN</Text>
                    </View>
                    <Text style={styles.macroValue}>{protein}<Text style={styles.macroUnit}>g</Text></Text>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${proteinPct}%`, backgroundColor: DailyLogColors.brandGreen }]} />
                    </View>
                </View>

                {/* Carbs */}
                <View style={styles.macroBox}>
                    <View style={styles.macroHeader}>
                        <MaterialIcons name="grain" size={14} color={DailyLogColors.tertiary} />
                        <Text style={[styles.macroLabel, { color: DailyLogColors.tertiary }]}>CARBS</Text>
                    </View>
                    <Text style={styles.macroValue}>{carbs}<Text style={styles.macroUnit}>g</Text></Text>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${carbsPct}%`, backgroundColor: DailyLogColors.tertiary }]} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    progressBarBg: {
        height: 4,
        backgroundColor: DailyLogColors.surfaceContainerHighest,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    },
});