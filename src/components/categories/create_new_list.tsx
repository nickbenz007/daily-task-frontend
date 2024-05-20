import React from 'react';
import {Box, Text} from '@/utils/theme';
import {useNavigation} from '@react-navigation/native';
import {CategoriesNavigationType} from '@/navigation/type.tsx';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export const CreateNewList = () => {
  const navigation = useNavigation<CategoriesNavigationType>();
  const navigateToCreateCategory = () => {
    navigation.navigate('CreateCategory', {});
  };
  return (
    <TouchableOpacity onPress={navigateToCreateCategory}>
      <Box
        backgroundColor={'sky100'}
        elevation={3}
        shadowOffset={{width: 0, height: 2}}
        shadowOpacity={0.5}
        shadowRadius={5}
        shadowColor={'sky500'}
        borderRadius="rounded-7xl"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        my={'5'}
        mx={'2'}>
        <Box
          p={'2'}
          m={'1'}
          borderWidth={6}
          borderColor={'white'}
          borderRadius={'rounded-7xl'}
          backgroundColor={'black'}>
          <Feather name={'plus'} color={'white'} size={26} />
        </Box>
        <Text
          textTransform={'uppercase'}
          variant={'textXl'}
          textAlign={'center'}
          fontWeight={'700'}
          color={'black'}>
          Create Category
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
