import React, { useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
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
const CENTER = SIZE / 2;
const HIT_RADIUS = 105;
const SLICE = 360 / DAYS.length;

function point(radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export function WeekWheel() {
  const [selectedDay, setSelectedDay] = useState<Day>('Th');

  return (
    <View style={styles.wrap}>
      <Image
        source={WHEELS[selectedDay]}
        style={styles.wheel}
        resizeMode="contain"
        fadeDuration={0}
      />

      {DAYS.map((day, index) => {
        // Mo is centered exactly at 12 o'clock, then days continue clockwise.
        const hit = point(HIT_RADIUS, index * SLICE);

        return (
          <Pressable
            key={day}
            accessibilityRole="button"
            accessibilityLabel={`Select ${day}`}
            onPress={() => setSelectedDay(day)}
            hitSlop={4}
            style={[
              styles.hitArea,
              {
                left: hit.x - 30,
                top: hit.y - 30,
              },
            ]}
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
    position: 'relative',
    overflow: 'hidden',
  },
  wheel: {
    ...StyleSheet.absoluteFillObject,
    width: SIZE,
    height: SIZE,
  },
  hitArea: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
