import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { BottomNav } from '../components/BottomNav';
import { colors } from '../theme/colors';
import { getHistory } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;
type Filter = 'All' | 'Taken' | 'Late' | 'Missed';

function statusColor(s: string) {
  return s === 'Taken' ? '#32C451' : s === 'Late' ? '#FFA62B' : '#F0524B';
}
function statusTextColor(s: string) {
  return s === 'Taken' ? '#23A53D' : s === 'Late' ? '#E88A13' : '#E53F3A';
}
function statusIcon(s: string): keyof typeof Ionicons.glyphMap {
  return s === 'Taken' ? 'checkmark' : s === 'Late' ? 'time-outline' : 'close';
}

export function HistoryScreen({ navigation }: Props) {
  const [filter, setFilter] = useState<Filter>('All');
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    setLoading(true);
    getHistory()
      .then((data) => setRecords(data.history || []))
      .catch((err) => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  }, []));

  const nav = (t: 'Home' | 'Medications' | 'History' | 'Profile') => {
    if (t !== 'History') navigation.navigate(t);
  };

  const groupByDate = (rows: any[]) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const groups: Record<string, any[]> = {};
    for (const r of rows) {
      const label = r.date === today ? 'Today' : r.date === yesterday ? 'Yesterday' : r.date;
      if (!groups[label]) groups[label] = [];
      groups[label].push(r);
    }
    return groups;
  };

  const visible = filter === 'All' ? records : records.filter((r) => r.status === filter);
  const groups = groupByDate(visible);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.page}>
        <ScrollView contentContainerStyle={s.content}>
          <Text style={s.title}>History</Text>
          <View style={s.filters}>
            {(['All', 'Taken', 'Late', 'Missed'] as Filter[]).map((x) => (
              <Pressable key={x} onPress={() => setFilter(x)} style={[s.filter, filter === x && s.active]}>
                <Text style={[s.filterText, filter === x && s.activeText]}>{x}</Text>
              </Pressable>
            ))}
          </View>

          {loading ? (
            <ActivityIndicator color={colors.teal} style={{ marginTop: 40 }} />
          ) : Object.keys(groups).length === 0 ? (
            <Text style={s.empty}>No history found.</Text>
          ) : (
            Object.entries(groups).map(([label, rows]) => (
              <View key={label}>
                <Text style={s.section}>{label}</Text>
                <View style={s.card}>
                  {rows.map((r, i) => (
                    <View key={r.id} style={[s.row, i > 0 && s.border]}>
                      <View style={[s.statusDot, { backgroundColor: statusColor(r.status) }]}>
                        <Ionicons name={statusIcon(r.status)} size={19} color="#FFF" />
                      </View>
                      <Text style={s.time}>{r.scheduled_time}</Text>
                      <View style={s.med}>
                        <Text style={s.medName}>{r.medication_name || r.medication_id}</Text>
                        <Text style={s.meta}>{r.taken_at ? `Taken at ${r.taken_at}` : r.date}</Text>
                      </View>
                      <Text style={[s.badge, { color: statusTextColor(r.status) }]}>{r.status}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))
          )}
        </ScrollView>
        <BottomNav active="History" onNavigate={nav} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  page: { flex: 1, backgroundColor: '#F9FEFF' },
  content: { padding: 22, paddingBottom: 28 },
  title: { textAlign: 'center', fontSize: 21, fontWeight: '800', color: colors.navy, marginTop: 10 },
  filters: { flexDirection: 'row', gap: 8, marginTop: 28 },
  filter: { flex: 1, height: 38, borderRadius: 10, backgroundColor: '#F0F5F8', alignItems: 'center', justifyContent: 'center' },
  active: { backgroundColor: colors.teal },
  filterText: { fontSize: 10, fontWeight: '700', color: colors.navy },
  activeText: { color: '#FFF' },
  empty: { textAlign: 'center', color: '#8197B4', fontSize: 13, marginTop: 40 },
  section: { fontSize: 14, fontWeight: '800', color: colors.navy, marginTop: 25, marginBottom: 12 },
  card: { backgroundColor: '#FFF', borderRadius: 15, borderWidth: 1, borderColor: '#E9F0F3', overflow: 'hidden' },
  row: { minHeight: 80, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  border: { borderTopWidth: 1, borderTopColor: '#E9EEF2' },
  statusDot: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  time: { width: 54, marginLeft: 12, fontSize: 12, fontWeight: '800', color: colors.navy },
  med: { flex: 1 },
  medName: { fontSize: 11, fontWeight: '800', color: colors.navy },
  meta: { fontSize: 9, color: '#7188AD', marginTop: 5 },
  badge: { fontSize: 10, fontWeight: '700', backgroundColor: '#F5FAF8', paddingHorizontal: 7, paddingVertical: 5, borderRadius: 6 },
});
