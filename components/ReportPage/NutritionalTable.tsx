import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ReportColors } from '@/constants/Colors';

interface NutritionalTableProps {
    mappedNutritionFacts: any;
}

export default function NutritionalTable({ mappedNutritionFacts }: NutritionalTableProps) {
    return (
        <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
                <Text style={styles.tableTitle}>Nutritional Facts</Text>
            </View>

            <View style={styles.tableHeadRow}>
                <Text style={[styles.tableHeadText, { flex: 2 }]}>NUTRIENT</Text>
                <Text style={[styles.tableHeadText, { flex: 1, textAlign: 'right' }]}>AMOUNT</Text>
            </View>

            {mappedNutritionFacts.map((row, index) => (
                <View key={row.id} style={[styles.tableRow, index !== mappedNutritionFacts.length - 1 && styles.tableRowBorder]}>
                    <Text style={[styles.tableCellMain, { flex: 2 }]}>{row.name}</Text>
                    <Text style={[styles.tableCellSub, { flex: 1, textAlign: 'right' }]}>{row.amount}</Text>
                </View>
            ))}

            <View style={styles.tableFooter}>
                <Text style={styles.tableFooterText}>
                    * Values are analyzed based on the provided nutritional label image. Accuracy depends on the clarity of the image.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tableCard: {
        backgroundColor: ReportColors.surfaceContainerLowest,
        borderRadius: 32,
        overflow: 'hidden',
        marginBottom: 32,
        borderWidth: 1,
        borderColor: ReportColors.surfaceContainerHighest,
    },
    tableHeader: {
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: ReportColors.outlineVariant,
    },
    tableTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: ReportColors.onSurface,
        marginBottom: 4,
    },
    tableSubtitle: {
        fontSize: 14,
        color: ReportColors.onSurfaceVariant,
    },
    tableHeadRow: {
        flexDirection: 'row',
        backgroundColor: ReportColors.surfaceContainerLow,
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    tableHeadText: {
        fontSize: 10,
        fontWeight: '800',
        color: ReportColors.onSurfaceVariant,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    tableRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: ReportColors.outlineVariant,
    },
    tableCellMain: {
        fontSize: 15,
        fontWeight: '600',
        color: ReportColors.onSurface,
    },
    tableCellSub: {
        fontSize: 15,
        color: ReportColors.onSurfaceVariant,
    },
    tableCellDvContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 6,
    },
    tableCellDvText: {
        fontSize: 13,
        fontWeight: '800',
    },
    dvBarBg: {
        width: 60,
        height: 6,
        backgroundColor: ReportColors.surfaceContainerHighest,
        borderRadius: 3,
        overflow: 'hidden',
    },
    dvBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    tableFooter: {
        backgroundColor: 'rgba(243, 243, 243, 0.5)',
        padding: 24,
    },
    tableFooterText: {
        fontSize: 12,
        color: ReportColors.onSurfaceVariant,
        lineHeight: 18,
    },
});