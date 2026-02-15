import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login-Register/Login'; 
import Register from './Login-Register/Register';
import HomeScreen from './Login-Register/Homescreen';
import BookingFlow from './Login-Register/Bookingflow';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Booking: undefined; 
  BookingDate: undefined;
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
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}