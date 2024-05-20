import React from 'react';
import {Box, Theme} from '@/utils/theme';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Platform, TouchableOpacity} from 'react-native';
import {useTheme} from '@shopify/restyle';

const NavigateBack = () => {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={navigateBack}>
      <Box
        p={'2'}
        borderWidth={1}
        backgroundColor={'white'}
        borderColor={'gray200'}
        borderRadius={'rounded-7xl'}
        elevation={3}
        shadowOffset={{width: 0, height: 2}}
        shadowOpacity={0.7}
        shadowColor={'gray300'}
        shadowRadius={3.84}>
        <Entypo
          name={'arrow-left'}
          color={theme.colors.green500}
          size={Platform.OS === 'ios' ? 24 : 24}
        />
      </Box>
    </TouchableOpacity>
  );
};

export default NavigateBack;
