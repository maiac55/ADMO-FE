import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../theme/colors';

type AuthBackgroundProps = {
  children: React.ReactNode;
  bubbles?: boolean;
};

export function AuthBackground({
  children,
  bubbles = false,
}: AuthBackgroundProps) {
  return (
    <View style={styles.root}>
      {/* Background bubbles */}
      {bubbles && (
        <Svg
          pointerEvents="none"
          width="100%"
          height="100%"
          style={StyleSheet.absoluteFill}
        >
          <Circle
            cx="-8"
            cy="120"
            r="72"
            fill="#FBFCFD"
          />

          <Circle
            cx="390"
            cy="250"
            r="72"
            fill="#E6F8F8"
          />
        </Svg>
      )}

      {/* Decorative waves at the bottom */}
      <Svg
        pointerEvents="none"
        width="100%"
        height="210"
        viewBox="0 0 390 210"
        style={styles.waves}
      >
        {[0, 18, 36, 54, 72].map((dy, index) => (
          <Path
            key={index}
            d={`
              M-25 ${85 + dy}
              C 55 ${30 + dy},
                120 ${50 + dy},
                195 ${90 + dy}
              S 315 ${150 + dy},
                420 ${75 + dy}
            `}
            fill="none"
            stroke={colors.wave}
            strokeWidth="1.2"
          />
        ))}
      </Svg>

      {/* Screen content */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  waves: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});