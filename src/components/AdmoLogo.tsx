import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { colors } from '../theme/colors';

export function AdmoLogo({ large = false }: { large?: boolean }) {
  const scale = large ? 1.35 : 1;
  return (
    <View style={[styles.wrap, large && styles.largeWrap]}>
      <Svg width={78 * scale} height={70 * scale} viewBox="0 0 78 70">
        <G transform="translate(5 4) rotate(-18 34 31)">
          <Path d="M14 31C14 21 22 13 32 13h7v36h-7c-10 0-18-8-18-18Z" fill="#16C9C2" />
          <Path d="M39 13h7c10 0 18 8 18 18s-8 18-18 18h-7V13Z" fill="#0A4D78" />
          <Path d="M39 13v36" stroke="white" strokeWidth="2" opacity="0.9" />
        </G>
      </Svg>
      <Text style={[styles.word, large && styles.largeWord]}>ADMO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 150, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' },
  largeWrap: { height: 205 },
  word: { marginTop: -8, color: colors.navy, fontSize: 25, letterSpacing: 10, fontWeight: '800' },
  largeWord: { fontSize: 32, letterSpacing: 13 },
});
