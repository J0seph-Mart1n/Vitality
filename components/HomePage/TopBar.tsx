import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { colors } from '@/constants/Colors';

export default function TopBar() {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCECitLV_GabD0nin2c4r4OTYZ6spSNDNwMLXHIaZjn_k4kdjWUv5VmwoUmSOPcO-kfUDFkAkNkS4PaN4COxRw7-CHFtBQ-P57KFKnuVRJk5M3pr6qsWdk4A3oh0kBDqnhEcJmvX9gbB_kJS_GApsQ_lTMHSttYQr3C0TjJm3k61DzaZd_ZdiQN5AbdFlJjv25pqQuOAvePdLcKI_an2xE2tnRDQSJ1G-m_4GG-KbW9sM233DbsWcaYoIoFYh01L5Q8Z0_jE6ayKMw',
                }}
                style={styles.profilePic}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>NutriScan</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="notifications-none" size={24} color="#166534" />
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
})