import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

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

export function WeekWheel() {
  // getDay() uses the device's local calendar:
  // 0 = Sunday, 1 = Monday, ... 6 = Saturday.
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    marginVertical: 10,
    overflow: 'hidden',
  },
  wheel: {
    width: SIZE,
    height: SIZE,
  },
});
