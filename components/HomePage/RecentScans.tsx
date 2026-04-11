import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { colors, HistoryColors } from '@/constants/Colors';

const VISIBLE_COUNT = 3;

interface RecentScansProps {
    refreshKey?: number;
}

export default function RecentScans({ refreshKey }: RecentScansProps) {
    const [fetchedScans, setFetchedScans] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (!user) {
                setIsLoading(false);
                return;
            }
            const token = await user.getIdToken();
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/scan-history`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                const mappedScans = data.map((doc: any, index: number) => {
                    let title = "Saved Scan";
                    if (doc.data?.title) {
                        title = doc.data?.title;
                    }
                    const scoreStr = String(doc.data?.health_score?.score || "0");
                    const match = scoreStr.match(/\d+/);
                    const scoreNum = match ? parseInt(match[0], 10) : 0;

                    const d = new Date(doc.created_at);
                    const formattedDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return {
                        id: doc.id || index,
                        title: title,
                        date: formattedDate,
                        score: scoreNum,
                        rawData: doc.data
                    };
                });
                setFetchedScans(mappedScans);
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [refreshKey]);

    const displayedScans = fetchedScans.slice(0, VISIBLE_COUNT);

  return (
    <View style={styles.section}>
      <View style={styles.recentScansHeader}>
        <Text style={styles.recentScansTitle}>Recent Scans</Text>
        <TouchableOpacity onPress={() => router.push('/history')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

        {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 20 }} />
        ) : displayedScans.length === 0 ? (
            <Text style={{ color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 20 }}>No scans saved yet.</Text>
        ) : (
            <View style={styles.entriesContainer}>
                {displayedScans.map((item) => {
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
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 24,
  },
  recentScansHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentScansTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
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
});