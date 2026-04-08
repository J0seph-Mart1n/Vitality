import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/Colors';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function CardGridLayout() {
  const progressAnim1 = useRef(new Animated.Value(0)).current;
  const progressAnim2 = useRef(new Animated.Value(0)).current;
  const progressAnim3 = useRef(new Animated.Value(0)).current;

  // Run the animation when the component mounts or app refreshes
  useEffect(() => {
    progressAnim1.setValue(0);
    Animated.timing(progressAnim1, {
      toValue: 56, // target percentage
      duration: 1000,
      useNativeDriver: false,
    }).start();

    progressAnim2.setValue(0);
    Animated.timing(progressAnim2, {
      toValue: 65, // target percentage
      duration: 1000,
      useNativeDriver: false,
    }).start();

    progressAnim3.setValue(0);
    Animated.timing(progressAnim3, {
      toValue: 82, // target percentage
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth1 = progressAnim1.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  const progressWidth2 = progressAnim2.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  const progressWidth3 = progressAnim3.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.bentoGrid}>
      {/* Large Calorie Card */}
      <View style={[styles.card, styles.calorieCard]}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardLabel}>Calories</Text>
          <View style={styles.iconCircle}>
            <MaterialIcons name="bolt" size={20} color={colors.primary} />
          </View>
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
            style={[styles.progressBarFill, { width: progressWidth1 }]}
          />
        </View>
      </View>

      {/* Sub-Macros Row */}
      <View style={styles.macroRow}>
        {/* Carbs */}
        <View style={[styles.card, styles.macroCard]}>
          <Text style={styles.cardLabelLeft}>CARBS</Text>
          <View style={styles.macroContent}>
            <Text style={styles.macroValue}>210g</Text>
            <View style={styles.progressBarBgSm}>
              <AnimatedLinearGradient
                colors={[colors.primary, colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: progressWidth2 }]}
              />
            </View>
          </View>
        </View>

        {/* Protein */}
        <View style={[styles.card, styles.macroCard]}>
          <Text style={styles.cardLabelLeft}>PROTEIN</Text>
          <View style={styles.macroContent}>
            <Text style={styles.macroValue}>95g</Text>
            <View style={styles.progressBarBgSm}>
              <AnimatedLinearGradient
                colors={[colors.primary, colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: progressWidth3 }]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: '800',
    color: colors.onSurfaceVariant,
    fontFamily: '',
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
})