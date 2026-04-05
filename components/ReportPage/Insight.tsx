import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ReportColors } from '@/constants/Colors';

interface InsightProps {
    summaryInsight: string;
}

export default function Insight({ summaryInsight }: InsightProps) {
    return (
        <View style={styles.insightCard}>
            <View style={styles.insightGlow} />
            <Text style={styles.insightTitle}>Vitality Insight</Text>
            <Text style={styles.insightDesc}>
              "{summaryInsight}"
            </Text>
            <TouchableOpacity style={styles.insightButton}>
              <Text style={styles.insightButtonText}>Save to My Log</Text>
              <MaterialIcons name="bookmark" size={20} color={ReportColors.white} />
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