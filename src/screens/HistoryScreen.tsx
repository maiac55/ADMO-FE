import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { BottomNav } from '../components/BottomNav';
import { colors } from '../theme/colors';
type Props=NativeStackScreenProps<RootStackParamList,'History'>;
type Filter='All'|'Taken'|'Late'|'Missed';
const rows=[['08:02','Morning medication','2 pills','Taken'],['13:17','Afternoon medication','1 pill','Late'],['20:00','Evening medication','1 pill','Missed']] as const;
export function HistoryScreen({navigation}:Props){
 const [filter,setFilter]=useState<Filter>('All');
 const nav=(t:'Home'|'Medications'|'History'|'Profile')=>{if(t!=='History')navigation.navigate(t)};
 const visible=filter==='All'?rows:rows.filter(r=>r[3]===filter);
 return <SafeAreaView style={s.safe}><View style={s.page}><ScrollView contentContainerStyle={s.content}>
  <Text style={s.title}>History</Text>
  <View style={s.filters}>{(['All','Taken','Late','Missed'] as Filter[]).map(x=><Pressable key={x} onPress={()=>setFilter(x)} style={[s.filter,filter===x&&s.active]}><Text style={[s.filterText,filter===x&&s.activeText]}>{x}</Text></Pressable>)}</View>
  <Text style={s.section}>Today</Text><View style={s.card}>{visible.map((r,i)=><View key={r[0]} style={[s.row,i>0&&s.border]}><View style={[s.status,{backgroundColor:r[3]==='Taken'?'#32C451':r[3]==='Late'?'#FFA62B':'#F0524B'}]}><Ionicons name={r[3]==='Taken'?'checkmark':r[3]==='Late'?'time-outline':'close'} size={19} color="#FFF"/></View><Text style={s.time}>{r[0]}</Text><View style={s.med}><Text style={s.medName}>{r[1]}</Text><Text style={s.meta}>{r[2]}</Text></View><Text style={[s.badge,{color:r[3]==='Taken'?'#23A53D':r[3]==='Late'?'#E88A13':'#E53F3A'}]}>{r[3]}</Text></View>)}</View>
  <Text style={s.section}>Yesterday</Text><View style={s.card}><View style={s.row}><View style={[s.status,{backgroundColor:'#32C451'}]}><Ionicons name="checkmark" size={19} color="#FFF"/></View><Text style={s.time}>08:00</Text><View style={s.med}><Text style={s.medName}>Morning medication</Text><Text style={s.meta}>2 pills</Text></View><Text style={[s.badge,{color:'#23A53D'}]}>Taken</Text></View></View>
 </ScrollView><BottomNav active="History" onNavigate={nav}/></View></SafeAreaView>;
}
const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:'#FFF'},page:{flex:1,backgroundColor:'#F9FEFF'},content:{padding:22,paddingBottom:28},title:{textAlign:'center',fontSize:21,fontWeight:'800',color:colors.navy,marginTop:10},
 filters:{flexDirection:'row',gap:8,marginTop:28},filter:{flex:1,height:38,borderRadius:10,backgroundColor:'#F0F5F8',alignItems:'center',justifyContent:'center'},active:{backgroundColor:colors.teal},filterText:{fontSize:10,fontWeight:'700',color:colors.navy},activeText:{color:'#FFF'},
 section:{fontSize:14,fontWeight:'800',color:colors.navy,marginTop:25,marginBottom:12},card:{backgroundColor:'#FFF',borderRadius:15,borderWidth:1,borderColor:'#E9F0F3',overflow:'hidden'},row:{minHeight:80,flexDirection:'row',alignItems:'center',paddingHorizontal:12},border:{borderTopWidth:1,borderTopColor:'#E9EEF2'},
 status:{width:30,height:30,borderRadius:15,alignItems:'center',justifyContent:'center'},time:{width:54,marginLeft:12,fontSize:12,fontWeight:'800',color:colors.navy},med:{flex:1},medName:{fontSize:11,fontWeight:'800',color:colors.navy},meta:{fontSize:9,color:'#7188AD',marginTop:5},badge:{fontSize:10,fontWeight:'700',backgroundColor:'#F5FAF8',paddingHorizontal:7,paddingVertical:5,borderRadius:6}
});