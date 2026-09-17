import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { PrimaryButton } from '../components/Buttons';
import { Divider } from '../components/Divider';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

export function RegisterScreen({
  navigation,
}: Props) {
  const [accepted, setAccepted] = useState(false);

  return (
    <AuthLayout
      bubbles
      title="Create your account"
      subtitle={
        'Join ADMO and take control\nof your medication.'
      }
    >
      {/* Full name */}
      <AuthInput
        icon="person-outline"
        placeholder="Full name"
      />

      {/* Email */}
      <AuthInput
        icon="mail-outline"
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <AuthInput
        icon="lock-closed-outline"
        placeholder="Password"
        password
      />

      {/* Confirm password */}
      <AuthInput
        icon="lock-closed-outline"
        placeholder="Confirm password"
        password
      />

      {/* Date of birth */}
      <AuthInput
        icon="calendar-outline"
        placeholder="Date of birth"
      />

      {/* Terms and conditions */}
      <Pressable
        style={styles.checkRow}
        onPress={() => setAccepted((value) => !value)}
      >
        <Ionicons
          name={
            accepted
              ? 'checkmark-circle'
              : 'ellipse-outline'
          }
          size={21}
          color={colors.teal}
        />

        <Text style={styles.terms}>
          I agree to the{' '}
          <Text style={styles.link}>
            Terms of Service
          </Text>
          {' '}and{' '}
          <Text style={styles.link}>
            Privacy Policy
          </Text>
        </Text>
      </Pressable>

      {/* Create account */}
      <PrimaryButton
        label="Create account"
        onPress={() =>
          navigation.navigate('AccountCreated')
        }
        style={styles.button}
      />

      <Divider />

      {/* Existing account */}
      <View style={styles.loginRow}>
        <Text style={styles.muted}>
          Already have an account?{' '}
        </Text>

        <Pressable
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.login}>
            Log in
          </Text>
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