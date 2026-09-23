import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;
type ToggleKey = 'reminders' | 'taken' | 'missed' | 'refill' | 'disconnected' | 'mechanical';

const notificationTypes: { key: ToggleKey; icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string }[] = [
  { key: 'reminders', icon: 'notifications-outline', title: 'Medication reminders', subtitle: 'Remind me before release time' },
  { key: 'taken', icon: 'medical-outline', title: 'Medication taken', subtitle: 'When a dose is taken' },
  { key: 'missed', icon: 'time-outline', title: 'Missed dose', subtitle: 'If a dose is missed' },
  { key: 'refill', icon: 'medkit-outline', title: 'Refill alert', subtitle: 'When disks are running low' },
  { key: 'disconnected', icon: 'wifi-outline', title: 'Device disconnected', subtitle: 'When connection is lost' },
  { key: 'mechanical', icon: 'settings-outline', title: 'Mechanical error', subtitle: 'If a module is blocked or stuck' },
];

const frequencies = [
  { key: 'every', icon: 'notifications-outline' as const, title: 'Every dose', subtitle: 'Get notified for every release' },
  { key: 'daily', icon: 'time-outline' as const, title: 'Daily summary', subtitle: 'Get one summary per day' },
  { key: 'important', icon: 'cloud-outline' as const, title: 'Only important alerts', subtitle: 'Get notified only for missed doses and errors' },
];

export function NotificationsScreen({ navigation }: Props) {
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({ reminders: true, taken: false, missed: true, refill: true, disconnected: true, mechanical: true });
  const [frequency, setFrequency] = useState('daily');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topbar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Ionicons name="arrow-back" size={24} color={colors.teal} />
          </Pressable>
          <Text style={styles.title}>Notifications</Text>
          <View style={styles.back} />
        </View>
        <Text style={styles.subtitle}>Choose what you want to be notified about.</Text>

        <Section title="Notification types" subtitle="Manage the alerts you want to receive.">
          {notificationTypes.map((item, index) => (
            <View key={item.key} style={[styles.settingRow, index > 0 && styles.rowBorder]}>
              <View style={styles.iconCircle}><Ionicons name={item.icon} size={22} color={colors.teal} /></View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
              <Switch
                value={toggles[item.key]}
                onValueChange={(value) => setToggles((current) => ({ ...current, [item.key]: value }))}
                trackColor={{ false: '#DCE5EE', true: colors.teal }}
              />
            </View>
          ))}
        </Section>

        <Section title="Notification frequency" subtitle="Choose how often you want to be notified.">
          {frequencies.map((item, index) => (
            <Pressable key={item.key} onPress={() => setFrequency(item.key)} style={[styles.settingRow, index > 0 && styles.rowBorder]}>
              <View style={styles.iconCircle}><Ionicons name={item.icon} size={22} color={colors.teal} /></View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={[styles.radio, frequency === item.key && styles.radioActive]}>
                {frequency === item.key ? <View style={styles.radioDot} /> : null}
              </View>
            </Pressable>
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      <View style={styles.rows}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FEFF' },
  content: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 30 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { width: 38, height: 38, justifyContent: 'center' },
  title: { color: colors.navy, fontSize: 20, fontWeight: '800' },
  subtitle: { textAlign: 'center', color: '#7F95B2', fontSize: 11, marginTop: 2, marginBottom: 14 },
  section: { borderWidth: 1, borderColor: '#DDEBF0', borderRadius: 16, backgroundColor: '#FBFEFF', padding: 12, marginBottom: 12 },
  sectionTitle: { color: colors.navy, fontSize: 13, fontWeight: '700' },
  sectionSubtitle: { color: '#8AA0BC', fontSize: 10, marginTop: 3, marginBottom: 8 },
  rows: { borderWidth: 1, borderColor: '#E5EEF2', borderRadius: 15, overflow: 'hidden', backgroundColor: '#FFFFFF' },
  settingRow: { minHeight: 65, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
  rowBorder: { borderTopWidth: 1, borderTopColor: '#E8EFF2' },
  iconCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#E6F8F7', alignItems: 'center', justifyContent: 'center' },
  settingText: { flex: 1, marginLeft: 10 },
  settingTitle: { color: colors.navy, fontSize: 12, fontWeight: '700' },
  settingSubtitle: { color: '#8197B4', fontSize: 9, marginTop: 3 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#7A9AC0', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: colors.teal },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.teal },
});