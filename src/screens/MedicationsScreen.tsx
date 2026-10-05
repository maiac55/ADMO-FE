import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { BottomNav } from '../components/BottomNav';
import { colors } from '../theme/colors';
import { getMedications, updateMedication } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'Medications'>;
type Filter = 'All' | 'Active' | 'Inactive';

const iconColors = [colors.teal, '#4456D9', '#E83E8C', '#258BEA'];
const iconBgs = ['#E2F6F4', '#F0EDFF', '#FDEAF2', '#E9F4FD'];

export function MedicationsScreen({ navigation }: Props) {
  const [filter, setFilter] = useState<Filter>('All');
  const [medications, setMedications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    setLoading(true);
    getMedications()
      .then((data) => setMedications(data.medications || []))
      .catch((err) => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  }, []));

  const navigateTab = (tab: 'Home' | 'Medications' | 'History' | 'Profile') => {
    if (tab !== 'Medications') navigation.navigate(tab);
  };

  const toggleActive = async (med: any) => {
    const newActive = !med.active;
    setMedications((prev) => prev.map((m) => m.id === med.id ? { ...m, active: newActive } : m));
    try {
      await updateMedication(med.id, { active: newActive });
    } catch (err: any) {
      setMedications((prev) => prev.map((m) => m.id === med.id ? { ...m, active: med.active } : m));
      Alert.alert('Error', err.message);
    }
  };

  const visible = medications.filter((m) =>
    filter === 'All' || (filter === 'Active' ? m.active : !m.active)
  );

  const scheduleText = (med: any) => {
    const times = med.times || [];
    if (times.length === 0) return med.dose;
    const timeList = times.map((t: any) => t.time).join(', ');
    return `${times.length} time${times.length > 1 ? 's' : ''} a day  •  ${timeList}`;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Medications</Text>
          <Text style={styles.subtitle}>Manage all your medications in one place.</Text>

          <View style={styles.filters}>
            {(['All', 'Active', 'Inactive'] as Filter[]).map((item) => (
              <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]}>
                <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {loading ? (
            <ActivityIndicator color={colors.teal} style={{ marginTop: 40 }} />
          ) : (
            <View style={styles.list}>
              {visible.length === 0 ? (
                <Text style={styles.empty}>No medications found.</Text>
              ) : visible.map((med, index) => (
                <Pressable key={med.id} style={styles.card}>
                  <View style={[styles.iconCircle, { backgroundColor: iconBgs[index % iconBgs.length] }]}>
                    <Ionicons name="bandage-outline" size={25} color={iconColors[index % iconColors.length]} />
                  </View>
                  <View style={styles.medInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.medName} numberOfLines={1}>{med.name}</Text>
                      <TouchableOpacity
                        style={[styles.status, !med.active && styles.statusInactive]}
                        onPress={() => toggleActive(med)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.statusText, !med.active && styles.statusTextInactive]}>
                          {med.active ? 'Active' : 'Inactive'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.dose}>{med.dose}</Text>
                    <View style={styles.scheduleRow}>
                      <Ionicons name="time-outline" size={16} color="#829BC6" />
                      <Text style={styles.schedule}>{scheduleText(med)}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={19} color="#829BC6" />
                </Pressable>
              ))}
            </View>
          )}

          <View style={styles.spacer} />
          <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddMedication')}>
            <Text style={styles.addText}>Add medication</Text>
          </Pressable>
        </ScrollView>
        <BottomNav active="Medications" onNavigate={navigateTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  page: { flex: 1, backgroundColor: '#F9FEFF' },
  content: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 24, flexGrow: 1 },
  title: { fontSize: 28, fontWeight: '800', color: colors.navy },
  subtitle: { fontSize: 12, color: '#8197B4', marginTop: 4 },
  filters: { flexDirection: 'row', backgroundColor: '#F0F6F8', borderRadius: 14, padding: 3, marginTop: 26 },
  filter: { flex: 1, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  filterActive: { backgroundColor: colors.teal },
  filterText: { fontSize: 12, color: '#7188AD' },
  filterTextActive: { color: '#FFFFFF', fontWeight: '700' },
  list: { gap: 10, marginTop: 18 },
  empty: { textAlign: 'center', color: '#8197B4', fontSize: 13, marginTop: 40 },
  card: { minHeight: 100, borderWidth: 1, borderColor: '#E1ECF1', borderRadius: 15, backgroundColor: '#FCFEFF', paddingHorizontal: 14, paddingVertical: 14, flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  medInfo: { flex: 1, minWidth: 0 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  medName: { flex: 1, color: colors.navy, fontSize: 14, fontWeight: '700' },
  dose: { color: '#7289AD', fontSize: 11, marginTop: 3 },
  scheduleRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 9 },
  schedule: { color: '#8298BC', fontSize: 10, flexShrink: 1 },
  status: { backgroundColor: '#E1F6F3', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 5 },
  statusInactive: { backgroundColor: '#F0F4F8' },
  statusText: { color: colors.teal, fontSize: 10, fontWeight: '700' },
  statusTextInactive: { color: '#8B9CB6' },
  spacer: { flex: 1, minHeight: 36 },
  addButton: { height: 54, borderRadius: 15, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center', marginTop: 22 },
  addText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
