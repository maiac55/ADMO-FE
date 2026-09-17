import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { BottomNav } from '../components/BottomNav';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Schedule'>;

const days = [
  { day: 'Mon', date: '8' }, { day: 'Tue', date: '9' }, { day: 'Wed', date: '10' },
  { day: 'Thu', date: '11' }, { day: 'Fri', date: '12' }, { day: 'Sat', date: '13' }, { day: 'Sun', date: '14' },
];

const meds = [
  { time: '08:00', name: 'Paracetamol 500 mg', amount: '2 tablets', label: 'Morning medication', icon: 'medical-outline' as const, bg: '#E8F7F5' },
  { time: '13:00', name: 'Ibuprofen 200 mg', amount: '1 tablet', label: 'Afternoon medication', icon: 'medical-outline' as const, bg: '#EDEFFF' },
  { time: '20:00', name: 'Vitamin D3 1000 IU', amount: '1 pill', label: 'Evening medication', icon: 'medical-outline' as const, bg: '#FFE8F0' },
  { time: '22:00', name: 'Melatonin 3 mg', amount: '1 tablet', label: 'Night medication', icon: 'medical-outline' as const, bg: '#E8F5FF' },
];

export function ScheduleScreen({ navigation }: Props) {
  const [selectedDay, setSelectedDay] = useState(0);
  const navigateTab = (tab: 'Home' | 'Persons' | 'History' | 'Profile') => navigation.navigate(tab);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={25} color={colors.teal} /></Pressable>
            <View style={styles.headerText}>
              <Text style={styles.title}>Today's schedule</Text>
              <Text style={styles.subtitle}>Monday, 8 September</Text>
            </View>
            <View style={styles.calendar}><Ionicons name="calendar-outline" size={21} color={colors.teal} /></View>
          </View>

          <View style={styles.daysRow}>
            {days.map((item, index) => (
              <Pressable key={item.day} onPress={() => setSelectedDay(index)} style={[styles.day, selectedDay === index && styles.selectedDay]}>
                <Text style={[styles.dayName, selectedDay === index && styles.selectedText]}>{item.day}</Text>
                <Text style={[styles.dayDate, selectedDay === index && styles.selectedText]}>{item.date}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.medList}>
            {meds.map((med) => (
              <Pressable key={med.time} style={styles.medCard}>
                <Text style={styles.time}>{med.time}</Text>
                <View style={styles.verticalLine} />
                <View style={[styles.medIcon, { backgroundColor: med.bg }]}><Ionicons name={med.icon} size={24} color={colors.teal} /></View>
                <View style={styles.medText}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.amount}>{med.amount}</Text>
                  <Text style={styles.medLabel}>{med.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#7992B4" />
              </Pressable>
            ))}
          </View>
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
});