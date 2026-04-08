import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/Colors';

export default function TipSection() {
  return (
    <View style={styles.tipCard}>
      <Image
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb7ipXAZZm8PYSDdyk1ruorscGBltefYalZVQlIXWKTBiNkhKP-TdIezDebYiZrnzvvwGgWoRDy5R2Gd2qX9SLjUtsHfUBlbzECMwdZywC86y9I7XCrByeCdtVSJGnhgBye4UGL1ZpcHYKMCKavtt2L5fDuyawqJsE8OCYFz80HREtAptOb6vsQs6NEB3dAFlrezV3HjLFwuWj-qMdPEkd9dkZaKoWfuEXL8QclriVa3x27KzRjkhfa9lWDAXF0ZNm0cvvPGJPSao',
        }}
        style={styles.tipImage}
      />
      <View style={styles.tipContent}>
        <View style={styles.tipBadge}>
          <Text style={styles.tipBadgeText}>NUTRITION TIP</Text>
        </View>
        <Text style={styles.tipTitle}>Hydration isn't just water. Electrolytes are key for absorption.</Text>
        <Text style={styles.tipDescription}>
          Adding a pinch of sea salt and a squeeze of lemon to your morning water can improve mineral absorption and
          boost metabolic energy levels.
        </Text>
        <TouchableOpacity style={styles.learnMoreBtn}>
          <Text style={styles.learnMoreText}>Learn More</Text>
          <MaterialIcons name="arrow-forward" size={18} color={colors.primaryFixed} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
})