import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { AddBoxProgress } from '../components/AddBoxProgress';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { colors } from '../theme/colors';

type Props=NativeStackScreenProps<RootStackParamList,'BoxAdded'>;
export function BoxAddedScreen({navigation,route}:Props){const {name,age,note}=route.params;return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
  <Pressable onPress={()=>navigation.goBack()} style={s.back}><Ionicons name="arrow-back" size={25} color={colors.navy}/></Pressable><Text style={s.title}>Add ADMO Box</Text><AddBoxProgress step={3}/>
  <View style={s.check}><Ionicons name="checkmark" size={42} color={colors.teal}/></View><Text style={s.heading}>ADMO Box added!</Text><Text style={s.subtitle}>The box is connected and ready to use.{`\n`}You can start managing medications{`\n`}for <Text style={s.bold}>{name}</Text>.</Text>
  <View style={s.card}>
    <View style={s.row}><View style={s.avatar}><Text style={s.avatarText}>{name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()}</Text></View><View style={{flex:1}}><Text style={s.rowTitle}>{name}</Text><Text style={s.rowSub}>ADMO-01   <Text style={s.connected}>●  Connected</Text></Text></View></View>
    <View style={s.divider}/><Info icon="briefcase-outline" title="ADMO Box" text="ADMO-01" status/><View style={s.divider}/><Info icon="person-outline" title="Age" text={age}/>{note?<><View style={s.divider}/><Info icon="chatbox-outline" title="Personal note" text={note}/></>:null}
  </View>
  <View style={s.buttons}><PrimaryButton label="Go to dashboard" onPress={()=>navigation.navigate('Home')}/><SecondaryButton label="Add another ADMO Box" icon="add" onPress={()=>navigation.navigate('ConnectBox')}/></View>
</ScrollView></SafeAreaView>}
function Info({icon,title,text,status}:{icon:keyof typeof Ionicons.glyphMap;title:string;text:string;status?:boolean}){return <View style={s.info}><Ionicons name={icon} size={22} color={colors.teal}/><View style={{flex:1}}><Text style={s.infoTitle}>{title}</Text><Text style={s.infoText}>{text}</Text></View>{status?<Text style={s.connected}>●  Connected</Text>:<Ionicons name="chevron-forward" size={18} color={colors.navy}/>}</View>}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#fff'},content:{flexGrow:1,paddingHorizontal:36,paddingTop:14,paddingBottom:24},back:{width:40,height:40,justifyContent:'center',marginLeft:-8},title:{textAlign:'center',color:colors.navy,fontSize:20,fontWeight:'700',marginTop:-34},check:{width:72,height:72,borderRadius:36,backgroundColor:'#ECF8F8',alignSelf:'center',alignItems:'center',justifyContent:'center'},heading:{textAlign:'center',color:colors.navy,fontSize:19,fontWeight:'700',marginTop:13},subtitle:{textAlign:'center',color:'#687DA3',fontSize:13,lineHeight:21,marginTop:8},bold:{fontWeight:'700',color:colors.navy},card:{borderWidth:1,borderColor:'#E3E9ED',borderRadius:18,padding:16,marginTop:24,backgroundColor:'#fff'},row:{flexDirection:'row',alignItems:'center',gap:12},avatar:{width:42,height:42,borderRadius:21,backgroundColor:'#DFF5F3',alignItems:'center',justifyContent:'center'},avatarText:{color:colors.teal,fontWeight:'700'},rowTitle:{color:colors.navy,fontWeight:'700',fontSize:14},rowSub:{color:'#6E82A2',fontSize:11,marginTop:3},connected:{color:'#0AA66F',fontSize:10},divider:{height:1,backgroundColor:'#EEF1F3',marginVertical:12},info:{flexDirection:'row',alignItems:'center',gap:12},infoTitle:{color:colors.navy,fontSize:11,fontWeight:'700'},infoText:{color:'#6E82A2',fontSize:11,marginTop:3},buttons:{gap:12,marginTop:22}});
