import React from 'react';
import {Box} from '@/utils/theme';
import {ActivityIndicator} from 'react-native';
import SafeAreaWrapper from './SafeAreaWrapper.tsx';

export const Loader = () => {
  return (
    <SafeAreaWrapper>
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <ActivityIndicator size="large" animating={true} color={'black'} />
      </Box>
    </SafeAreaWrapper>
  );
};
