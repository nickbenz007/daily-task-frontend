import React from 'react';
import {SafeAreaView} from 'react-native';
import theme from '../theme';

type SafeAreaWrapperProps = {
  children: React.ReactNode;
};

const SafeAreaWrapper = ({children}: SafeAreaWrapperProps) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.white}}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
