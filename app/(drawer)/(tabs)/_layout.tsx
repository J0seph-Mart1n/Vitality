import React from 'react';
import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Dashboard Route */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      
      {/* Scan Route */}
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
        }}
      />

      {/* History Route */}
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
        }}
      />
    </Tabs>
  );
}