import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../theme/colors';

export function Divider() {
  return (
    <View style={styles.row}>
      {/* Left line */}
      <View style={styles.line} />

      {/* Divider text */}
      <Text style={styles.text}>
        or
      </Text>

      {/* Right line */}
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginVertical: 18,
  },

  line: {
    height: 1,
    backgroundColor: colors.border,
    flex: 1,
  },

  text: {
    color: colors.textMuted,
    fontSize: 13,
  },
});