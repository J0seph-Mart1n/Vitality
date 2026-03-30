import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/HomePage/TopBar';
import { recentScans } from '@/constants/SampleScans';

// Theme Colors extracted from Tailwind config
const colors = {
  surface: '#f9f9f9',
  onSurface: '#1a1c1c',
  onSurfaceVariant: '#3f4a3c',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f3f3',
  surfaceContainer: '#eeeeee',
  surfaceContainerHigh: '#e8e8e8',
  primary: '#1b6d24',
  primaryFixed: '#a3f69c',
  secondary: '#3c6842',
  tertiaryContainer: '#c59300',
  error: '#ba1a1a',
};

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
                <View style={styles.searchSection}>
                    <View style={styles.searchBox}>
                        <MaterialIcons name="search" size={22} color="rgba(63, 74, 60, 0.5)" style={styles.searchIcon} />
                        <TextInput
                        style={styles.searchInput}
                        placeholder="Search your scan history..."
                        placeholderTextColor="rgba(63, 74, 60, 0.4)"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* List Header */}
                <View style={styles.listHeader}>
                    <View>
                        <Text style={styles.labelTimeline}>TIMELINE</Text>
                        <Text style={styles.titleHistory}>Scan History</Text>
                    </View>
                    <TouchableOpacity style={styles.sortButton}>
                        <MaterialIcons name="sort" size={18} color={colors.primary} />
                        <Text style={styles.sortButtonText}>Sort by Date</Text>
                    </TouchableOpacity>
                </View>

                {/* History Entries */}
                <View style={styles.entriesContainer}>
                    {displayedScans.map((item) => {
                        // Determine styling based on score (simulating the Tailwind logic)
                        const isWarning = item.score < 70;
                        const badgeBgColor = isWarning ? 'rgba(197, 147, 0, 0.2)' : 'rgba(27, 109, 36, 0.1)';
                        const badgeTextColor = isWarning ? colors.tertiaryContainer : colors.primary;

                        return (
                        <View key={item.id} style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                            
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
                                        <MaterialIcons name="share" size={16} color={colors.secondary} />
                                        <Text style={styles.actionTextShare}>Share</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.actionButton}>
                                        <MaterialIcons name="delete-outline" size={16} color="rgba(186, 26, 26, 0.7)" />
                                        <Text style={styles.actionTextRemove}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        );
                    })}
                </View>

                {/* Pagination / Load More */}
                {visibleCount < recentScans.length && (
                    <View style={styles.loadMoreContainer}>
                    <TouchableOpacity 
                        style={styles.loadMoreBtn}
                        onPress={() => setVisibleCount(prev => prev + 4)}
                    >
                        <Text style={styles.loadMoreText}>Load older scans</Text>
                    </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
    zIndex: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profilePicContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 2,
    borderColor: colors.primaryFixed,
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#166534',
    letterSpacing: -0.5,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    paddingTop: 96,
    paddingBottom: 130, // Clearance for absolute bottom nav (from layout)
    paddingHorizontal: 24,
  },
  searchSection: {
    marginBottom: 40,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.onSurface,
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
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  titleHistory: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: 4,
  },
  sortButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  entriesContainer: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
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
    backgroundColor: colors.surfaceContainer,
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
    color: colors.onSurface,
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
    color: colors.secondary,
  },
  actionTextRemove: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(186, 26, 26, 0.7)',
  },
  loadMoreContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  loadMoreBtn: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  loadMoreText: {
    color: colors.onSurfaceVariant,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default HistoryScreen;