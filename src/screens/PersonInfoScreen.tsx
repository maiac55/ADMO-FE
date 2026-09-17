import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { AddBoxProgress } from '../components/AddBoxProgress';
import { PrimaryButton } from '../components/Buttons';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'PersonInfo'>;

function Field({ icon, label, value, onChangeText, multiline, keyboardType = 'default' }: any) {
  return <View style={[s.field, multiline && s.noteField]}><Ionicons name={icon} size={23} color={colors.teal}/><View style={s.fieldBody}><Text style={s.fieldLabel}>{label}</Text><TextInput value={value} onChangeText={onChangeText} style={[s.input,multiline&&s.noteInput]} placeholder={label} placeholderTextColor="#A2ADBC" multiline={multiline} keyboardType={keyboardType}/></View></View>;
}

export function PersonInfoScreen({ navigation }: Props) {
  const [name,setName]=useState(''); const [age,setAge]=useState(''); const [note,setNote]=useState('');
  return <SafeAreaView style={s.safe}><KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}><ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
    <Pressable onPress={()=>navigation.goBack()} style={s.back}><Ionicons name="arrow-back" size={25} color={colors.navy}/></Pressable>
    <Text style={s.title}>Add ADMO Box</Text><AddBoxProgress step={2}/>
    <View style={s.personIcon}><Ionicons name="person-outline" size={45} color={colors.teal}/></View>
    <Text style={s.heading}>Who is this box for?</Text><Text style={s.subtitle}>Enter the person's information.{`\n`}You can edit it later.</Text>
    <View style={s.fields}>
      <Field icon="person-outline" label="Full name" value={name} onChangeText={setName}/>
      <Field icon="calendar-outline" label="Age" value={age} onChangeText={setAge} keyboardType="number-pad"/>
      <Field icon="chatbox-outline" label="Optional note (visible to staff)" value={note} onChangeText={setNote} multiline/>
    </View>
    <View style={s.continue}><PrimaryButton label="Continue" onPress={()=>navigation.navigate('BoxAdded',{name:name.trim()||'New person',age:age.trim()||'—',note:note.trim()})}/></View>
  </ScrollView></KeyboardAvoidingView></SafeAreaView>;
}

const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#fff'},content:{flexGrow:1,paddingHorizontal:36,paddingTop:14,paddingBottom:28},back:{width:40,height:40,justifyContent:'center',marginLeft:-8},title:{textAlign:'center',color:colors.navy,fontSize:20,fontWeight:'700',marginTop:-34},personIcon:{width:72,height:72,borderRadius:36,backgroundColor:'#ECF8F8',alignSelf:'center',alignItems:'center',justifyContent:'center'},heading:{textAlign:'center',color:colors.navy,fontSize:18,fontWeight:'700',marginTop:14},subtitle:{textAlign:'center',color:'#687DA3',fontSize:13,lineHeight:21,marginTop:6},fields:{gap:12,marginTop:28},field:{minHeight:68,borderWidth:1,borderColor:'#E0E6EB',borderRadius:18,paddingHorizontal:15,paddingVertical:10,flexDirection:'row',alignItems:'center',gap:12,backgroundColor:'#fff'},noteField:{minHeight:96,alignItems:'flex-start',paddingTop:15},fieldBody:{flex:1},fieldLabel:{fontSize:10,color:'#61769A',marginBottom:3},input:{padding:0,color:colors.navy,fontSize:14,minHeight:22},noteInput:{minHeight:48,textAlignVertical:'top'},continue:{marginTop:'auto',paddingTop:38}});
