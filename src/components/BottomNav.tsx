import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type Tab = 'Home' | 'Persons' | 'History' | 'Profile';

type Props = {
  active: Tab;
  onNavigate: (tab: Tab) => void;
};

const tabs: { name: Tab; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }[] = [
  { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'Persons', icon: 'people-outline', activeIcon: 'people' },
  { name: 'History', icon: 'time-outline', activeIcon: 'time' },
  { name: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

export function BottomNav({ active, onNavigate }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const selected = tab.name === active;
        return (
          <Pressable key={tab.name} style={styles.tab} onPress={() => onNavigate(tab.name)}>
            <Ionicons
              name={selected ? tab.activeIcon : tab.icon}
              size={22}
              color={selected ? colors.teal : '#7188AD'}
            />
            <Text style={[styles.label, selected && styles.activeLabel]}>{tab.name}</Text>
            {selected ? <View style={styles.dot} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E8EEF2',
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    marginTop: 3,
    fontSize: 10,
    color: '#7188AD',
  },
  activeLabel: {
    color: colors.teal,
    fontWeight: '700',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.teal,
    marginTop: 4,
  },
});