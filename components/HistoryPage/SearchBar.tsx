import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HistoryColors } from '@/constants/Colors';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <View style={styles.searchSection}>
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={22} color="rgba(63, 74, 60, 0.5)" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your scan history..."
          placeholderTextColor="rgba(63, 74, 60, 0.4)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    marginBottom: 40,
    marginTop: 30,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HistoryColors.surfaceContainerLow,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: HistoryColors.onSurface,
  },
});