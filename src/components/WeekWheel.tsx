import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;
type Day = (typeof DAYS)[number];

const WHEELS: Record<Day, ImageSourcePropType> = {
  Mo: require('../../assets/wheel-mo.png'),
  Tu: require('../../assets/wheel-tu.png'),
  We: require('../../assets/wheel-we.png'),
  Th: require('../../assets/wheel-th.png'),
  Fr: require('../../assets/wheel-fr.png'),
  Sa: require('../../assets/wheel-sa.png'),
  Su: require('../../assets/wheel-su.png'),
};

const SIZE = 300;
const CX = SIZE / 2;
const CY = SIZE / 2;
const LABEL_R = 110; // radius where day labels sit
const HIT = 44;     // touch zone size

// 7 equal segments, clockwise from top (Mo = 0°)
// Schedule screen day indices: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
const SEGMENTS: { day: Day; scheduleIndex: number; angle: number }[] = [
  { day: 'Mo', scheduleIndex: 0, angle: 0 },
  { day: 'Tu', scheduleIndex: 1, angle: 51.4 },
  { day: 'We', scheduleIndex: 2, angle: 102.9 },
  { day: 'Th', scheduleIndex: 3, angle: 154.3 },
  { day: 'Fr', scheduleIndex: 4, angle: 205.7 },
  { day: 'Sa', scheduleIndex: 5, angle: 257.1 },
  { day: 'Su', scheduleIndex: 6, angle: 308.6 },
];

function toRad(deg: number) { return (deg * Math.PI) / 180; }

type Props = {
  onDayPress?: (scheduleIndex: number) => void;
};

export function WeekWheel({ onDayPress }: Props) {
  const today: Day = DAYS[new Date().getDay()];

  return (
    <View style={styles.wrap}>
      <Image
        source={WHEELS[today]}
        style={styles.wheel}
        resizeMode="contain"
        fadeDuration={0}
        accessibilityLabel={`${today} is today's selected medication day`}
      />

      {SEGMENTS.map(({ day, scheduleIndex, angle }) => {
        const rad = toRad(angle);
        const x = CX + LABEL_R * Math.sin(rad) - HIT / 2;
        const y = CY - LABEL_R * Math.cos(rad) - HIT / 2;
        return (
          <TouchableOpacity
            key={day}
            activeOpacity={0.4}
            onPress={() => onDayPress?.(scheduleIndex)}
            style={[styles.hit, { left: x, top: y, width: HIT, height: HIT }]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    marginVertical: 10,
  },
  wheel: {
    width: SIZE,
    height: SIZE,
    position: 'absolute',
  },
  hit: {
    position: 'absolute',
    borderRadius: HIT / 2,
  },
});
