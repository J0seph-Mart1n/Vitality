import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, ScrollView, View, ActivityIndicator, Text,
    RefreshControl, TouchableOpacity, Animated, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import TopBar from '@/components/HomePage/TopBar';
import { SearchBar } from '@/components/HistoryPage/SearchBar';
import { HistoryEntries } from '@/components/HistoryPage/HistoryEntries';
import { LoadMore } from '@/components/HistoryPage/LoadMore';
import { HistoryColors } from '@/constants/Colors';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TABS = ['Scan History', 'Daily Logs'] as const;

const HistoryScreen = () => {
    // --- Shared State ---
    const [activeTab, setActiveTab] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const indicatorAnim = useRef(new Animated.Value(0)).current;

    // --- Scan History State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(4);
    const [fetchedScans, setFetchedScans] = useState<any[]>([]);
    const [isLoadingScans, setIsLoadingScans] = useState(true);

    // --- Daily Logs State ---
    const [dailyLogs, setDailyLogs] = useState<any[]>([]);
    const [isLoadingLogs, setIsLoadingLogs] = useState(true);
    const [logsVisibleCount, setLogsVisibleCount] = useState(4);

    // --- Fetch Scan History ---
    const fetchHistory = async (isPullToRefresh = false) => {
        if (isPullToRefresh) setRefreshing(true);
        else setIsLoadingScans(true);
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/scan-history`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                const mappedScans = data.map((doc: any, index: number) => {
                    let title = "Saved Scan";
                    if (doc.data?.title) title = doc.data?.title;
                    const scoreStr = String(doc.data?.health_score?.score || "0");
                    const match = scoreStr.match(/\d+/);
                    const scoreNum = match ? parseInt(match[0], 10) : 0;

                    const d = new Date(doc.created_at);
                    const formattedDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return {
                        id: doc.id || index,
                        title,
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
            setIsLoadingScans(false);
            setRefreshing(false);
        }
    };

    // --- Fetch Daily Logs ---
    const fetchDailyLogs = async (isPullToRefresh = false) => {
        if (isPullToRefresh) setRefreshing(true);
        else setIsLoadingLogs(true);
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/daily-log`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setDailyLogs(data);
            }
        } catch (error) {
            console.error("Failed to fetch daily logs:", error);
        } finally {
            setIsLoadingLogs(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchHistory();
        fetchDailyLogs();
    }, []);

    const onRefresh = () => {
        if (activeTab === 0) fetchHistory(true);
        else fetchDailyLogs(true);
    };

    // --- Tab Switching ---
    const switchTab = (index: number) => {
        setActiveTab(index);
        scrollViewRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
        Animated.spring(indicatorAnim, {
            toValue: index,
            useNativeDriver: true,
            tension: 68,
            friction: 12,
        }).start();
    };

    const handlePageScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / SCREEN_WIDTH);
        if (page !== activeTab) {
            setActiveTab(page);
            Animated.spring(indicatorAnim, {
                toValue: page,
                useNativeDriver: true,
                tension: 68,
                friction: 12,
            }).start();
        }
    };

    // --- Filter & Display ---
    const filteredScans = fetchedScans.filter(scan =>
        scan.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const displayedScans = filteredScans.slice(0, visibleCount);
    const displayedLogs = dailyLogs.slice(0, logsVisibleCount);

    // --- Animated Indicator ---
    const tabWidth = (SCREEN_WIDTH - 48) / 2; // 24px padding each side
    const indicatorTranslateX = indicatorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, tabWidth],
    });

    return (
        <SafeAreaView style={styles.container}>
            <TopBar />

            {/* Tab Bar */}
            <View style={styles.tabBarWrapper}>
                <View style={styles.tabBar}>
                    <Animated.View
                        style={[
                            styles.tabIndicator,
                            { width: tabWidth, transform: [{ translateX: indicatorTranslateX }] }
                        ]}
                    />
                    {TABS.map((tab, index) => (
                        <TouchableOpacity
                            key={tab}
                            style={styles.tabItem}
                            onPress={() => switchTab(index)}
                            activeOpacity={0.7}
                        >
                            <MaterialIcons
                                name={index === 0 ? 'document-scanner' : 'restaurant-menu'}
                                size={18}
                                color={activeTab === index ? HistoryColors.onPrimary : HistoryColors.onSurfaceVariant}
                            />
                            <Text style={[
                                styles.tabText,
                                activeTab === index && styles.tabTextActive,
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Swipeable Pages */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handlePageScroll}
                scrollEventThrottle={16}
            >
                {/* Page 1: Scan History */}
                <ScrollView
                    style={{ width: SCREEN_WIDTH }}
                    contentContainerStyle={styles.pageContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing && activeTab === 0}
                            onRefresh={onRefresh}
                            colors={[HistoryColors.primary]}
                            tintColor={HistoryColors.primary}
                        />
                    }
                >
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                    <View style={styles.listHeader}>
                        <View>
                            <Text style={styles.labelTimeline}>TIMELINE</Text>
                            <Text style={styles.titleHistory}>Scan History</Text>
                        </View>
                    </View>

                    {isLoadingScans ? (
                        <View style={styles.centered}>
                            <ActivityIndicator size="large" color={HistoryColors.primary} />
                        </View>
                    ) : fetchedScans.length === 0 ? (
                        <View style={styles.centered}>
                            <Text style={styles.emptyText}>No scans saved yet.</Text>
                        </View>
                    ) : (
                        <>
                            <HistoryEntries displayedScans={displayedScans} />
                            <LoadMore
                                visibleCount={visibleCount}
                                recentScans={filteredScans}
                                setVisibleCount={setVisibleCount}
                            />
                        </>
                    )}
                </ScrollView>

                {/* Page 2: Daily Logs */}
                <ScrollView
                    style={{ width: SCREEN_WIDTH }}
                    contentContainerStyle={styles.pageContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing && activeTab === 1}
                            onRefresh={onRefresh}
                            colors={[HistoryColors.primary]}
                            tintColor={HistoryColors.primary}
                        />
                    }
                >
                    <View style={styles.listHeader}>
                        <View>
                            <Text style={styles.labelTimeline}>NUTRITION</Text>
                            <Text style={styles.titleHistory}>Daily Logs</Text>
                        </View>
                    </View>

                    {isLoadingLogs ? (
                        <View style={styles.centered}>
                            <ActivityIndicator size="large" color={HistoryColors.primary} />
                        </View>
                    ) : dailyLogs.length === 0 ? (
                        <View style={styles.centered}>
                            <Text style={styles.emptyText}>No daily logs yet.</Text>
                        </View>
                    ) : (
                        <>
                            <View style={styles.logsContainer}>
                                {displayedLogs.map((log: any, index: number) => {
                                    const d = new Date(log.created_at);
                                    const formattedDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                    return (
                                        <View key={log.id || index} style={styles.logCard}>
                                            <View style={styles.logIconContainer}>
                                                <MaterialIcons name="restaurant" size={22} color={HistoryColors.primary} />
                                            </View>
                                            <View style={styles.logContent}>
                                                <Text style={styles.logTitle} numberOfLines={1}>{log.food_name}</Text>
                                                <Text style={styles.logDate}>{formattedDate}</Text>
                                                <View style={styles.logMacros}>
                                                    <View style={styles.macroPill}>
                                                        <Text style={styles.macroPillText}>{log.calories} kcal</Text>
                                                    </View>
                                                    <View style={[styles.macroPill, { backgroundColor: 'rgba(27, 109, 36, 0.08)' }]}>
                                                        <Text style={[styles.macroPillText, { color: HistoryColors.primary }]}>{log.protein}g P</Text>
                                                    </View>
                                                    <View style={[styles.macroPill, { backgroundColor: 'rgba(197, 147, 0, 0.1)' }]}>
                                                        <Text style={[styles.macroPillText, { color: '#8B6914' }]}>{log.carbs}g C</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.logQuantity}>
                                                <Text style={styles.logQuantityText}>{log.quantity}</Text>
                                                <Text style={styles.logQuantityUnit}>{log.unit}</Text>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>

                            {dailyLogs.length > logsVisibleCount && (
                                <TouchableOpacity
                                    style={styles.loadMoreButton}
                                    onPress={() => setLogsVisibleCount(prev => prev + 4)}
                                >
                                    <Text style={styles.loadMoreText}>Load More</Text>
                                    <MaterialIcons name="expand-more" size={20} color={HistoryColors.primary} />
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HistoryColors.surface,
    },
    tabBarWrapper: {
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        zIndex: 40,
        paddingHorizontal: 24,
        paddingBottom: 12,
        backgroundColor: HistoryColors.surface,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: HistoryColors.surfaceContainerLow,
        borderRadius: 16,
        padding: 4,
        position: 'relative',
    },
    tabIndicator: {
        position: 'absolute',
        top: 4,
        left: 4,
        bottom: 4,
        borderRadius: 12,
        backgroundColor: HistoryColors.tabColors,
    },
    tabItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
        zIndex: 1,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '700',
        color: HistoryColors.onSurface,
    },
    tabTextActive: {
        color: HistoryColors.onSurface,
    },
    pageContent: {
        paddingTop: 130,
        paddingBottom: 130,
        paddingHorizontal: 24,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    labelTimeline: {
        fontSize: 12,
        fontWeight: '700',
        color: HistoryColors.primary,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    titleHistory: {
        fontSize: 32,
        fontWeight: '800',
        color: HistoryColors.onSurface,
        letterSpacing: -0.5,
    },
    centered: {
        marginTop: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: HistoryColors.onSurfaceVariant,
        fontSize: 16,
    },
    // --- Daily Log Card Styles ---
    logsContainer: {
        gap: 16,
    },
    logCard: {
        flexDirection: 'row',
        backgroundColor: HistoryColors.surfaceContainerLowest,
        borderRadius: 20,
        padding: 16,
        gap: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    logIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(27, 109, 36, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logContent: {
        flex: 1,
    },
    logTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: HistoryColors.onSurface,
        lineHeight: 22,
    },
    logDate: {
        fontSize: 12,
        color: 'rgba(63, 74, 60, 0.6)',
        marginTop: 2,
        marginBottom: 8,
    },
    logMacros: {
        flexDirection: 'row',
        gap: 6,
    },
    macroPill: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(63, 74, 60, 0.06)',
    },
    macroPillText: {
        fontSize: 11,
        fontWeight: '700',
        color: HistoryColors.onSurfaceVariant,
    },
    logQuantity: {
        alignItems: 'center',
    },
    logQuantityText: {
        fontSize: 20,
        fontWeight: '800',
        color: HistoryColors.onSurface,
    },
    logQuantityUnit: {
        fontSize: 10,
        fontWeight: '700',
        color: HistoryColors.onSurfaceVariant,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    loadMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingVertical: 12,
        gap: 4,
    },
    loadMoreText: {
        fontSize: 14,
        fontWeight: '700',
        color: HistoryColors.primary,
    },
});

export default HistoryScreen;