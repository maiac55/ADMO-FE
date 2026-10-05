import React, { useEffect, useState } from 'react';
import {
  Alert, Pressable, SafeAreaView, ScrollView,
  StyleSheet, Text, TextInput, View, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { getProfile, updateProfile } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export function EditProfileScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile()
      .then((data) => {
        const u = data.user;
        setName(u.name || '');
        setEmail(u.email || '');
        setDob(u.date_of_birth || '');
        if (u.created_at) {
          const d = new Date(u.created_at);
          setMemberSince(d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }));
        }
      })
      .catch((err) => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ name: name.trim(), date_of_birth: dob.trim() || undefined });
      Alert.alert('Saved', 'Your profile has been updated.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.topbar}>
          <Pressable style={s.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.teal} />
          </Pressable>
          <Text style={s.title}>Personal info</Text>
          <View style={s.backBtn} />
        </View>

        {loading ? (
          <ActivityIndicator color={colors.teal} style={{ marginTop: 60 }} />
        ) : (
          <>
            <View style={s.avatarWrap}>
              <View style={s.avatar}>
                <Ionicons name="person-outline" size={42} color={colors.teal} />
              </View>
              <Text style={s.avatarName}>{name || '—'}</Text>
              <Text style={s.avatarEmail}>{email}</Text>
            </View>

            <Text style={s.sectionLabel}>PERSONAL DETAILS</Text>
            <View style={s.card}>
              <View style={s.field}>
                <Text style={s.fieldLabel}>Full name</Text>
                <TextInput
                  style={s.fieldInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor="#C0CDD8"
                />
              </View>

              <View style={s.field}>
                <Text style={s.fieldLabel}>Date of birth</Text>
                <TextInput
                  style={s.fieldInput}
                  value={dob}
                  onChangeText={setDob}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#C0CDD8"
                  keyboardType="numbers-and-punctuation"
                />
              </View>

              <View style={[s.field, { borderBottomWidth: 0 }]}>
                <Text style={s.fieldLabel}>Member since</Text>
                <Text style={[s.fieldInput, { color: '#8197B4' }]}>{memberSince || '—'}</Text>
              </View>
            </View>

            <Pressable
              style={[s.saveBtn, saving && { opacity: 0.6 }]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={s.saveBtnText}>{saving ? 'Saving...' : 'Save changes'}</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 22, paddingBottom: 34, backgroundColor: '#F9FEFF', flexGrow: 1 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  backBtn: { width: 38, height: 38, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '800', color: colors.navy },
  avatarWrap: { alignItems: 'center', paddingVertical: 22 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E6F8F7', alignItems: 'center', justifyContent: 'center' },
  avatarName: { fontSize: 17, fontWeight: '800', color: colors.navy, marginTop: 12 },
  avatarEmail: { fontSize: 12, color: '#7E96B2', marginTop: 4 },
  sectionLabel: { fontSize: 10, fontWeight: '800', color: colors.navy, marginBottom: 8, letterSpacing: 0.5 },
  card: { backgroundColor: '#fff', borderRadius: 15, borderWidth: 1, borderColor: '#E8F0F3', overflow: 'hidden', marginBottom: 16 },
  field: { paddingHorizontal: 14, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#EEF3F5' },
  fieldLabel: { fontSize: 10, color: '#8197B4', fontWeight: '600', marginBottom: 5 },
  fieldInput: { fontSize: 14, color: colors.navy, fontWeight: '600' },
  saveBtn: { height: 52, borderRadius: 14, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
