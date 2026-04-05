import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { ReportColors } from '@/constants/Colors';
import TopBar from '@/components/ReportPage/TopBar';
import HealthScore from '@/components/ReportPage/HealthScore';
import BentoGrid from '@/components/ReportPage/BentoGrid';
import NutritionalTable from '@/components/ReportPage/NutritionalTable';
import Insight from '@/components/ReportPage/Insight';

export default function ScanReportScreen() {
  const { analysisData } = useLocalSearchParams();

  if (!analysisData) {
    return null;
  }

  // Parse the data passed from the scanner screen
  const parsedData = typeof analysisData === 'string' ? JSON.parse(analysisData) : analysisData;

  // Map Data
  const formatKey = (str: string) => str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const benefitsObj = parsedData.benefits || {};
  const mappedBenefits = Object.keys(benefitsObj).map((key, index) => ({
    id: index,
    title: formatKey(key),
    desc: benefitsObj[key],
  }));

  const harmsObj = parsedData.harmful_effects || {};
  const mappedHarms = Object.keys(harmsObj).map((key, index) => ({
    id: index,
    title: formatKey(key),
    desc: harmsObj[key],
  }));

  const nutritionFactsObj = parsedData.nutritional_facts || {};
  const mappedNutritionFacts = Object.keys(nutritionFactsObj).map((key, index) => ({
    id: index,
    name: formatKey(key),
    amount: nutritionFactsObj[key] || "N/A",
  })).filter(row => row.amount && row.amount !== "N/A" && row.amount !== "");

  const scoreRaw = String(parsedData.health_score?.score || "0");
  // Extract number from score if LM outputted something like "85/100"
  const parsedScoreMatch = scoreRaw.match(/\d+/);
  const healthScoreInt = parsedScoreMatch ? parseInt(parsedScoreMatch[0], 10) : 0;
  
  const scoreSentence = parsedData.health_score?.sentence || "";
  const summaryInsight = parsedData.summary || "No insights discovered.";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Top App Bar (Blurred) */}
      <TopBar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Health Score Section */}
        <HealthScore healthScoreInt={healthScoreInt} scoreSentence={scoreSentence} />

        {/* Bento Grid: Benefits & Harms */}
        <BentoGrid mappedBenefits={mappedBenefits} mappedHarms={mappedHarms} />

        {/* Nutritional Facts Table */}
        <NutritionalTable mappedNutritionFacts={mappedNutritionFacts} />

        {/* Vitality Insight Section */}
        <Insight summaryInsight={summaryInsight} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ReportColors.background,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 80 : 100,
    paddingHorizontal: 24,
    paddingBottom: 120, // Padding for Tab Bar
  },

});