import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
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
  'ForgotPassword'
>;

export function ForgotPasswordScreen({
  navigation,
}: Props) {
  return (
    <AuthLayout
      bubbles
      title="Reset your password"
      subtitle={
        "Enter your email address and we'll send\nyou a link to reset your password."
      }
    >
      {/* Email input */}
      <AuthInput
        icon="mail-outline"
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Send reset link */}
      <PrimaryButton
        label="Send reset link"
        onPress={() => {}}
        style={styles.button}
      />

      <Divider />

      {/* Back to login */}
      <Pressable
        style={styles.back}
        onPress={() => navigation.navigate('Login')}
      >
        <Ionicons
          name="arrow-back"
          size={18}
          color={colors.teal}
        />

        <Text style={styles.backText}>
          Back to log in
        </Text>
      </Pressable>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },

  back: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: colors.teal,
    fontWeight: '600',
  },
});