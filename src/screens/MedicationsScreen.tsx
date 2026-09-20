import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { BottomNav } from '../components/BottomNav';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Medications'>;
type Filter = 'All' | 'Active' | 'Inactive';

export function MedicationsScreen({ navigation }: Props) {
  const [filter, setFilter] = useState<Filter>('All');
  const navigateTab = (tab: 'Home'|'Medications'|'History'|'Profile') => {
    if (tab !== 'Medications') navigation.navigate(tab);
  };
  return (
    <SafeAreaView style={styles.safe}><View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View><Text style={styles.title}>Medications</Text><Text style={styles.subtitle}>Manage all your medications in one place.</Text></View>
        </View>
        <View style={styles.filters}>
          {(['All','Active','Inactive'] as Filter[]).map(item => (
            <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter,filter===item&&styles.filterActive]}>
              <Text style={[styles.filterText,filter===item&&styles.filterTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.emptyCard}>
          <View style={styles.pillCircle}><Ionicons name="bandage-outline" size={39} color={colors.teal}/></View>
          <Text style={styles.emptyTitle}>No medications added yet</Text>
          <Text style={styles.emptyText}>Add your first medication to set up reminders and keep track of your treatment.</Text>
        </View>
        <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddMedication')}>
          <Text style={styles.addText}>Add medication</Text>
        </Pressable>
      </ScrollView>
      <BottomNav active="Medications" onNavigate={navigateTab}/>
    </View></SafeAreaView>
  );
}
const styles=StyleSheet.create({
 safe:{flex:1,backgroundColor:'#FFF'},page:{flex:1,backgroundColor:'#F9FEFF'},content:{padding:22,paddingBottom:28,flexGrow:1},
 header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10},title:{fontSize:24,fontWeight:'800',color:colors.navy},subtitle:{fontSize:11,color:'#8197B4',marginTop:3},
 addCircle:{width:42,height:42,borderRadius:21,backgroundColor:colors.teal,alignItems:'center',justifyContent:'center'},
 filters:{flexDirection:'row',backgroundColor:'#F0F6F8',borderRadius:12,padding:3,marginTop:22},filter:{flex:1,height:38,borderRadius:10,alignItems:'center',justifyContent:'center'},filterActive:{backgroundColor:colors.teal},filterText:{fontSize:11,color:'#7188AD'},filterTextActive:{color:'#FFFFFF',fontWeight:'700'},
 emptyCard:{flex:1,minHeight:350,borderWidth:1,borderColor:'#E3EDF1',borderRadius:16,marginTop:16,alignItems:'center',justifyContent:'center',paddingHorizontal:32,backgroundColor:'#FCFEFF'},
 pillCircle:{width:76,height:76,borderRadius:38,backgroundColor:'#E4F5F3',alignItems:'center',justifyContent:'center'},emptyTitle:{fontSize:16,fontWeight:'800',color:colors.navy,marginTop:18},emptyText:{fontSize:12,lineHeight:18,textAlign:'center',color:'#7C91AE',marginTop:8},
 addButton:{height:52,borderRadius:13,backgroundColor:colors.teal,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,marginTop:16},addText:{color:'#FFF',fontSize:14,fontWeight:'700'}
});