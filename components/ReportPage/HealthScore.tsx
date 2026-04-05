import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ReportColors } from '@/constants/Colors';

interface HealthScoreProps {
    healthScoreInt: number;
    scoreSentence: string;
}

export default function HealthScore({ healthScoreInt, scoreSentence }: HealthScoreProps) {
    return (
        <View style={styles.heroSection}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>Scan Analysis</Text>
            </View>

            {/* Health Score Card */}
            <View style={styles.scoreCard}>
              <View style={styles.scoreRingContainer}>
                <Svg width={96} height={96} viewBox="0 0 96 96" style={{ transform: [{ rotate: '-90deg' }] }}>
                  {/* Background Track */}
                  <Circle cx={48} cy={48} r={40} stroke={ReportColors.surfaceContainerHighest} strokeWidth={8} fill="transparent" />
                  {/* Progress Ring */}
                  <Circle cx={48} cy={48} r={40} stroke={ReportColors.primary} strokeWidth={8} fill="transparent"
                    strokeDasharray={251.2} strokeDashoffset={251.2 - (healthScoreInt / 100) * 251.2} strokeLinecap="round" />
                </Svg>
                <View style={styles.scoreTextOverlay}>
                  <Text style={styles.scoreNumber}>{healthScoreInt}</Text>
                </View>
              </View>
              <View style={styles.scoreTextContainer}>
                <Text style={styles.scoreTitle}>Health Score</Text>
                <Text style={styles.scoreSubtitle}>
                  {scoreSentence}
                </Text>
              </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    heroSection: {
        marginBottom: 32,
    },
    heroImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 32,
        backgroundColor: ReportColors.surfaceContainerLow,
        marginBottom: 24,
    },
    heroTextContainer: {
        marginBottom: 24,
    },
    heroLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: ReportColors.primary,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: '800',
        color: ReportColors.onSurface,
        lineHeight: 40,
        letterSpacing: -1,
        marginBottom: 8,
    },
    heroDesc: {
        fontSize: 16,
        color: ReportColors.onSurfaceVariant,
        lineHeight: 24,
    },
    scoreCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ReportColors.surfaceContainerLowest,
        borderRadius: 32,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    scoreRingContainer: {
        width: 96,
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    scoreTextOverlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreNumber: {
        fontSize: 28,
        fontWeight: '800',
        color: ReportColors.onSurface,
    },
    scoreTextContainer: {
        flex: 1,
    },
    scoreTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: ReportColors.onSurface,
        marginBottom: 4,
    },
    scoreSubtitle: {
        fontSize: 13,
        color: ReportColors.onSurfaceVariant,
        lineHeight: 18,
    },
});