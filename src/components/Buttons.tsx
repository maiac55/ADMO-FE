import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export function PrimaryButton({
  label,
  onPress,
  icon,
  style,
}: {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}) {
  return (
    <Pressable onPress={onPress} style={style}>
      <LinearGradient
        colors={['#08AAA5', '#079A99']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={s.primary}
      >
        {icon ? (
          <Ionicons name={icon} size={20} color="white" style={s.icon} />
        ) : null}
        <Text style={s.primaryText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Pressable onPress={onPress} style={s.secondary}>
      {icon ? (
        <Ionicons name={icon} size={20} color={colors.teal} style={s.icon} />
      ) : null}
      <Text style={s.secondaryText}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  primary: {
    minHeight: 54,
    borderRadius: 28,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  secondary: {
    minHeight: 54,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: colors.teal,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: colors.teal,
    fontSize: 16,
    fontWeight: '700',
  },
  icon: {
    marginRight: 8,
  },
});
