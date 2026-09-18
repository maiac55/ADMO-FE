import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const SIZE = 300;
const CENTER = SIZE / 2;
const INNER = 70;
const OUTER = 139;
const SLICE = 360 / DAYS.length;
const GAP = 2.2;

const DARK_TEAL = '#078F93';
const DARK_TEAL_BOTTOM = '#057E88';
const LIGHT_TEAL = '#A9E7E3';
const LIGHT_TEAL_BOTTOM = '#8FDAD7';
const NAVY = '#073B67';

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
  // Thursday is selected initially, matching the final Figma reference.
  const [selectedDay, setSelectedDay] = useState(3);

  return (
    <View style={styles.shadow}>
      <View style={styles.wrap}>
        <Svg width={SIZE} height={SIZE}>
          <Defs>
            <LinearGradient id="darkSegment" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={DARK_TEAL} />
              <Stop offset="1" stopColor={DARK_TEAL_BOTTOM} />
            </LinearGradient>
            <LinearGradient id="selectedSegment" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={LIGHT_TEAL} />
              <Stop offset="1" stopColor={LIGHT_TEAL_BOTTOM} />
            </LinearGradient>
          </Defs>

          <Circle
            cx={CENTER}
            cy={CENTER}
            r={OUTER + 2}
            fill="#F7FAFB"
            stroke="#E8EEF0"
            strokeWidth={2}
          />

          <G>
            {DAYS.map((day, index) => {
              const selected = selectedDay === index;
              const middleAngle = index * SLICE + SLICE / 2;
              const label = point(105, middleAngle);
              const dot = point(119, middleAngle);

              return (
                <React.Fragment key={day}>
                  <Path
                    d={segmentPath(index)}
                    fill={selected ? 'url(#selectedSegment)' : 'url(#darkSegment)'}
                    stroke="#F4F7F8"
                    strokeWidth={3}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  <SvgText
                    x={label.x}
                    y={label.y + 5}
                    textAnchor="middle"
                    fontSize={16}
                    fontWeight="700"
                    fill={selected ? NAVY : '#FFFFFF'}
                  >
                    {day}
                  </SvgText>

                  <Circle
                    cx={dot.x}
                    cy={dot.y}
                    r={4.2}
                    fill={selected ? '#56B9BA' : '#78C7C8'}
                    opacity={0.95}
                  />
                </React.Fragment>
              );
            })}
          </G>

          <Circle
            cx={CENTER}
            cy={CENTER}
            r={INNER - 1}
            fill="#FFFFFF"
            stroke="#E8EEF0"
            strokeWidth={2}
          />
        </Svg>

        {DAYS.map((day, index) => {
          const hit = point(106, index * SLICE + SLICE / 2);

          return (
            <Pressable
              key={`hit-${day}`}
              accessibilityRole="button"
              accessibilityLabel={`Select ${day}`}
              onPress={() => setSelectedDay(index)}
              style={[
                styles.hitArea,
                {
                  left: hit.x - 35,
                  top: hit.y - 35,
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
  shadow: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#5D7682',
    shadowOpacity: 0.18,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  wrap: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  hitArea: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  center: {
    position: 'absolute',
    left: CENTER - INNER + 5,
    top: CENTER - INNER + 5,
    width: (INNER - 5) * 2,
    height: (INNER - 5) * 2,
    borderRadius: INNER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 112,
    height: 96,
  },
});
