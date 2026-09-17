import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Path, RadialGradient, Stop, Text as SvgText } from 'react-native-svg';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const SIZE = 286;
const CENTER = SIZE / 2;
const INNER = 68;
const OUTER = 132;
const SLICE = 360 / DAYS.length;
const GAP = 2.6;

function point(radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function segmentPath(index: number) {
  const start = index * SLICE + GAP;
  const end = (index + 1) * SLICE - GAP;

  const outerStart = point(OUTER, start);
  const outerEnd = point(OUTER, end);
  const innerEnd = point(INNER, end);
  const innerStart = point(INNER, start);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER} ${OUTER} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER} ${INNER} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

export function WeekWheel() {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <View style={styles.outerShadow}>
      <View style={styles.wrap}>
        <Svg width={SIZE} height={SIZE}>
          <Defs>
            <RadialGradient id="centerGlow" cx="50%" cy="45%" rx="60%" ry="60%">
              <Stop offset="0%" stopColor="#FFFFFF" />
              <Stop offset="100%" stopColor="#F6FAFB" />
            </RadialGradient>
          </Defs>

          <Circle
            cx={CENTER}
            cy={CENTER}
            r={OUTER + 2}
            fill="#F9FBFC"
            stroke="#EDF2F4"
            strokeWidth={1}
          />

          <G>
            {DAYS.map((day, index) => {
              const selected = selectedDay === index;
              const label = point(101, index * SLICE + SLICE / 2);

              return (
                <React.Fragment key={day}>
                  <Path
                    d={segmentPath(index)}
                    fill={selected ? '#079C9A' : '#FFFFFF'}
                    stroke={selected ? '#079C9A' : '#E7EEF1'}
                    strokeWidth={1.4}
                  />

                  <SvgText
                    x={label.x}
                    y={label.y + 5}
                    textAnchor="middle"
                    fontSize={15}
                    fontWeight="700"
                    fill={selected ? '#FFFFFF' : '#123F69'}
                  >
                    {day}
                  </SvgText>
                </React.Fragment>
              );
            })}
          </G>

          <Circle
            cx={CENTER}
            cy={CENTER}
            r={INNER - 3}
            fill="url(#centerGlow)"
            stroke="#E8EFF1"
            strokeWidth={1.5}
          />
        </Svg>

        {DAYS.map((day, index) => {
          const hit = point(101, index * SLICE + SLICE / 2);
          return (
            <Pressable
              key={`hit-${day}`}
              accessibilityRole="button"
              accessibilityLabel={`Select ${day}`}
              onPress={() => setSelectedDay(index)}
              style={[
                styles.hitArea,
                {
                  left: hit.x - 31,
                  top: hit.y - 31,
                },
              ]}
            />
          );
        })}

        <View pointerEvents="none" style={styles.center}>
          <Image
            source={require('../../assets/admo-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerShadow: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#506A78',
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  wrap: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  hitArea: {
    position: 'absolute',
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  center: {
    position: 'absolute',
    left: CENTER - INNER + 7,
    top: CENTER - INNER + 7,
    width: (INNER - 7) * 2,
    height: (INNER - 7) * 2,
    borderRadius: INNER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 58,
  },
});