import React, { useEffect, useState } from 'react';
import {
  Alert, Pressable, SafeAreaView, ScrollView,
  StyleSheet, Text, View, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { getProfile } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;

export function ChangePasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProfile(),
      AsyncStorage.getItem('pw'),
    ])
      .then(([data, pw]) => {
        setEmail(data.user?.email || '');
        setPassword(pw || '');
      })
      .catch((err) => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.topbar}>
          <Pressable style={s.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.teal} />
          </Pressable>
          <Text style={s.title}>Email & password</Text>
          <View style={s.backBtn} />
        </View>

        {loading ? (
          <ActivityIndicator color={colors.teal} style={{ marginTop: 60 }} />
        ) : (
          <>
            <Text style={s.sectionLabel}>EMAIL ADDRESS</Text>
            <View style={s.card}>
              <View style={[s.field, { borderBottomWidth: 0 }]}>
                <Text style={s.fieldLabel}>Current email</Text>
                <View style={s.emailRow}>
                  <Text style={s.emailText}>{email}</Text>
                  <View style={s.emailBadge}>
                    <Ionicons name="checkmark" size={11} color={colors.teal} />
                    <Text style={s.emailBadgeText}>Verified</Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={s.sectionLabel}>PASSWORD</Text>
            <View style={s.card}>
              <View style={[s.field, { borderBottomWidth: 0 }]}>
                <Text style={s.fieldLabel}>Current password</Text>
                <View style={s.pwRow}>
                  <Text style={s.pwText}>
                    {showPassword
                      ? (password || '—')
                      : '••••••••••••'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowPassword((v) => !v)}
                    style={s.eyeBtn}
                    activeOpacity={0.5}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color="#8197B4"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 22, paddingBottom: 34, backgroundColor: '#F9FEFF', flexGrow: 1 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: { width: 38, height: 38, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '800', color: colors.navy },
  sectionLabel: { fontSize: 10, fontWeight: '800', color: colors.navy, marginBottom: 8, letterSpacing: 0.5 },
  card: { backgroundColor: '#fff', borderRadius: 15, borderWidth: 1, borderColor: '#E8F0F3', overflow: 'hidden', marginBottom: 16 },
  field: { paddingHorizontal: 14, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#EEF3F5' },
  fieldLabel: { fontSize: 10, color: '#8197B4', fontWeight: '600', marginBottom: 6 },
  emailRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  emailText: { fontSize: 14, color: colors.navy, fontWeight: '600', flex: 1 },
  emailBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#E6F8F7', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  emailBadgeText: { fontSize: 10, color: colors.teal, fontWeight: '700' },
  pwRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pwText: { fontSize: 14, color: colors.navy, fontWeight: '600', letterSpacing: 2 },
  eyeBtn: { padding: 8 },
});
