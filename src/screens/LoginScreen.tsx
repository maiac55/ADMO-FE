import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import {
  PrimaryButton,
  SecondaryButton,
} from '../components/Buttons';
import { Divider } from '../components/Divider';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export function LoginScreen({
  navigation,
}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout
      title="Welcome to ADMO"
      subtitle={
        'Your health, simplified.\nLog in to continue or create a new account.'
      }
    >
      {/* Email */}
      <AuthInput
        icon="mail-outline"
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <AuthInput
        icon="lock-closed-outline"
        placeholder="Password"
        password
        value={password}
        onChangeText={setPassword}
      />

      {/* Forgot password */}
      <Pressable
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.link}>
          Forgot your password?
        </Text>
      </Pressable>

      {/* Log in */}
      <PrimaryButton
        label="Log in"
        onPress={() => navigation.navigate('Home')}
        style={styles.main}
      />

      <Divider />

      {/* Create account */}
      <SecondaryButton
        label="Create account"
        onPress={() => navigation.navigate('Register')}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  link: {
    color: colors.teal,
    textDecorationLine: 'underline',
    fontSize: 12,
  },

  main: {
    marginTop: 28,
  },
});