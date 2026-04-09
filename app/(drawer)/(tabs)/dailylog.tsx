import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Extracted Theme Colors
const colors = {
  brandGreen: '#4CAF50',
  brandGreenLight: 'rgba(76, 175, 80, 0.1)',
  surface: '#ffffff',
  surfaceContainerLow: '#f0f1ed',
  surfaceContainerHighest: '#e1e4de',
  onSurface: '#191c19',
  onSurfaceVariant: '#43493f',
  outlineVariant: '#c3c8bc',
  tertiary: '#705d00',
  secondary: '#52634f',
  white: '#ffffff',
  zinc400: '#a1a1aa',
};

export default function LogNourishmentScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const[foodName, setFoodName] = useState('Whole Grain Bread');
  const [quantity, setQuantity] = useState('100');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Nourishment</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search Section */}
        <View style={styles.section}>

          {/* Food Name Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>FOOD NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter food item name..."
              placeholderTextColor={colors.zinc400}
              value={foodName}
              onChangeText={setFoodName}
            />
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.section}>
          <Text style={styles.label}>QUANTITY & PORTION</Text>
          <View style={styles.quantityRow}>
            <TextInput
              style={[styles.input, styles.quantityInput]}
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
            <TouchableOpacity style={styles.dropdownSelector}>
              <Text style={styles.dropdownText}>grams (g)</Text>
              <MaterialIcons name="expand-more" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Nutritional Estimate Card */}
        <View style={styles.nutritionCard}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardSupertitle}>NUTRITIONAL ESTIMATE</Text>
              <Text style={styles.cardTitle}>{foodName || 'Unknown Food'}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.caloriesValue}>265</Text>
              <Text style={styles.caloriesLabel}>CALORIES</Text>
            </View>
          </View>

          {/* Macro Bento Grid */}
          <View style={styles.macroGrid}>
            {/* Protein */}
            <View style={styles.macroBox}>
              <View style={styles.macroHeader}>
                <MaterialIcons name="fitness-center" size={14} color={colors.brandGreen} />
                <Text style={[styles.macroLabel, { color: colors.brandGreen }]}>PROTEIN</Text>
              </View>
              <Text style={styles.macroValue}>9.2<Text style={styles.macroUnit}>g</Text></Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '40%', backgroundColor: colors.brandGreen }]} />
              </View>
            </View>

            {/* Carbs */}
            <View style={styles.macroBox}>
              <View style={styles.macroHeader}>
                <MaterialIcons name="grain" size={14} color={colors.tertiary} />
                <Text style={[styles.macroLabel, { color: colors.tertiary }]}>CARBS</Text>
              </View>
              <Text style={styles.macroValue}>45.8<Text style={styles.macroUnit}>g</Text></Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '75%', backgroundColor: colors.tertiary }]} />
              </View>
            </View>

            {/* Fats */}
            <View style={styles.macroBox}>
              <View style={styles.macroHeader}>
                <MaterialIcons name="water-drop" size={14} color={colors.secondary} />
                <Text style={[styles.macroLabel, { color: colors.secondary }]}>FATS</Text>
              </View>
              <Text style={styles.macroValue}>4.2<Text style={styles.macroUnit}>g</Text></Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '20%', backgroundColor: colors.secondary }]} />
              </View>
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <MaterialIcons name="info-outline" size={20} color={colors.brandGreen} style={{ marginTop: 2 }} />
            <Text style={styles.infoText}>
              High in fiber and complex carbohydrates. Good for sustained energy levels through the morning.
            </Text>
          </View>
        </View>
        {/* Bottom Action Area */}
        <View style={styles.bottomActionArea}>
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
            <MaterialIcons name="add-task" size={24} color={colors.white} />
            <Text style={styles.submitButtonText}>Add to Daily Log</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'android' ? 16 : 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    zIndex: 50,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 140, // Space for the fixed bottom button
  },
  section: {
    marginBottom: 24,
  },
  fieldContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIconLeft: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  input: {
    height: 56,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: 'rgba(195, 200, 188, 0.4)',
    borderRadius: 16,
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  quantityRow: {
    flexDirection: 'row',
    gap: 16,
  },
  quantityInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 0,
  },
  dropdownSelector: {
    flex: 2,
    height: 56,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: 'rgba(195, 200, 188, 0.4)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  nutritionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(195, 200, 188, 0.4)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cardSupertitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.brandGreen,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
  },
  caloriesValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: -1,
    lineHeight: 40,
  },
  caloriesLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  macroGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  macroBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 12,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 8,
  },
  macroUnit: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: colors.brandGreenLight,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  bottomActionArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  submitButton: {
    height: 64,
    backgroundColor: colors.brandGreen,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: colors.brandGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});