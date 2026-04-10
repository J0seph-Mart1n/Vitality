import CardGridLayout from '@/components/HomePage/CardGridLayout';
import DailyProgress from '@/components/HomePage/DailyProgress';
import TopBar from '@/components/HomePage/TopBar';
import TipSection from '@/components/HomePage/TipSection';
import RecentScans from '@/components/HomePage/RecentScans';
import LogFoodSection from '@/components/HomePage/LogFoodSection';
import { colors } from '@/constants/Colors';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {/* Top App Bar Fixed */}
      <TopBar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Daily Progress Section */}
        <View style={styles.section}>
          <DailyProgress />

          {/* Bento Grid */}
          <CardGridLayout />

          {/* Tip of the Day */}
          <TipSection />

          {/* Log Food Section */}
          <LogFoodSection />

          {/* Recent Scans */}
          <RecentScans />
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
