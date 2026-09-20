import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { AddBoxProgress } from '../components/AddBoxProgress';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ConnectBox'>;

export function ConnectBoxScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => navigation.goBack()} style={s.back}><Ionicons name="arrow-back" size={25} color={colors.navy} /></Pressable>
        <Text style={s.title}>Add ADMO Box</Text>
        <AddBoxProgress step={1} />

        <View style={s.deviceHalo}>
          <View style={s.deviceTop} />
          <View style={s.device}>
            <Ionicons name="qr-code-outline" size={45} color={colors.navy} />
            <View style={s.deviceLines}><View style={s.line}/><View style={s.line}/><View style={s.line}/></View>
          </View>
        </View>

        <Text style={s.heading}>Connect your ADMO Box</Text>
        <Text style={s.subtitle}>Scan the QR code on the{`\n`}ADMO Box or enter the device code{`\n`}manually.</Text>

        <View style={s.buttons}>
          <PrimaryButton label="Scan QR code" icon="qr-code-outline" onPress={() => navigation.navigate('ScanBox')} />
          <SecondaryButton label="Enter device code" icon="keypad-outline" onPress={() => navigation.navigate('DeviceCode')} />
        </View>

        <Pressable style={s.help}><Ionicons name="help-circle-outline" size={20} color={colors.teal}/><Text style={s.helpText}>Need help?</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#fff'}, content:{flexGrow:1,paddingHorizontal:36,paddingTop:14,paddingBottom:28},
  back:{width:40,height:40,justifyContent:'center',marginLeft:-8}, title:{textAlign:'center',color:colors.navy,fontSize:20,fontWeight:'700',marginTop:-34},
  deviceHalo:{width:190,height:190,borderRadius:95,backgroundColor:'#F0FAFA',alignSelf:'center',alignItems:'center',justifyContent:'center',marginTop:4},
  deviceTop:{width:90,height:15,backgroundColor:'#078C91',borderTopLeftRadius:12,borderTopRightRadius:12,marginBottom:-4},
  device:{width:150,height:85,borderRadius:9,borderWidth:1,borderColor:'#A7E0DF',backgroundColor:'#F4FFFF',alignItems:'center',justifyContent:'center'},
  deviceLines:{position:'absolute',bottom:10,flexDirection:'row',gap:5}, line:{width:26,height:3,backgroundColor:'#BDE9E7'},
  heading:{textAlign:'center',color:colors.navy,fontSize:19,fontWeight:'700',marginTop:20}, subtitle:{textAlign:'center',color:'#687DA3',fontSize:14,lineHeight:22,marginTop:8},
  buttons:{gap:12,marginTop:30}, help:{marginTop:34,flexDirection:'row',gap:8,alignSelf:'center',alignItems:'center'},helpText:{color:colors.teal,fontSize:14,fontWeight:'600'}
});
