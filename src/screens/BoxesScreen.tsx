import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { getAllBoxes } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'Boxes'>;
type Filter = 'All' | 'Connected' | 'Attention' | 'Inactive';

export function BoxesScreen({ navigation }: Props) {
  const [filter, setFilter] = useState<Filter>('All');
  const [q, setQ] = useState('');
  const [boxes, setBoxes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    setLoading(true);
    getAllBoxes()
      .then((data) => setBoxes(data.boxes || []))
      .catch((err) => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  }, []));

  const getInitials = (name: string) =>
    name.split(' ').map((x) => x[0] || '').join('').slice(0, 2).toUpperCase();

  const visible = boxes.filter((p) =>
    (filter === 'All' || p.status === filter) &&
    (p.person_name || '').toLowerCase().includes(q.toLowerCase())
  );

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.head}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color={colors.navy} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={s.title}>ADMO Boxes</Text>
            <Text style={s.sub}>Manage all boxes connected to your account.</Text>
          </View>
        </View>

        <View style={s.search}>
          <Ionicons name="search-outline" size={19} color="#7890B1" />
          <TextInput value={q} onChangeText={setQ} placeholder="Search users..." placeholderTextColor="#93A3BA" style={s.input} />
        </View>

        <View style={s.filters}>
          {(['All', 'Connected', 'Attention', 'Inactive'] as Filter[]).map((x) => (
            <Pressable key={x} style={[s.filter, filter === x && s.filterOn]} onPress={() => setFilter(x)}>
              <Text style={[s.ft, filter === x && s.ftOn]}>{x}</Text>
            </Pressable>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator color={colors.teal} style={{ marginTop: 40 }} />
        ) : (
          <>
            <Text style={s.label}>Box users ({visible.length})</Text>
            <View style={{ gap: 10 }}>
              {visible.length === 0 ? (
                <Text style={s.empty}>No boxes found. Add one below.</Text>
              ) : visible.map((p) => (
                <Pressable
                  key={p.id}
                  style={s.card}
                  onPress={() => navigation.navigate('BoxProfile', {
                    id: p.id,
                    name: p.person_name || 'Unknown',
                    age: p.person_age || '',
                    note: p.note || '',
                    status: 'Connected',
                  })}
                >
                  <View style={s.avatar}>
                    <Text style={s.initials}>{getInitials(p.person_name || p.device_code)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.name}>{p.person_name || p.device_code}</Text>
                    <View style={s.meta}>
                      <Text style={s.id}>{p.device_code}</Text>
                      <Text style={s.connected}>● Connected</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#7890B1" />
                </Pressable>
              ))}
            </View>
          </>
        )}

        <Pressable style={s.add} onPress={() => navigation.navigate('ConnectBox')}>
          <Text style={s.addText}>＋  Add new user / ADMO Box</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 22, paddingBottom: 34, backgroundColor: '#F9FEFF', flexGrow: 1 },
  head: { flexDirection: 'row', gap: 14, alignItems: 'center', marginTop: 8 },
  title: { fontSize: 25, fontWeight: '800', color: colors.navy },
  sub: { fontSize: 11, color: '#7A90AF', marginTop: 3 },
  search: { height: 48, borderWidth: 1, borderColor: '#DFE8ED', borderRadius: 12, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, gap: 8, marginTop: 22 },
  input: { flex: 1, fontSize: 14, color: colors.navy },
  filters: { flexDirection: 'row', gap: 7, marginTop: 14 },
  filter: { flex: 1, minHeight: 36, borderRadius: 9, borderWidth: 1, borderColor: '#E2EAEE', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  filterOn: { backgroundColor: colors.teal, borderColor: colors.teal },
  ft: { fontSize: 9, color: '#7287A7' },
  ftOn: { color: '#fff', fontWeight: '700' },
  label: { fontSize: 12, fontWeight: '800', color: colors.navy, marginTop: 24, marginBottom: 10 },
  empty: { textAlign: 'center', color: '#8197B4', fontSize: 13, marginTop: 20 },
  card: { minHeight: 80, borderRadius: 14, borderWidth: 1, borderColor: '#E4ECEF', backgroundColor: '#fff', padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E1F5F3', alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.teal, fontSize: 17, fontWeight: '800' },
  name: { fontSize: 13, fontWeight: '800', color: colors.navy },
  meta: { flexDirection: 'row', gap: 9, marginTop: 4 },
  id: { fontSize: 10, color: '#7186A5' },
  connected: { fontSize: 10, color: '#0AA66F' },
  add: { height: 52, borderRadius: 13, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.teal, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  addText: { color: colors.teal, fontWeight: '700', fontSize: 13 },
});
