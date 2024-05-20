import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigation from './AuthStackNavigation.tsx';
import AppStackNavigation from './AppStackNavigation.tsx';
import useGlobalUserStore from '../store/useGlobalUserStore.ts';

const Navigation = () => {
  const {user} = useGlobalUserStore();

  return (
    <NavigationContainer>
      {user ? <AppStackNavigation /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
