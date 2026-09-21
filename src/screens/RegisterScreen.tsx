import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { PrimaryButton } from '../components/Buttons';
import { Divider } from '../components/Divider';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { register } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!accepted) {
      Alert.alert('Error', 'Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, dateOfBirth);
      navigation.navigate('AccountCreated');
    } catch (err: any) {
      Alert.alert('Registration failed', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      bubbles
      title="Create your account"
      subtitle={'Join ADMO and take control\nof your medication.'}
    >
      <AuthInput
        icon="person-outline"
        placeholder="Full name"
        value={name}
        onChangeText={setName}
      />

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

      <AuthInput
        icon="lock-closed-outline"
        placeholder="Confirm password"
        password
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <AuthInput
        icon="calendar-outline"
        placeholder="Date of birth (e.g. 01/01/2000)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />

      <Pressable style={styles.checkRow} onPress={() => setAccepted((v) => !v)}>
        <Ionicons
          name={accepted ? 'checkmark-circle' : 'ellipse-outline'}
          size={21}
          color={colors.teal}
        />
        <Text style={styles.terms}>
          I agree to the{' '}
          <Text style={styles.link}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </Pressable>

      <PrimaryButton
        label={loading ? 'Creating account...' : 'Create account'}
        onPress={handleRegister}
        style={styles.button}
      />

      <Divider />

      <View style={styles.loginRow}>
        <Text style={styles.muted}>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.login}>Log in</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  terms: {
    fontSize: 11,
    color: colors.textMuted,
    flex: 1,
  },
  link: {
    color: colors.teal,
  },
  button: {
    marginTop: 20,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  muted: {
    color: colors.textMuted,
    fontSize: 12,
  },
  login: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: '700',
  },
});
