import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';

export function PlaceholderScreen({ route }: any) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        {/* Screen name */}
        <Text style={styles.title}>
          {route.name}
        </Text>

        {/* Placeholder message */}
        <Text style={styles.text}>
          Frontend screen coming next.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.navy,
  },

  text: {
    marginTop: 8,
    color: colors.textMuted,
  },
});