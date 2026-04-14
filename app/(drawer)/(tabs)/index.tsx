import CardGridLayout from '@/components/HomePage/CardGridLayout';
import DailyProgress from '@/components/HomePage/DailyProgress';
import TopBar from '@/components/HomePage/TopBar';
import TipSection from '@/components/HomePage/TipSection';
import RecentScans from '@/components/HomePage/RecentScans';
import LogFoodSection from '@/components/HomePage/LogFoodSection';
import { colors } from '@/constants/Colors';
import { useState, useEffect, useMemo } from 'react';
import { ScrollView, StatusBar, StyleSheet, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '@/FirebaseConfig';


export default function HomePage() {

  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [dailyLogs, setDailyLogs] = useState<any[]>([]);

  const fetchDailyLogs = async () => {
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
      console.error('Failed to fetch daily logs:', error);
    }
  };

  useEffect(() => {
    fetchDailyLogs();
  }, [refreshKey]);

  const totals = useMemo(() => {
    return dailyLogs.reduce(
      (acc, log) => {
        acc.calories += parseFloat(log.calories) || 0;
        acc.protein += parseFloat(log.protein) || 0;
        acc.carbs += parseFloat(log.carbs) || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0 }
    );
  }, [dailyLogs]);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshKey(prev => prev + 1);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {/* Top App Bar Fixed */}
      <TopBar />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Daily Progress Section */}
        <View style={styles.section}>
          <DailyProgress calories={totals.calories} />

          {/* Bento Grid */}
          <CardGridLayout totals={totals} />

          {/* Tip of the Day */}
          <TipSection />

          {/* Log Food Section */}
          <LogFoodSection />

          {/* Recent Scans */}
          <RecentScans refreshKey={refreshKey} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 130, // To avoid bottom nav overlap
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
    marginBottom: 24,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 96,
    right: 24,
    zIndex: 60,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: -0.5,
  },
});
