import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ReportColors } from '@/constants/Colors';

export default function TopBar() {
    return (
        <BlurView intensity={80} tint="light" style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <MaterialIcons name="arrow-back" size={24} color={ReportColors.onSurfaceVariant} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Vitality</Text>
            </View>
    
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="notifications-none" size={24} color={ReportColors.onSurfaceVariant} />
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
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: ReportColors.surfaceContainerHighest,
        overflow: 'hidden',
      },
    profilePic: {
        width: '100%',
        height: '100%',
      },
});