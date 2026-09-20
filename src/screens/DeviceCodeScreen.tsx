import React, { useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { AddBoxProgress } from '../components/AddBoxProgress';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceCode'>;

export function DeviceCodeScreen({ navigation }: Props) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const updateCharacter = (value: string, index: number) => {
    const character = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(-1);
    const next = [...code];
    next[index] = character;
    setCode(next);
    if (character && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const complete = code.every(Boolean);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.content}>
        <Pressable onPress={() => navigation.goBack()} style={s.back}>
          <Ionicons name="arrow-back" size={25} color={colors.navy} />
        </Pressable>

        <AddBoxProgress step={1} />

        <Text style={s.title}>Enter device code</Text>
        <Text style={s.subtitle}>
          Enter the 6-character code found on your ADMO Box to connect it to your account.
        </Text>

        <View style={s.codeRow}>
          {code.map((character, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputs.current[index] = ref; }}
              value={character}
              onChangeText={(value) => updateCharacter(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={1}
              keyboardType="default"
              style={[s.codeInput, character && s.codeInputFilled]}
              selectionColor={colors.teal}
              returnKeyType={index === 5 ? 'done' : 'next'}
            />
          ))}
        </View>

        <View style={s.info}>
          <Ionicons name="information-circle-outline" size={25} color={colors.teal} />
          <View style={s.infoText}>
            <Text style={s.infoTitle}>Where can I find my code?</Text>
            <Text style={s.infoBody}>
              The device code is located on a sticker at the bottom of your ADMO Box, next to the QR code.
            </Text>
          </View>
        </View>

        <View style={s.spacer} />

        <Pressable
          disabled={!complete}
          onPress={() => navigation.navigate('PersonInfo')}
          style={[s.connect, !complete && s.connectDisabled]}
        >
          <Text style={[s.connectText, !complete && s.connectTextDisabled]}>Connect</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 14, paddingBottom: 26 },
  back: { width: 44, height: 44, justifyContent: 'center', marginLeft: -7 },
  title: { color: colors.navy, fontSize: 30, fontWeight: '800', textAlign: 'center', marginTop: 30 },
  subtitle: { color: '#687DA3', fontSize: 15, lineHeight: 23, textAlign: 'center', marginTop: 12, paddingHorizontal: 14 },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginTop: 50 },
  codeInput: {
    flex: 1, minWidth: 0, height: 64, borderWidth: 1.5, borderColor: '#DCE6EC',
    borderRadius: 14, backgroundColor: '#FBFDFE', color: colors.navy,
    textAlign: 'center', fontSize: 24, fontWeight: '600'
  },
  codeInputFilled: { borderColor: colors.teal, backgroundColor: '#F7FFFF' },
  info: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginTop: 34,
    paddingHorizontal: 18, paddingVertical: 18, borderRadius: 18, backgroundColor: '#F1F9FA'
  },
  infoText: { flex: 1 },
  infoTitle: { color: colors.navy, fontSize: 15, fontWeight: '700', marginBottom: 5 },
  infoBody: { color: '#687DA3', fontSize: 13, lineHeight: 19 },
  spacer: { flex: 1, minHeight: 32 },
  connect: {
    height: 56, borderRadius: 28, backgroundColor: colors.teal,
    alignItems: 'center', justifyContent: 'center'
  },
  connectDisabled: { backgroundColor: '#D7EEEE' },
  connectText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  connectTextDisabled: { color: '#8EBDBD' },
});
