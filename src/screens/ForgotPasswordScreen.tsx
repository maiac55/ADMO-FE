import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { PrimaryButton } from '../components/Buttons';
import { Divider } from '../components/Divider';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { forgotPassword } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword() {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const data = await forgotPassword(email);
      Alert.alert('Done', data.message + (data.resetToken ? `\n\nDemo token: ${data.resetToken}` : ''));
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      bubbles
      title="Reset your password"
      subtitle={"Enter your email address and we'll send\nyou a link to reset your password."}
    >
      <AuthInput
        icon="mail-outline"
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <PrimaryButton
        label={loading ? 'Sending...' : 'Send reset link'}
        onPress={handleForgotPassword}
        style={styles.button}
      />

      <Divider />

      <Pressable style={styles.back} onPress={() => navigation.navigate('Login')}>
        <Ionicons name="arrow-back" size={18} color={colors.teal} />
        <Text style={styles.backText}>Back to log in</Text>
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
