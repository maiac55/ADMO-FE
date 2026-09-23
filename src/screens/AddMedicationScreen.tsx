import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { addMedication } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMedication'>;

const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const defaultTimes = [
  { label: 'Morning', time: '08:00', pills: 1, enabled: true },
  { label: 'Afternoon', time: '13:00', pills: 1, enabled: true },
  { label: 'Night', time: '20:00', pills: 1, enabled: false },
];

export function AddMedicationScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [dose, setDose] = useState('1 pill per dose');
  const [selected, setSelected] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [times, setTimes] = useState(defaultTimes);
  const [loading, setLoading] = useState(false);

  const toggleDay = (d: string) =>
    setSelected((x) => (x.includes(d) ? x.filter((v) => v !== d) : [...x, d]));

  const toggleTime = (i: number) =>
    setTimes((prev) => prev.map((t, idx) => idx === i ? { ...t, enabled: !t.enabled } : t));

  const adjustPills = (i: number, delta: number) =>
    setTimes((prev) => prev.map((t, idx) => idx === i ? { ...t, pills: Math.max(1, t.pills + delta) } : t));

  const handleSave = async () => {
    if (!name.trim()) { Alert.alert('Error', 'Please enter a medication name'); return; }
    setLoading(true);
    try {
      const boxId = await AsyncStorage.getItem('currentBoxId');
      await addMedication({
        box_id: boxId || undefined,
        name: name.trim(),
        dose: dose.trim(),
        days: selected,
        times: times.filter((t) => t.enabled).map((t) => ({ label: t.label, time: t.time, pills: t.pills })),
        active: true,
      });
      Alert.alert('Success', 'Medication added!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.top}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.teal} />
          </Pressable>
          <View style={s.topText}>
            <Text style={s.title}>Add Medication</Text>
            <Text style={s.subtitle}>Set up the schedule for this medication</Text>
          </View>
          <Pressable style={[s.done, loading && { opacity: 0.6 }]} onPress={handleSave} disabled={loading}>
            <Ionicons name="checkmark" size={22} color="#FFF" />
          </Pressable>
        </View>

        <View style={s.card}>
          <Text style={s.heading}>Medication name</Text>
          <View style={s.input}>
            <Ionicons name="bandage-outline" size={21} color={colors.navy} />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Paracetamol 500 mg"
              placeholderTextColor="#A0B3C8"
              style={s.inputText}
            />
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.heading}>Dose description</Text>
          <View style={s.input}>
            <Ionicons name="medical-outline" size={21} color={colors.navy} />
            <TextInput value={dose} onChangeText={setDose} style={s.inputText} />
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.heading}>Days of the week</Text>
          <Text style={s.help}>Select the days when you take this medication.</Text>
          <View style={s.week}>
            {week.map((d) => (
              <Pressable key={d} onPress={() => toggleDay(d)} style={[s.day, selected.includes(d) && s.dayOn]}>
                <Text style={[s.dayText, selected.includes(d) && s.dayTextOn]}>{d}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {times.map((t, i) => (
          <View key={t.label} style={s.card}>
            <View style={s.doseHead}>
              <Pressable style={[s.toggle, !t.enabled && s.toggleOff]} onPress={() => toggleTime(i)}>
                <View style={[s.knob, t.enabled && s.knobOn]} />
              </Pressable>
              <Ionicons name={i === 2 ? 'moon-outline' : 'sunny-outline'} size={21} color={t.enabled ? colors.teal : colors.navy} />
              <Text style={s.heading}>{t.label}</Text>
            </View>
            {t.enabled && (
              <View style={s.doseRow}>
                <View style={s.field}>
                  <Text style={s.fieldLabel}>Time</Text>
                  <Text style={s.fieldValue}>{t.time}</Text>
                </View>
                <View style={s.field}>
                  <Text style={s.fieldLabel}>Number of pills</Text>
                  <View style={s.pillsRow}>
                    <Pressable onPress={() => adjustPills(i, -1)} style={s.pillBtn}>
                      <Text style={s.pillBtnText}>−</Text>
                    </Pressable>
                    <Text style={s.pillCount}>{t.pills}</Text>
                    <Pressable onPress={() => adjustPills(i, 1)} style={s.pillBtn}>
                      <Text style={s.pillBtnText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}

        <View style={s.info}>
          <Ionicons name="information-circle-outline" size={20} color={colors.teal} />
          <Text style={s.infoText}>This will be added as one medication with the selected schedule. You can add more medications later.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FEFF' },
  content: { padding: 20, paddingBottom: 30 },
  top: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  topText: { flex: 1, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800', color: colors.navy },
  subtitle: { fontSize: 10, color: '#8197B4', marginTop: 3 },
  done: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#FFF', borderRadius: 15, padding: 13, marginBottom: 12, borderWidth: 1, borderColor: '#E8F0F3' },
  heading: { fontSize: 13, fontWeight: '800', color: colors.navy },
  help: { fontSize: 10, color: '#8197B4', marginTop: 4 },
  input: { height: 46, borderWidth: 1, borderColor: '#DDE8EE', borderRadius: 12, marginTop: 8, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' },
  inputText: { flex: 1, color: colors.navy, fontSize: 12, marginLeft: 8 },
  week: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  day: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#F0F5F8', alignItems: 'center', justifyContent: 'center' },
  dayOn: { backgroundColor: colors.teal },
  dayText: { fontSize: 9, color: '#8197B4' },
  dayTextOn: { color: '#FFF', fontWeight: '700' },
  doseHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  toggle: { width: 36, height: 22, borderRadius: 11, backgroundColor: colors.teal, padding: 2 },
  toggleOff: { backgroundColor: '#DCE7EF' },
  knob: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#FFF' },
  knobOn: { alignSelf: 'flex-end' },
  doseRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  field: { flex: 1 },
  fieldLabel: { fontSize: 9, color: '#8197B4', marginBottom: 5 },
  fieldValue: { height: 39, borderWidth: 1, borderColor: '#DDE8EE', borderRadius: 10, padding: 11, color: colors.navy, fontSize: 11 },
  pillsRow: { flexDirection: 'row', alignItems: 'center', height: 39, borderWidth: 1, borderColor: '#DDE8EE', borderRadius: 10, overflow: 'hidden' },
  pillBtn: { width: 36, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5F8' },
  pillBtnText: { fontSize: 18, color: colors.navy, fontWeight: '700' },
  pillCount: { flex: 1, textAlign: 'center', color: colors.navy, fontSize: 14, fontWeight: '700' },
  info: { flexDirection: 'row', gap: 9, backgroundColor: '#EFF9FC', borderRadius: 13, padding: 12 },
  infoText: { flex: 1, fontSize: 9, lineHeight: 14, color: '#7188AD' },
});
