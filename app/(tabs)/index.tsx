import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
import { recentScans } from '@/constants/SampleScans';

// Extracted theme colors from the Tailwind config
const colors = {
  background: '#f9f9f9',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f3f3',
  surfaceContainer: '#eeeeee',
  surfaceContainerHigh: '#e8e8e8',
  surfaceContainerHighest: '#e2e2e2',
  onSurface: '#1a1c1c',
  onSurfaceVariant: '#3f4a3c',
  primary: '#1b6d24',
  primaryContainer: '#5dac5b',
  onPrimaryContainer: '#003c0a',
  primaryFixed: '#a3f69c',
  onPrimaryFixed: '#002204',
  onPrimary: '#ffffff',
  secondary: '#3c6842',
  tertiary: '#795900',
  tertiaryContainer: '#c59300',
};

export default function HomePage() {
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Run the animation when the component mounts or app refreshes
  useEffect(() => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 56, // target percentage
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {/* Top App Bar Fixed */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCECitLV_GabD0nin2c4r4OTYZ6spSNDNwMLXHIaZjn_k4kdjWUv5VmwoUmSOPcO-kfUDFkAkNkS4PaN4COxRw7-CHFtBQ-P57KFKnuVRJk5M3pr6qsWdk4A3oh0kBDqnhEcJmvX9gbB_kJS_GApsQ_lTMHSttYQr3C0TjJm3k61DzaZd_ZdiQN5AbdFlJjv25pqQuOAvePdLcKI_an2xE2tnRDQSJ1G-m_4GG-KbW9sM233DbsWcaYoIoFYh01L5Q8Z0_jE6ayKMw',
            }}
            style={styles.profilePic}
          />
          <Text style={styles.headerTitle}>NutriScan</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="notifications-none" size={24} color="#166534" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Daily Progress Section */}
        <View style={styles.section}>
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.sectionLabel}>Daily Health Summary</Text>
              <Text style={styles.balanceTitle}>Your Balance</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.goalPercentage}>72%</Text>
              <Text style={styles.goalLabel}>Daily Goal</Text>
            </View>
          </View>

          {/* Bento Grid */}
          <View style={styles.bentoGrid}>
            {/* Large Calorie Card */}
            <View style={[styles.card, styles.calorieCard]}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.iconCircle}>
                  <MaterialIcons name="bolt" size={20} color={colors.primary} />
                </View>
                <Text style={styles.cardLabel}>KCAL</Text>
              </View>
              <View style={styles.calorieValues}>
                <Text style={styles.calorieCurrent}>1,840</Text>
                <Text style={styles.calorieTotal}> / 2,400</Text>
              </View>
              <View style={styles.progressBarBg}>
                <AnimatedLinearGradient
                  colors={[colors.primary, colors.primaryContainer]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: progressWidth }]}
                />
              </View>
            </View>
          </View>
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
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHigh,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#166534',
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  balanceTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: -1,
  },
  goalPercentage: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  goalLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  bentoGrid: {
    gap: 16,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  calorieCard: {
    minHeight: 180,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconCircle: {
    backgroundColor: colors.primaryContainer + '30', // adding opacity
    padding: 8,
    borderRadius: 20,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  cardLabelLeft: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginBottom: 16,
  },
  calorieValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 20,
    marginBottom: 16,
  },
  calorieCurrent: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.onSurface,
  },
  calorieTotal: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginLeft: 8,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroCard: {
    width: '48%',
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'space-between',
    padding: 16,
  },
  macroContent: {
    marginTop: 8,
  },
  macroValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 12,
  },
  progressBarBgSm: {
    height: 8,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 4,
    overflow: 'hidden',
  },
  tipCard: {
    backgroundColor: colors.onSurface,
    borderRadius: 16,
    padding: 32,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 16,
  },
  tipImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '45%',
    opacity: 0.2,
  },
  tipContent: {
    zIndex: 10,
  },
  tipBadge: {
    backgroundColor: colors.primaryFixed,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  tipBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onPrimaryFixed,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tipTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onPrimary,
    lineHeight: 32,
    marginBottom: 12,
  },
  tipDescription: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    opacity: 0.9,
    lineHeight: 22,
    marginBottom: 16,
    color: '#e2e2e2',
  },
  learnMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  learnMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryFixed,
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
  scansGrid: {
    gap: 12,
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 16,
  },
  scanImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
    marginRight: 16,
  },
  scanDetails: {
    flex: 1,
  },
  scanTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  scanSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  scanStatus: {
    alignItems: 'center',
    marginLeft: 12,
  },
  statusIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingBottom: Platform.OS === 'ios' ? 32 : 24,
    paddingTop: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 50,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#a1a1aa',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '700',
    color: '#14532d',
    marginTop: 4,
  },
});
