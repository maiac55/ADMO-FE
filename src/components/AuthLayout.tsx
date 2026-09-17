import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthBackground } from './AuthBackground';
import { AdmoLogo } from './AdmoLogo';
import { colors } from '../theme/colors';

type AuthLayoutProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  bubbles?: boolean;
  logo?: boolean;
};

export function AuthLayout({
  title,
  subtitle,
  children,
  bubbles = false,
  logo = true,
}: AuthLayoutProps) {
  return (
    <AuthBackground bubbles={bubbles}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ADMO Logo */}
            {logo && <AdmoLogo />}

            {/* Main content */}
            <View style={styles.content}>
              {/* Title */}
              {title ? (
                <Text style={styles.title}>
                  {title}
                </Text>
              ) : null}

              {/* Subtitle */}
              {subtitle ? (
                <Text style={styles.subtitle}>
                  {subtitle}
                </Text>
              ) : null}

              {/* Screen-specific content */}
              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safe: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 44,
  },

  content: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },

  title: {
    color: colors.navy,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 7,
  },

  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 25,
  },
});