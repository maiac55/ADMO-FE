import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { Divider } from '../components/Divider';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { login } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigation.navigate('Home');
    } catch (err: any) {
      Alert.alert('Login failed', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome to ADMO"
      subtitle={'Your health, simplified.\nLog in to continue or create a new account.'}
    >
      <AuthInput
        icon="mail-outline"
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <AuthInput
        icon="lock-closed-outline"
        placeholder="Password"
        password
        value={password}
        onChangeText={setPassword}
      />

      <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Forgot your password?</Text>
      </Pressable>

      <PrimaryButton
        label={loading ? 'Logging in...' : 'Log in'}
        onPress={handleLogin}
        style={styles.main}
      />

      <Divider />

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
