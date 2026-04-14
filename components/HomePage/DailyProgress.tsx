import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/Colors';

export default function DailyProgress({ calories = 0 }: { calories?: number }) {
  const goalPercentage = Math.min((calories / 2400) * 100, 100);
  return (
    <View style={styles.balanceHeader}>
      <View>
        <Text style={styles.sectionLabel}>Daily Health Summary</Text>
        <Text style={styles.balanceTitle}>Your Balance</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.goalPercentage}>{Math.round(goalPercentage)}%</Text>
        <Text style={styles.goalLabel}>Daily Goal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
})