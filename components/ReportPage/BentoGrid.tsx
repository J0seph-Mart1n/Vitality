import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ReportColors } from '@/constants/Colors';

interface BentoGridProps {
  mappedBenefits: any[];
  mappedHarms: any[];
}

export default function BentoGrid({ mappedBenefits, mappedHarms }: BentoGridProps) {
  return (
    <View style={styles.bentoGrid}>
      {/* Healthy Benefits */}
      <View style={[styles.bentoCard, { backgroundColor: ReportColors.secondaryContainer }]}>
        <View style={styles.bentoHeader}>
          <View style={[styles.bentoIconBox, { backgroundColor: ReportColors.primary }]}>
            <MaterialIcons name="favorite" size={24} color={ReportColors.white} />
          </View>
          <Text style={[styles.bentoTitle, { color: ReportColors.onSecondaryContainer }]}>Healthy Benefits</Text>
        </View>

        <View style={styles.bentoList}>
          {mappedBenefits.map((item) => (
            <View key={item.id} style={styles.bentoListItem}>
              <MaterialIcons name="check-circle" size={20} color={ReportColors.primary} style={styles.listIcon} />
              <View style={styles.listTextContainer}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Potential Harm */}
      <View style={[styles.bentoCard, { backgroundColor: ReportColors.tertiaryFixed }]}>
        <View style={styles.bentoHeader}>
          <View style={[styles.bentoIconBox, { backgroundColor: ReportColors.tertiary }]}>
            <MaterialIcons name="warning" size={24} color={ReportColors.white} />
          </View>
          <Text style={[styles.bentoTitle, { color: ReportColors.onTertiaryContainer }]}>Potential Harm</Text>
        </View>

        <View style={styles.bentoList}>
          {mappedHarms.map((item) => (
            <View key={item.id} style={styles.bentoListItem}>
              <MaterialIcons name="report-problem" size={20} color={ReportColors.tertiary} style={styles.listIcon} />
              <View style={styles.listTextContainer}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: ReportColors.onSurface,
    marginBottom: 4,
  },
  listDesc: {
    fontSize: 14,
    color: ReportColors.onSurfaceVariant,
    lineHeight: 20,
  },
});