import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export function AddBoxProgress({ step }: { step: 1 | 2 | 3 }) {
  const labels = ['Connect', 'Person info', 'Done'];

  return (
    <View style={s.wrap}>
      <View style={s.lines}>
        <View style={[s.segment, step >= 2 && s.segmentActive]} />
        <View style={[s.segment, step >= 3 && s.segmentActive]} />
      </View>

      <View style={s.row}>
        {labels.map((label, index) => {
          const number = index + 1;
          const complete = number < step;
          const active = number <= step;

          return (
            <View key={label} style={s.item}>
              <View style={[s.circle, active && s.circleActive]}>
                {complete ? (
                  <Ionicons name="checkmark" size={13} color="white" />
                ) : (
                  <Text style={[s.number, active && s.numberActive]}>{number}</Text>
                )}
              </View>
              <Text style={[s.label, active && s.labelActive]}>{label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginTop: 10, marginBottom: 22, position: 'relative' },
  lines: {
    position: 'absolute',
    top: 10,
    left: '16.67%',
    right: '16.67%',
    height: 2,
    flexDirection: 'row',
  },
  segment: {
    flex: 1,
    height: 2,
    backgroundColor: '#D7DEE3',
  },
  segmentActive: {
    backgroundColor: colors.teal,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  item: { width: '33.33%', alignItems: 'center' },
  circle: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: '#D7DEE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: { backgroundColor: colors.teal },
  number: { color: 'white', fontSize: 11, fontWeight: '700' },
  numberActive: { color: 'white' },
  label: { marginTop: 6, fontSize: 11, color: '#9AA3AE' },
  labelActive: { color: colors.teal },
});
