import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/HomePage/TopBar';
import { recentScans } from '@/constants/SampleScans';
import { SearchBar } from '@/components/HistoryPage/SearchBar';
import { ListHeader } from '@/components/HistoryPage/ListHeader';
import { HistoryEntries } from '@/components/HistoryPage/HistoryEntries';
import { LoadMore } from '@/components/HistoryPage/LoadMore';
import { HistoryColors } from '@/constants/Colors';

const HistoryScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(4);

    const displayedScans = recentScans.slice(0, visibleCount);

    return (
        <SafeAreaView style={styles.container}>
            <TopBar />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
            >
                {/* Search Bar */}
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                {/* List Header */}
                <ListHeader />

                {/* History Entries */}
                <HistoryEntries displayedScans={displayedScans} />

                {/* Pagination / Load More */}
                <LoadMore 
                    visibleCount={visibleCount} 
                    recentScans={recentScans} 
                    setVisibleCount={setVisibleCount} 
                />
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