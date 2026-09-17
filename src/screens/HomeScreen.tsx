import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { WeekWheel } from '../components/WeekWheel';
import { BottomNav } from '../components/BottomNav';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const schedule = [
  { time: '08:00', label: 'Morning medication' },
  { time: '13:00', label: 'Afternoon medication' },
  { time: '20:00', label: 'Evening medication' },
];

export function HomeScreen({ navigation }: Props) {
  const navigateTab = (tab: 'Home' | 'Medications' | 'History' | 'Profile') => {
    if (tab !== 'Home') navigation.navigate(tab);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={25} color={colors.navy} />
            </View>

            <View style={styles.identity}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>Alexandra Popescu</Text>
                <Ionicons name="chevron-down" size={17} color={colors.navy} />
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusText}>● ADMO Box</Text>
                <Text style={styles.connected}>● Connected</Text>
              </View>
            </View>

            <Pressable style={styles.bell} onPress={() => navigation.navigate('Notifications')}>
              <Ionicons name="notifications-outline" size={23} color={colors.navy} />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>

          <View style={styles.nextCard}>
            <View>
              <Text style={styles.cardLabel}>Next medication</Text>
              <Text style={styles.nextTime}>08:00</Text>
              <Text style={styles.medicationLabel}>Morning medication</Text>
            </View>
            <View style={styles.clockCircle}>
              <Ionicons name="time-outline" size={21} color={colors.teal} />
            </View>
          </View>

          <WeekWheel />

          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.cardLabel}>Today's schedule</Text>
              <Pressable onPress={() => navigation.navigate('Schedule')}>
                <Text style={styles.viewAll}>View all</Text>
              </Pressable>
            </View>
            {schedule.map((item, index) => (
              <View key={item.time} style={[styles.scheduleRow, index > 0 && styles.rowBorder]}>
                <Text style={styles.scheduleTime}>{item.time}</Text>
                <Text style={styles.scheduleLabel}>{item.label}</Text>
              </View>
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
  content: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 18 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#DFF5F3', alignItems: 'center', justifyContent: 'center' },
  identity: { flex: 1, marginLeft: 10 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  name: { color: colors.navy, fontSize: 16, fontWeight: '800' },
  statusRow: { flexDirection: 'row', gap: 9, marginTop: 4 },
  statusText: { color: '#657D9E', fontSize: 10 },
  connected: { color: '#0AA66F', fontSize: 10 },
  bell: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E8EFF2' },
  notificationDot: { position: 'absolute', right: 9, top: 8, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.tealBright, borderWidth: 1, borderColor: '#FFFFFF' },
  nextCard: { minHeight: 106, borderRadius: 16, backgroundColor: '#FFFFFF', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#6C8399', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  cardLabel: { color: colors.navy, fontSize: 13, fontWeight: '700' },
  nextTime: { color: colors.teal, fontSize: 27, fontWeight: '700', marginTop: 6 },
  medicationLabel: { color: '#7187A6', fontSize: 11, marginTop: 2 },
  clockCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E6F8F7', alignItems: 'center', justifyContent: 'center' },
  scheduleCard: { borderRadius: 16, backgroundColor: '#FFFFFF', paddingHorizontal: 15, paddingTop: 14, marginTop: 8, shadowColor: '#6C8399', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  scheduleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8 },
  viewAll: { color: colors.teal, fontSize: 11 },
  scheduleRow: { minHeight: 42, flexDirection: 'row', alignItems: 'center' },
  rowBorder: { borderTopWidth: 1, borderTopColor: '#EEF2F4' },
  scheduleTime: { width: 54, color: colors.navy, fontSize: 11, fontWeight: '700' },
  scheduleLabel: { flex: 1, color: '#667E9F', fontSize: 10 },
});