import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

const colors = {
  brandGreen: '#4CAF50',
  brandDark: '#166534',
  onSurface: '#191c19',
  onSurfaceVariant: '#43493f',
  white: '#ffffff',
};

export default function CustomDrawerContent(props: any) {

  const handleSignOut = async () => {
    await FIREBASE_AUTH.signOut();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      {/* Dynamic Green Gradient Background */}
      <LinearGradient
        colors={['rgba(76, 175, 80, 0.95)', 'rgba(22, 101, 52, 0.98)']}
        style={StyleSheet.absoluteFill}
      />

      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollArea}>
        {/* User Profile Area */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCECitLV_GabD0nin2c4r4OTYZ6spSNDNwMLXHIaZjn_k4kdjWUv5VmwoUmSOPcO-kfUDFkAkNkS4PaN4COxRw7-CHFtBQ-P57KFKnuVRJk5M3pr6qsWdk4A3oh0kBDqnhEcJmvX9gbB_kJS_GApsQ_lTMHSttYQr3C0TjJm3k61DzaZd_ZdiQN5AbdFlJjv25pqQuOAvePdLcKI_an2xE2tnRDQSJ1G-m_4GG-KbW9sM233DbsWcaYoIoFYh01L5Q8Z0_jE6ayKMw',
            }}
            style={styles.drawerProfilePic}
          />
          <Text style={styles.userName}>Jane Doe</Text>
          <Text style={styles.userEmail}>wellness@example.com</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Navigation Items */}
        <View style={styles.menuItems}>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="person-outline" size={24} color={colors.white} />
            <Text style={styles.menuText}>My Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="restaurant-menu" size={24} color={colors.white} />
            <Text style={styles.menuText}>Dietary Preferences</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="history" size={24} color={colors.white} />
            <Text style={styles.menuText}>Insights & History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="settings" size={24} color={colors.white} />
            <Text style={styles.menuText}>App Settings</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Logout Button sticks to bottom */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={handleSignOut}
        >
          <MaterialIcons name="logout" size={22} color="#ffe5e5" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden', // Forces radius on the gradient!
  },
  scrollArea: {
    paddingTop: 48, // Pushes UI below the status bar effortlessly
  },
  profileSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  drawerProfilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  menuItems: {
    paddingHorizontal: 16,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
    gap: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.2)', // Sleek tinted red output
    paddingVertical: 16,
    borderRadius: 16,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffe5e5',
  },
});
