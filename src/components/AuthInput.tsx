import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

type Props = TextInputProps & {
  icon: keyof typeof Ionicons.glyphMap;
  password?: boolean;
};

export function AuthInput({
  icon,
  password,
  ...props
}: Props) {
  const [hidden, setHidden] = useState(!!password);

  return (
    <View style={styles.wrap}>
      {/* Left icon */}
      <Ionicons
        name={icon}
        size={19}
        color="#16739A"
        style={styles.left}
      />

      {/* Input field */}
      <TextInput
        {...props}
        placeholderTextColor={colors.textMuted}
        secureTextEntry={password ? hidden : false}
        style={styles.input}
      />

      {/* Show / hide password */}
      {password && (
        <Pressable
          onPress={() => setHidden((value) => !value)}
          hitSlop={10}
        >
          <Ionicons
            name={hidden ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#16739A"
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  left: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: colors.navy,
    paddingVertical: 13,
  },
});