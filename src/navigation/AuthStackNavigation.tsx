import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from './type.tsx';
import SignInScreen from '@/screens/signin_screen';
import WelcomeScreen from '@/screens/welcome_screen';
import SignUpScreen from '@/screens/signup_screen';

const AuthStackNavigation = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Welcome'}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'SignIn'}
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'SignUp'}
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
