import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { HistoryColors } from '@/constants/Colors';

interface ScanItem {
    id: string | number;
    title: string;
    date: string;
    score: number;
    rawData?: any;
}

interface HistoryEntriesProps {
    displayedScans: ScanItem[];
}

export const HistoryEntries = ({ displayedScans }: HistoryEntriesProps) => {
    return (
        <View style={styles.entriesContainer}>

            {displayedScans.map((item) => {
                // Determine styling based on score (simulating the Tailwind logic)
                const isWarning = item.score < 70;
                const badgeBgColor = isWarning ? 'rgba(197, 147, 0, 0.2)' : 'rgba(27, 109, 36, 0.1)';
                const badgeTextColor = isWarning ? HistoryColors.tertiaryContainer : HistoryColors.primary;

                return (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        onPress={() => {
                            if (item.rawData) {
                                router.push({
                                    pathname: '/report',
                                    params: {
                                        analysisData: JSON.stringify(item.rawData),
                                        isHistory: 'true'
                                    }
                                });
                            }
                        }}
                    >

                        <View style={styles.cardContent}>
                            <View style={styles.cardTop}>
                                <View style={styles.textGroup}>
                                    <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.cardDate}>{item.date}</Text>
                                </View>

                                <View style={[styles.badge, { backgroundColor: badgeBgColor }]}>
                                    <Text style={[styles.badgeText, { color: badgeTextColor }]}>
                                        {item.score}
                                    </Text>
                                    <Text style={[styles.badgeScore, { color: badgeTextColor }]}>SCORE</Text>
                                </View>
                            </View>
                            {/* Actions (Always visible on mobile instead of hover) */}
                            <View style={styles.cardActions}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <MaterialIcons name="share" size={16} color={HistoryColors.secondary} />
                                    <Text style={styles.actionTextShare}>Share</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.actionButton}>
                                    <MaterialIcons name="delete-outline" size={16} color="rgba(186, 26, 26, 0.7)" />
                                    <Text style={styles.actionTextRemove}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    entriesContainer: {
        gap: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: HistoryColors.surfaceContainerLowest,
        borderRadius: 20,
        padding: 16,
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: HistoryColors.surfaceContainer,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textGroup: {
        flex: 1,
        paddingRight: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: HistoryColors.onSurface,
        lineHeight: 22,
    },
    cardDate: {
        fontSize: 12,
        color: 'rgba(63, 74, 60, 0.6)',
        marginTop: 2,
    },
    badge: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 20,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    badgeScore: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 4,
        paddingRight: 16,
    },
    actionTextShare: {
        fontSize: 12,
        fontWeight: '700',
        color: HistoryColors.secondary,
    },
    actionTextRemove: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(186, 26, 26, 0.7)',
    },
});