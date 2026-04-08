import React from 'react';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/HomePage/CustomDrawerContent';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function DrawerLayout() {
  return (
    <Drawer
      // Render our fully customized UI instead of the boring default list
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Keep your beautiful TopBar visible on the tabs!
        drawerStyle: {
          width: width * 0.8, // Take up 80% of the screen exactly
        },
        drawerType: 'front', // Pushes the main app gracefully out of the way
      }}
    >
      {/* This automatically captures and registers your bottom tabs layout perfectly */}
      <Drawer.Screen
        name="(tabs)"
        options={{ drawerLabel: 'Home' }}
      />
    </Drawer>
  );
}
