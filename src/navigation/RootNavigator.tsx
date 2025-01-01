import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home/Home';
import {Payment} from '../screens/Payment/Payment';
import {RootStackParamList} from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Checkout"
      screenOptions={{
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Checkout"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: 'Select UPI App',
        }}
      />
    </Stack.Navigator>
  );
};
