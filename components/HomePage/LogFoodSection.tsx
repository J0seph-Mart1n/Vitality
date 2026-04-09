import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/constants/Colors';

export default function LogFoodSection() {
  return (
    <View>
      <Text style={styles.entryTitle}>Add Daily Food Entry</Text>
      <TouchableOpacity 
        style={styles.card}
        onPress={() => router.push('/dailylog')}
        activeOpacity={0.8}
      >
        
        <View style={styles.iconContainer}>
          <MaterialIcons name="restaurant" size={24} color={colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Log Food Item</Text>
          <Text style={styles.subtitle}>Track your daily nourishment</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={colors.onSurfaceVariant} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  entryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 16,
    backgroundColor: colors.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
});
