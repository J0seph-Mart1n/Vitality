import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Svg, { Circle } from 'react-native-svg';

// Extracted Theme Colors
const colors = {
  background: '#f9f9f9',
  onBackground: '#1a1c1c',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f3f3',
  surfaceContainerHighest: '#e2e2e2',
  onSurface: '#1a1c1c',
  onSurfaceVariant: '#3f4a3c',
  primary: '#1b6d24',
  primaryLight: 'rgba(27, 109, 36, 0.1)', // bg-primary/10
  secondaryContainer: 'rgba(189, 239, 190, 0.3)', // bg-secondary-container/30
  onSecondaryContainer: '#426e47',
  tertiary: '#795900',
  tertiaryFixed: 'rgba(255, 223, 160, 0.3)', // bg-tertiary-fixed/30
  onTertiaryContainer: '#433000',
  inverseSurface: '#2f3131',
  inverseOnSurface: '#f1f1f1',
  white: '#ffffff',
  outlineVariant: 'rgba(190, 202, 185, 0.15)',
};

// Mock Data for lists
const benefits =[
  { id: 1, title: 'High Vitamin K', desc: 'Supports bone health and blood clotting efficiency.' },
  { id: 2, title: 'Antioxidant Rich', desc: 'Contains lutein and zeaxanthin for optimal eye health.' },
  { id: 3, title: 'Zero Additives', desc: '100% natural ingredients with no synthetic fillers.' },
];

const harms =[
  { id: 1, title: 'Natural Sugar Content', desc: 'Concentrated fruit sugars; monitor if you have glucose sensitivity.' },
  { id: 2, title: 'Low Fiber Content', desc: 'Juicing removes pulp, resulting in faster sugar absorption.' },
];

const nutritionFacts =[
  { id: 1, name: 'Energy', amount: '120 kcal', dv: '6%', pct: 6, color: colors.primary },
  { id: 2, name: 'Total Sugars', amount: '18g', dv: '20%', pct: 20, color: colors.tertiary },
  { id: 3, name: 'Vitamin K', amount: '112mcg', dv: '140%', pct: 100, color: colors.primary },
  { id: 4, name: 'Sodium', amount: '45mg', dv: '2%', pct: 2, color: colors.primary },
];

export default function ScanReportScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Top App Bar (Blurred) */}
      <BlurView intensity={80} tint="light" style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vitality</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="notifications-none" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <View style={styles.profilePicContainer}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe5Ye5SaJIMarF-BrXew9JjymOxAHMmwb5xOoggR5AetUXEwme2Yg03TLhZUW7RbSMYJuDqd5TZraqPzjek64v5enXYcnqdepkITc06NlGKqnhPpxMLDYInkngzHAuP0PkiZBD99ftEFj5zLv1vvS_JoDCDEhjvT6etuHUzXpvD6nZpStf1-GMngPvsnSYdawAE9ghR0y1hfFJdYLF8tGFZwIA2HbpXrwr2-du1PWDTttCHADXKOQ7qzS-1lNvPUElVak6ycP2HOE',
              }}
              style={styles.profilePic}
            />
          </View>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Scan Analysis</Text>
          </View>

          {/* Health Score Card */}
          <View style={styles.scoreCard}>
            <View style={styles.scoreRingContainer}>
              <Svg width={96} height={96} viewBox="0 0 96 96" style={{ transform: [{ rotate: '-90deg' }] }}>
                {/* Background Track */}
                <Circle cx={48} cy={48} r={40} stroke={colors.surfaceContainerHighest} strokeWidth={8} fill="transparent" />
                {/* Progress Ring (85%) */}
                <Circle cx={48} cy={48} r={40} stroke={colors.primary} strokeWidth={8} fill="transparent"
                  strokeDasharray={251.2} strokeDashoffset={251.2 - (85 / 100) * 251.2} strokeLinecap="round" />
              </Svg>
              <View style={styles.scoreTextOverlay}>
                <Text style={styles.scoreNumber}>85</Text>
              </View>
            </View>
            <View style={styles.scoreTextContainer}>
              <Text style={styles.scoreTitle}>Health Score</Text>
              <Text style={styles.scoreSubtitle}>
                Excellent choice for your daily nutritional goals. High nutrient density detected.
              </Text>
            </View>
          </View>
        </View>

        {/* Bento Grid: Benefits & Harms */}
        <View style={styles.bentoGrid}>
          {/* Healthy Benefits */}
          <View style={[styles.bentoCard, { backgroundColor: colors.secondaryContainer }]}>
            <View style={styles.bentoHeader}>
              <View style={[styles.bentoIconBox, { backgroundColor: colors.primary }]}>
                <MaterialIcons name="favorite" size={24} color={colors.white} />
              </View>
              <Text style={[styles.bentoTitle, { color: colors.onSecondaryContainer }]}>Healthy Benefits</Text>
            </View>
            
            <View style={styles.bentoList}>
              {benefits.map((item) => (
                <View key={item.id} style={styles.bentoListItem}>
                  <MaterialIcons name="check-circle" size={20} color={colors.primary} style={styles.listIcon} />
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listTitle}>{item.title}</Text>
                    <Text style={styles.listDesc}>{item.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Potential Harm */}
          <View style={[styles.bentoCard, { backgroundColor: colors.tertiaryFixed }]}>
            <View style={styles.bentoHeader}>
              <View style={[styles.bentoIconBox, { backgroundColor: colors.tertiary }]}>
                <MaterialIcons name="warning" size={24} color={colors.white} />
              </View>
              <Text style={[styles.bentoTitle, { color: colors.onTertiaryContainer }]}>Potential Harm</Text>
            </View>
            
            <View style={styles.bentoList}>
              {harms.map((item) => (
                <View key={item.id} style={styles.bentoListItem}>
                  <MaterialIcons name="report-problem" size={20} color={colors.tertiary} style={styles.listIcon} />
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listTitle}>{item.title}</Text>
                    <Text style={styles.listDesc}>{item.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Nutritional Facts Table */}
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTitle}>Nutritional Facts</Text>
          </View>
          
          <View style={styles.tableHeadRow}>
            <Text style={[styles.tableHeadText, { flex: 2 }]}>NUTRIENT</Text>
            <Text style={[styles.tableHeadText, { flex: 1, textAlign: 'right' }]}>AMOUNT</Text>
            <Text style={[styles.tableHeadText, { flex: 1.5, textAlign: 'right' }]}>% DV</Text>
          </View>

          {nutritionFacts.map((row, index) => (
            <View key={row.id} style={[styles.tableRow, index !== nutritionFacts.length - 1 && styles.tableRowBorder]}>
              <Text style={[styles.tableCellMain, { flex: 2 }]}>{row.name}</Text>
              <Text style={[styles.tableCellSub, { flex: 1, textAlign: 'right' }]}>{row.amount}</Text>
              <View style={[styles.tableCellDvContainer, { flex: 1.5 }]}>
                <Text style={[styles.tableCellDvText, { color: row.color }]}>{row.dv}</Text>
                <View style={styles.dvBarBg}>
                  <View style={[styles.dvBarFill, { width: `${row.pct}%`, backgroundColor: row.color }]} />
                </View>
              </View>
            </View>
          ))}

          <View style={styles.tableFooter}>
            <Text style={styles.tableFooterText}>
              * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice. This product is analyzed based on laboratory-verified organic standards.
            </Text>
          </View>
        </View>

        {/* Vitality Insight Section */}
        <View style={styles.insightCard}>
          <View style={styles.insightGlow} />
          <Text style={styles.insightTitle}>Vitality Insight</Text>
          <Text style={styles.insightDesc}>
            "This blend is exceptionally high in Vitamin K. For optimal absorption, consider consuming it alongside a source of healthy fats, like a handful of almonds or half an avocado."
          </Text>
          <TouchableOpacity style={styles.insightButton}>
            <Text style={styles.insightButtonText}>Save to My Log</Text>
            <MaterialIcons name="bookmark" size={20} color={colors.white} />
          </TouchableOpacity>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 16 : 16,
    paddingBottom: 16,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#166534',
    letterSpacing: -0.5,
  },
  profilePicContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerHighest,
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 80 : 100,
    paddingHorizontal: 24,
    paddingBottom: 120, // Padding for Tab Bar
  },
  heroSection: {
    marginBottom: 32,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 32,
    backgroundColor: colors.surfaceContainerLow,
    marginBottom: 24,
  },
  heroTextContainer: {
    marginBottom: 24,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.onSurface,
    lineHeight: 40,
    letterSpacing: -1,
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
  },
  scoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
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
    color: colors.onSurface,
  },
  scoreTextContainer: {
    flex: 1,
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 4,
  },
  scoreSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  bentoGrid: {
    gap: 24,
    marginBottom: 32,
  },
  bentoCard: {
    borderRadius: 32,
    padding: 28,
  },
  bentoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  bentoIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bentoTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  bentoList: {
    gap: 20,
  },
  bentoListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  listIcon: {
    marginTop: 2,
  },
  listTextContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  listDesc: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },
  tableCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  tableHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  tableTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 4,
  },
  tableSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  tableHeadRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  tableHeadText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  tableCellMain: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSurface,
  },
  tableCellSub: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
  },
  tableCellDvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  tableCellDvText: {
    fontSize: 13,
    fontWeight: '800',
  },
  dvBarBg: {
    width: 60,
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 3,
    overflow: 'hidden',
  },
  dvBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  tableFooter: {
    backgroundColor: 'rgba(243, 243, 243, 0.5)',
    padding: 24,
  },
  tableFooterText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  insightCard: {
    backgroundColor: colors.inverseSurface,
    borderRadius: 32,
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  insightGlow: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 150,
    height: 150,
    backgroundColor: 'rgba(27, 109, 36, 0.4)',
    borderRadius: 75,
    opacity: 0.5,
  },
  insightTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.inverseOnSurface,
    marginBottom: 16,
  },
  insightDesc: {
    fontSize: 16,
    color: colors.inverseOnSurface,
    lineHeight: 26,
    opacity: 0.9,
    marginBottom: 24,
  },
  insightButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
  },
  insightButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
  },
});