import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { AuthLayout } from '../components/AuthLayout';
import {
  PrimaryButton,
  SecondaryButton,
} from '../components/Buttons';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AccountCreated'
>;

export function AccountCreatedScreen({
  navigation,
}: Props) {
  return (
    <AuthLayout bubbles>
      {/* Success icon */}
      <View style={styles.success}>
        <View style={styles.halo}>
          <View style={styles.circle}>
            <Ionicons
              name="checkmark"
              size={48}
              color="white"
            />
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Account created!
      </Text>

      {/* Description */}
      <Text style={styles.sub}>
        You're all set. Your account has been successfully
        created and you're now ready to manage your medications.
      </Text>

      {/* Connect ADMO Box */}
      <PrimaryButton
        label="Connect your ADMO Box"
        icon="link-outline"
        onPress={() => navigation.navigate('ConnectBox')}
        style={styles.first}
      />

      {/* Set up later */}
      <SecondaryButton
        label="Set up later"
        icon="time-outline"
        onPress={() => navigation.navigate('Home')}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  success: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },

  halo: {
    width: 98,
    height: 98,
    borderRadius: 49,
    backgroundColor: '#E1F8F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.tealBright,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    textAlign: 'center',
    fontSize: 27,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 10,
  },

  sub: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    paddingHorizontal: 10,
  },

  first: {
    marginTop: 30,
    marginBottom: 14,
  },
});