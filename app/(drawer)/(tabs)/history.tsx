import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/HomePage/TopBar';
import { SearchBar } from '@/components/HistoryPage/SearchBar';
import { ListHeader } from '@/components/HistoryPage/ListHeader';
import { HistoryEntries } from '@/components/HistoryPage/HistoryEntries';
import { LoadMore } from '@/components/HistoryPage/LoadMore';
import { HistoryColors } from '@/constants/Colors';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

const HistoryScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(4);
    const [fetchedScans, setFetchedScans] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchHistory = async (isPullToRefresh = false) => {
        if (isPullToRefresh) {
            setRefreshing(true);
        } else {
            setIsLoading(true);
        }
        try {
                    const user = FIREBASE_AUTH.currentUser;
                    if (!user) return;
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
                        
                        // Map backend ScannedLabel into Frontend ScanItem
                        const mappedScans = data.map((doc: any, index: number) => {
                            let title = "Saved Scan";
                            if (doc.data?.title) {
                                title = doc.data?.title; // Fallback summary title
                            }
                            // Extract title cleanly if there are ingredients/bullets
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
                setRefreshing(false);
            }
        };

    useEffect(() => {
        fetchHistory();
    }, []);

    const onRefresh = () => {
        fetchHistory(true);
    };

    // Filter logic
    const filteredScans = fetchedScans.filter(scan => 
        scan.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedScans = filteredScans.slice(0, visibleCount);

    return (
        <SafeAreaView style={styles.container}>
            <TopBar />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        colors={[HistoryColors.primary]} 
                        tintColor={HistoryColors.primary} 
                    />
                }
            >
                {/* Search Bar */}
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                {/* List Header */}
                <ListHeader />

                {/* Loading State or History Entries */}
                {isLoading ? (
                    <View style={{ marginTop: 40, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={HistoryColors.primary} />
                    </View>
                ) : fetchedScans.length === 0 ? (
                    <View style={{ marginTop: 40, alignItems: 'center' }}>
                        <Text style={{ color: HistoryColors.onSurfaceVariant, fontSize: 16 }}>No scans saved yet.</Text>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HistoryColors.surface,
  },
  scrollContent: {
    paddingTop: 96,
    paddingBottom: 130, // Clearance for absolute bottom nav (from layout)
    paddingHorizontal: 24,
  },
});

export default HistoryScreen;