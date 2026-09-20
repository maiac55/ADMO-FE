import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
type Props=NativeStackScreenProps<RootStackParamList,'AddMedication'>;
const week=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
export function AddMedicationScreen({navigation}:Props){
 const [selected,setSelected]=useState(['Mon','Tue','Wed','Thu','Fri']);
 return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.content}>
  <View style={s.top}><Pressable onPress={()=>navigation.goBack()}><Ionicons name="arrow-back" size={24} color={colors.teal}/></Pressable><View style={s.topText}><Text style={s.title}>Add Medication</Text><Text style={s.subtitle}>Set up the schedule for this medication</Text></View><Pressable style={s.done} onPress={()=>navigation.goBack()}><Ionicons name="checkmark" size={22} color="#FFF"/></Pressable></View>
  <View style={s.card}><Text style={s.heading}>Medication</Text><View style={s.input}><Ionicons name="bandage-outline" size={21} color={colors.navy}/><TextInput defaultValue="Paracetamol 500 mg" style={s.inputText}/><Ionicons name="chevron-down" size={17} color="#7188AD"/></View></View>
  <View style={s.card}><Text style={s.heading}>Days of the week</Text><Text style={s.help}>Select the days when you take this medication.</Text><View style={s.week}>{week.map(d=><Pressable key={d} onPress={()=>setSelected(x=>x.includes(d)?x.filter(v=>v!==d):[...x,d])} style={[s.day,selected.includes(d)&&s.dayOn]}><Text style={[s.dayText,selected.includes(d)&&s.dayTextOn]}>{d}</Text></Pressable>)}</View></View>
  {['Morning','Afternoon','Night'].map((part,i)=><View key={part} style={s.card}><View style={s.doseHead}><View style={[s.toggle,i===2&&s.toggleOff]}><View style={[s.knob,i!==2&&s.knobOn]}/></View><Ionicons name={i===2?'moon-outline':'sunny-outline'} size={21} color={i===2?colors.navy:colors.teal}/><Text style={s.heading}>{part}</Text></View><View style={s.doseRow}><View style={s.field}><Text style={s.fieldLabel}>Time</Text><Text style={s.fieldValue}>{i===0?'08:00':i===1?'13:00':'20:00'}</Text></View><View style={s.field}><Text style={s.fieldLabel}>Number of pills</Text><Text style={s.fieldValue}>−        1        +</Text></View></View></View>)}
  <View style={s.info}><Ionicons name="information-circle-outline" size={20} color={colors.teal}/><Text style={s.infoText}>This will be added as one medication with the selected schedule. You can add more medications later.</Text></View>
 </ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:'#F9FEFF'},content:{padding:20,paddingBottom:30},top:{flexDirection:'row',alignItems:'center',marginBottom:18},topText:{flex:1,alignItems:'center'},title:{fontSize:20,fontWeight:'800',color:colors.navy},subtitle:{fontSize:10,color:'#8197B4',marginTop:3},done:{width:38,height:38,borderRadius:12,backgroundColor:colors.teal,alignItems:'center',justifyContent:'center'},
 card:{backgroundColor:'#FFF',borderRadius:15,padding:13,marginBottom:12,borderWidth:1,borderColor:'#E8F0F3'},heading:{fontSize:13,fontWeight:'800',color:colors.navy},help:{fontSize:10,color:'#8197B4',marginTop:4},input:{height:46,borderWidth:1,borderColor:'#DDE8EE',borderRadius:12,marginTop:8,paddingHorizontal:10,flexDirection:'row',alignItems:'center'},inputText:{flex:1,color:colors.navy,fontSize:12,marginLeft:8},
 week:{flexDirection:'row',justifyContent:'space-between',marginTop:12},day:{width:38,height:38,borderRadius:10,backgroundColor:'#F0F5F8',alignItems:'center',justifyContent:'center'},dayOn:{backgroundColor:colors.teal},dayText:{fontSize:9,color:'#8197B4'},dayTextOn:{color:'#FFF',fontWeight:'700'},
 doseHead:{flexDirection:'row',alignItems:'center',gap:8},toggle:{width:36,height:22,borderRadius:11,backgroundColor:colors.teal,padding:2},toggleOff:{backgroundColor:'#DCE7EF'},knob:{width:18,height:18,borderRadius:9,backgroundColor:'#FFF'},knobOn:{alignSelf:'flex-end'},doseRow:{flexDirection:'row',gap:10,marginTop:12},field:{flex:1},fieldLabel:{fontSize:9,color:'#8197B4',marginBottom:5},fieldValue:{height:39,borderWidth:1,borderColor:'#DDE8EE',borderRadius:10,padding:11,color:colors.navy,fontSize:11},
 info:{flexDirection:'row',gap:9,backgroundColor:'#EFF9FC',borderRadius:13,padding:12},infoText:{flex:1,fontSize:9,lineHeight:14,color:'#7188AD'}
});