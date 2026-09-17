import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const SIZE = 270;
const CENTER = SIZE / 2;
const INNER = 64;
const OUTER = 126;

function point(radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function segmentPath(index: number) {
  const slice = 360 / 7;
  const gap = 1.6;
  const start = index * slice + gap;
  const end = (index + 1) * slice - gap;
  const a = point(OUTER, start);
  const b = point(OUTER, end);
  const c = point(INNER, end);
  const d = point(INNER, start);

  return [
    `M ${a.x} ${a.y}`,
    `A ${OUTER} ${OUTER} 0 0 1 ${b.x} ${b.y}`,
    `L ${c.x} ${c.y}`,
    `A ${INNER} ${INNER} 0 0 0 ${d.x} ${d.y}`,
    'Z',
  ].join(' ');
}

export function WeekWheel() {
  return (
    <View style={styles.wrap}>
      <Svg width={SIZE} height={SIZE}>
        {DAYS.map((day, index) => {
          const slice = 360 / 7;
          const label = point(95, index * slice + slice / 2);
          const fill = index < 3 ? '#079A99' : index === 3 ? '#BCEBE8' : '#FFFFFF';
          const textColor = index < 3 ? '#FFFFFF' : '#073B67';

          return (
            <React.Fragment key={day}>
              <Path
                d={segmentPath(index)}
                fill={fill}
                stroke="#E7EEF1"
                strokeWidth={1.5}
              />
              <SvgText
                x={label.x}
                y={label.y + 5}
                textAnchor="middle"
                fontSize={15}
                fontWeight="700"
                fill={textColor}
              >
                {day}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>

      <View style={styles.center}>
        <Image
          source={require('../../assets/admo-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    marginVertical: 4,
    shadowColor: '#78909C',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  center: {
    position: 'absolute',
    left: CENTER - INNER + 4,
    top: CENTER - INNER + 4,
    width: INNER * 2 - 8,
    height: INNER * 2 - 8,
    borderRadius: INNER,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 92,
    height: 52,
  },
});