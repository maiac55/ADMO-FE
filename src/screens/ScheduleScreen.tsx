import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { BottomNav } from '../components/BottomNav';
import { colors } from '../theme/colors';
import { getMedications } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'Schedule'>;

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ICON_COLORS = ['#E8F7F5', '#EDEFFF', '#FFE8F0', '#E8F5FF', '#FFF4E8', '#F0FFE8', '#F8E8FF'];

function buildWeek() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  return DAY_LABELS.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { day: label, date: String(d.getDate()), fullDate: d };
  });
}

const WEEK = buildWeek();

function todayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

function formatSubtitle(d: Date) {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function ScheduleScreen({ navigation, route }: Props) {
  const [selectedDay, setSelectedDay] = useState(route.params?.dayIndex ?? todayIndex());
  const [medications, setMedications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigateTab = (tab: 'Home' | 'Medications' | 'History' | 'Profile') => navigation.navigate(tab);

  const loadMedications = async () => {
    try {
      setLoading(true);
      const data = await getMedications();
      setMedications(data.medications || []);
    } catch {
      setMedications([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadMedications(); }, []));

  const selectedDayLabel = DAY_LABELS[selectedDay];

  // Collect all scheduled times for this day across active medications
  const entries: { time: string; name: string; dose: string; label: string; bg: string }[] = [];
  medications
    .filter((m) => m.active !== false)
    .forEach((med, mi) => {
      const days: string[] = med.days || [];
      if (days.length > 0 && !days.includes(selectedDayLabel)) return;
      const times: { label: string; time: string; pills: number }[] = med.times || [];
      times.forEach((t) => {
        entries.push({
          time: t.time,
          name: med.name,
          dose: `${t.pills} ${t.pills === 1 ? 'pill/tablet' : 'pills/tablets'}`,
          label: t.label || '',
          bg: ICON_COLORS[mi % ICON_COLORS.length],
        });
      });
    });

  entries.sort((a, b) => a.time.localeCompare(b.time));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={25} color={colors.teal} /></Pressable>
            <View style={styles.headerText}>
              <Text style={styles.title}>Today's schedule</Text>
              <Text style={styles.subtitle}>{formatSubtitle(WEEK[selectedDay].fullDate)}</Text>
            </View>
            <View style={styles.calendar}><Ionicons name="calendar-outline" size={21} color={colors.teal} /></View>
          </View>

          <View style={styles.daysRow}>
            {WEEK.map((item, index) => (
              <Pressable key={item.day} onPress={() => setSelectedDay(index)} style={[styles.day, selectedDay === index && styles.selectedDay]}>
                <Text style={[styles.dayName, selectedDay === index && styles.selectedText]}>{item.day}</Text>
                <Text style={[styles.dayDate, selectedDay === index && styles.selectedText]}>{item.date}</Text>
              </Pressable>
            ))}
          </View>

          {loading ? (
            <ActivityIndicator color={colors.teal} style={{ marginTop: 40 }} />
          ) : entries.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="calendar-outline" size={48} color="#C5D5E8" />
              <Text style={styles.emptyText}>No medications scheduled{'\n'}for this day</Text>
              <Pressable style={styles.addBtn} onPress={() => navigation.navigate('AddMedication')}>
                <Text style={styles.addBtnText}>+ Add Medication</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.medList}>
              {entries.map((entry, i) => (
                <Pressable key={i} style={styles.medCard} onPress={() => navigation.navigate('Medications')}>
                  <Text style={styles.time}>{entry.time}</Text>
                  <View style={styles.verticalLine} />
                  <View style={[styles.medIcon, { backgroundColor: entry.bg }]}>
                    <Ionicons name="medical-outline" size={24} color={colors.teal} />
                  </View>
                  <View style={styles.medText}>
                    <Text style={styles.medName}>{entry.name}</Text>
                    <Text style={styles.amount}>{entry.dose}</Text>
                    {entry.label ? <Text style={styles.medLabel}>{entry.label}</Text> : null}
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#7992B4" />
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
        <BottomNav active="Home" onNavigate={navigateTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  page: { flex: 1, backgroundColor: '#F9FEFF' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 25 },
  header: { flexDirection: 'row', alignItems: 'center' },
  headerText: { flex: 1, marginLeft: 8 },
  title: { color: colors.navy, fontSize: 20, fontWeight: '800' },
  subtitle: { color: '#8197B4', fontSize: 10, marginTop: 2 },
  calendar: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#E6F8F7', alignItems: 'center', justifyContent: 'center' },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 20 },
  day: { width: 42, height: 56, borderRadius: 13, backgroundColor: '#F2F7FB', alignItems: 'center', justifyContent: 'center' },
  selectedDay: { backgroundColor: colors.teal },
  dayName: { color: '#6E87A8', fontSize: 9 },
  dayDate: { color: colors.navy, fontSize: 13, fontWeight: '700', marginTop: 4 },
  selectedText: { color: '#FFFFFF' },
  medList: { gap: 12 },
  medCard: { minHeight: 82, borderRadius: 15, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, shadowColor: '#6C8399', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  time: { width: 50, color: colors.teal, fontSize: 14, fontWeight: '700' },
  verticalLine: { width: 1, height: 48, backgroundColor: '#DCE7EC', marginRight: 12 },
  medIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  medText: { flex: 1, marginLeft: 10 },
  medName: { color: colors.navy, fontSize: 12, fontWeight: '700' },
  amount: { color: '#7187A6', fontSize: 9, marginTop: 3 },
  medLabel: { color: '#8BA0BA', fontSize: 9, marginTop: 4 },
  empty: { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText: { color: '#8BA0BA', fontSize: 14, textAlign: 'center', lineHeight: 22 },
  addBtn: { marginTop: 8, backgroundColor: colors.teal, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
