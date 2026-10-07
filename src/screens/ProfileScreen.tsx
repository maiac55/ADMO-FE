import React, { useEffect, useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { BottomNav } from '../components/BottomNav';
import { colors } from '../theme/colors';
import { getProfile, logout } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Row = ({ icon, title, sub, onPress }: { icon: keyof typeof Ionicons.glyphMap; title: string; sub?: string; onPress?: () => void }) => (
  <Pressable style={s.row} onPress={onPress}>
    <View style={s.ico}><Ionicons name={icon} size={20} color={colors.teal} /></View>
    <View style={{ flex: 1 }}>
      <Text style={s.rowTitle}>{title}</Text>
      {sub && <Text style={s.rowSub}>{sub}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={18} color="#7890B1" />
  </Pressable>
);

export function ProfileScreen({ navigation }: Props) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    getProfile()
      .then((data) => setUser(data.user))
      .catch((err) => Alert.alert('Error', err.message));
  }, []);

  const nav = (t: 'Home' | 'Medications' | 'History' | 'Profile') => {
    if (t !== 'Profile') navigation.navigate(t);
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.content}>
          <Text style={s.title}>Profile</Text>
          <View style={s.hero}>
            <View style={s.avatar}><Ionicons name="person-outline" size={42} color={colors.teal} /></View>
            <View>
              <Text style={s.name}>{user?.name || '—'}</Text>
              <Text style={s.email}>{user?.email || '—'}</Text>
            </View>
          </View>

          <Text style={s.section}>ACCOUNT</Text>
          <View style={s.card}>
            <Row icon="person-outline" title="Personal information" onPress={() => navigation.navigate('EditProfile')} />
            <Row icon="lock-closed-outline" title="Email & password" onPress={() => navigation.navigate('ChangePassword')} />
          </View>

          <Text style={s.section}>MY ADMO BOXES</Text>
          <View style={s.card}>
            <Row icon="cube-outline" title="Connected ADMO Boxes" onPress={() => navigation.navigate('Boxes')} />
          </View>

          <Text style={s.section}>SETTINGS</Text>
          <View style={s.card}>
            <Row icon="alarm-outline" title="Dispenser times" sub="Morning · Noon · Evening" onPress={() => navigation.navigate('DispenserTimes')} />
            <Row icon="notifications-outline" title="Notifications" onPress={() => navigation.navigate('Notifications')} />
            <Row icon="help-circle-outline" title="Help & support" />
          </View>

          <Pressable style={s.logout} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={19} color={colors.teal} />
            <Text style={s.logoutText}>Log out</Text>
          </Pressable>
        </ScrollView>
        <BottomNav active="Profile" onNavigate={nav} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 22, paddingBottom: 30, backgroundColor: '#F9FEFF', flexGrow: 1 },
  title: { fontSize: 26, fontWeight: '800', color: colors.navy, textAlign: 'center', marginVertical: 10 },
  hero: { backgroundColor: '#fff', borderRadius: 17, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16, borderWidth: 1, borderColor: '#EDF2F4' },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#E8F8F7', alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 17, fontWeight: '800', color: colors.navy },
  email: { fontSize: 12, color: '#7489A8', marginTop: 5 },
  section: { fontSize: 11, fontWeight: '800', color: colors.navy, marginTop: 24, marginBottom: 9 },
  card: { backgroundColor: '#fff', borderRadius: 15, borderWidth: 1, borderColor: '#EDF2F4', overflow: 'hidden' },
  row: { minHeight: 64, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 11, borderBottomWidth: 1, borderBottomColor: '#F0F3F5' },
  ico: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#EAF8F7', alignItems: 'center', justifyContent: 'center' },
  rowTitle: { fontSize: 13, fontWeight: '700', color: colors.navy },
  rowSub: { fontSize: 11, color: '#7489A8', marginTop: 3 },
  logout: { height: 52, borderRadius: 14, backgroundColor: '#EAF8F7', flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 28 },
  logoutText: { color: colors.teal, fontWeight: '700' },
});
