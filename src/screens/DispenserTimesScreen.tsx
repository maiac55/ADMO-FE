import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { getDispenserSlots, saveDispenserSlots, sendTestAlert } from '../api';

type Props = NativeStackScreenProps<RootStackParamList, 'DispenserTimes'>;
type SlotKey = 'morning' | 'noon' | 'evening';

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const SLOTS: { key: SlotKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'morning', label: 'Morning', icon: 'sunny-outline' },
  { key: 'noon', label: 'Noon', icon: 'partly-sunny-outline' },
  { key: 'evening', label: 'Evening', icon: 'moon-outline' },
];

export function DispenserTimesScreen({ navigation }: Props) {
  const [times, setTimes] = useState<Record<SlotKey, string>>({ morning: '08:00', noon: '13:00', evening: '20:00' });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getDispenserSlots()
      .then((data) => {
        const next = { ...times };
        for (const s of data.slots) next[s.slot as SlotKey] = s.time;
        setTimes(next);
      })
      .catch((err) => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    for (const s of SLOTS) {
      if (!TIME_RE.test(times[s.key])) {
        Alert.alert('Invalid time', `${s.label}: use HH:MM, e.g. 08:00`);
        return;
      }
    }
    setBusy(true);
    try {
      await saveDispenserSlots(times);
      Alert.alert('Saved', 'Dispenser times updated.');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleTest = async () => {
    try {
      const data = await sendTestAlert();
      Alert.alert(
        data.sent ? 'Alert sent' : 'Box not connected',
        data.sent ? 'The LED should blink now.' : 'Check the USB cable / COM port on the PC.',
      );
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <View style={s.topbar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.teal} />
          </Pressable>
          <Text style={s.title}>Dispenser times</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={s.subtitle}>The box rotates once at each of these 3 times (24h format, HH:MM).</Text>

        {loading ? (
          <ActivityIndicator color={colors.teal} style={{ marginTop: 40 }} />
        ) : (
          <>
            <View style={s.card}>
              {SLOTS.map((slot, i) => (
                <View key={slot.key} style={[s.row, i > 0 && s.border]}>
                  <Ionicons name={slot.icon} size={22} color={colors.teal} />
                  <Text style={s.label}>{slot.label}</Text>
                  <TextInput
                    style={s.input}
                    value={times[slot.key]}
                    onChangeText={(t) => setTimes((prev) => ({ ...prev, [slot.key]: t }))}
                    placeholder="08:00"
                    maxLength={5}
                    keyboardType="numbers-and-punctuation"
                  />
                </View>
              ))}
            </View>

            <Pressable style={[s.save, busy && { opacity: 0.6 }]} onPress={handleSave} disabled={busy}>
              <Text style={s.saveText}>{busy ? 'Saving...' : 'Save times'}</Text>
            </Pressable>

            <Pressable style={s.test} onPress={handleTest}>
              <Ionicons name="flash-outline" size={19} color={colors.teal} />
              <Text style={s.testText}>Send test alert now</Text>
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
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: '800', color: colors.navy },
  subtitle: { textAlign: 'center', color: '#7F95B2', fontSize: 12, marginTop: 8, marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 15, borderWidth: 1, borderColor: '#E8F0F3', overflow: 'hidden' },
  row: { minHeight: 68, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 12 },
  border: { borderTopWidth: 1, borderTopColor: '#EEF3F5' },
  label: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.navy },
  input: { width: 84, height: 42, borderWidth: 1, borderColor: '#DDE8EE', borderRadius: 10, textAlign: 'center', fontSize: 16, fontWeight: '700', color: colors.navy },
  save: { height: 52, borderRadius: 14, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  saveText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  test: { height: 52, borderRadius: 14, borderWidth: 1.5, borderColor: colors.teal, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  testText: { color: colors.teal, fontSize: 15, fontWeight: '700' },
});
