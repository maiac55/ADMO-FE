import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthBackground } from '../components/AuthBackground';
import { AdmoLogo } from '../components/AdmoLogo';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

export function SplashScreen({
  navigation,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1400);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          {/* Large ADMO logo */}
          <AdmoLogo large />
        </View>
      </SafeAreaView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },
});