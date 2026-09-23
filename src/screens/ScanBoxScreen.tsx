import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { AddBoxProgress } from '../components/AddBoxProgress';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ScanBox'>;

export function ScanBoxScreen({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleScan = ({ data }: { data: string }) => {
    if (scanned) return;
    const code = data.trim().toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(code)) return;
    setScanned(true);
    navigation.replace('PersonInfo');
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.content}>
        <Pressable onPress={() => navigation.goBack()} style={s.back}>
          <Ionicons name="arrow-back" size={25} color={colors.navy} />
        </Pressable>
        <AddBoxProgress step={1} />

        <Text style={s.title}>Scan QR code</Text>
        <Text style={s.subtitle}>Point your camera at the QR code on your ADMO Box.</Text>

        {!permission ? (
          <View style={s.permissionCard}><Text style={s.permissionText}>Checking camera permission…</Text></View>
        ) : !permission.granted ? (
          <View style={s.permissionCard}>
            <Ionicons name="camera-outline" size={38} color={colors.teal} />
            <Text style={s.permissionTitle}>Camera access needed</Text>
            <Text style={s.permissionText}>Allow camera access so ADMO can scan your box.</Text>
            <Pressable style={s.permissionButton} onPress={requestPermission}>
              <Text style={s.permissionButtonText}>Allow camera</Text>
            </Pressable>
          </View>
        ) : (
          <View style={s.cameraWrap}>
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onBarcodeScanned={scanned ? undefined : handleScan}
            />
            <View style={s.overlay}>
              <View style={s.scanFrame} />
            </View>
          </View>
        )}

        <Text style={s.hint}>Keep the QR code inside the frame. ADMO will scan it automatically.</Text>

        <Pressable style={s.manual} onPress={() => navigation.replace('DeviceCode')}>
          <Ionicons name="keypad-outline" size={19} color={colors.teal} />
          <Text style={s.manualText}>Enter device code instead</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 14, paddingBottom: 28 },
  back: { width: 44, height: 44, justifyContent: 'center', marginLeft: -7 },
  title: { color: colors.navy, fontSize: 30, fontWeight: '800', textAlign: 'center', marginTop: 20 },
  subtitle: { color: '#687DA3', fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 10, marginBottom: 28 },
  cameraWrap: { width: '100%', aspectRatio: 1, borderRadius: 24, overflow: 'hidden', backgroundColor: '#EAF5F5' },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  scanFrame: { width: '68%', aspectRatio: 1, borderWidth: 3, borderColor: '#FFFFFF', borderRadius: 22 },
  hint: { color: '#687DA3', fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 18, paddingHorizontal: 20 },
  manual: { marginTop: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 44 },
  manualText: { color: colors.teal, fontSize: 14, fontWeight: '700' },
  permissionCard: { minHeight: 260, borderRadius: 24, backgroundColor: '#F1F9FA', alignItems: 'center', justifyContent: 'center', padding: 28 },
  permissionTitle: { color: colors.navy, fontSize: 18, fontWeight: '700', marginTop: 12 },
  permissionText: { color: '#687DA3', fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: 8 },
  permissionButton: { marginTop: 20, backgroundColor: colors.teal, borderRadius: 15, paddingHorizontal: 26, paddingVertical: 14 },
  permissionButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});
