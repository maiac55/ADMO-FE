import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export function AdmoLogo({ large = false }: { large?: boolean }) {
  return (
    <View style={[styles.container, large && styles.largeContainer]}>
      <Image
        source={require('../../assets/admo-logo.png')}
        style={[styles.logo, large && styles.largeLogo]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  largeContainer: {
    height: 260,
  },

  logo: {
    width: 170,
    height: 110,
  },

  largeLogo: {
    width: 330,
    height: 220,
  },
});