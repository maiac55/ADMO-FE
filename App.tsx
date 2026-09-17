import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from './src/navigation';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { AccountCreatedScreen } from './src/screens/AccountCreatedScreen';
import { ConnectBoxScreen } from './src/screens/ConnectBoxScreen';
import { PersonInfoScreen } from './src/screens/PersonInfoScreen';
import { BoxAddedScreen } from './src/screens/BoxAddedScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { NotificationsScreen } from './src/screens/NotificationsScreen';
import { ScheduleScreen } from './src/screens/ScheduleScreen';
import { PlaceholderScreen } from './src/screens/PlaceholderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'fade' }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="AccountCreated" component={AccountCreatedScreen} />
        <Stack.Screen name="ConnectBox" component={ConnectBoxScreen} />
        <Stack.Screen name="PersonInfo" component={PersonInfoScreen} />
        <Stack.Screen name="BoxAdded" component={BoxAddedScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Persons" component={PlaceholderScreen} />
        <Stack.Screen name="History" component={PlaceholderScreen} />
        <Stack.Screen name="Profile" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
