import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login-Register/Login'; 
import ForgotPassword from './Login-Register/Forgetpass';
import HomeScreen from './Login-Register/Homescreen';
import BookingFlow from './Login-Register/Bookingflow';
import Appointment from './Login-Register/Appointment';
import NewsScreen from './Login-Register/Newscreen';
import Profile from './Login-Register/Profile';

export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  Booking: undefined; 
  BookingDate: undefined;
  Appointment: undefined;
  Newscreen: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        id="RootStack" 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingFlow} />
        <Stack.Screen name="Appointment" component={Appointment} />
        <Stack.Screen name="Newscreen" component={NewsScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}