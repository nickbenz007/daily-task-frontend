import React from 'react';
import {Box, Text} from '@/utils/theme';
import {ICategory} from '@/types';
import Entypo from 'react-native-vector-icons/Entypo';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CategoriesNavigationType} from '@/navigation/type.tsx';

type CategoryProps = {
  category: ICategory;
};

export const Category = ({category}: CategoryProps) => {
  const navigation = useNavigation<CategoriesNavigationType>();
  const navigateToCreateCategory = () => {
    navigation.navigate('CreateCategory', {category});
  };

  const navigateToCategoryScreen = () => {
    navigation.navigate('Category', {
      id: category._id,
    });
  };
  return (
    <Pressable onPress={navigateToCategoryScreen}>
      <Box
        bg={'gray100'}
        borderRadius={'rounded-2xl'}
        elevation={4}
        shadowOffset={{width: 1, height: 3}}
        shadowOpacity={0.3}
        shadowRadius={3}
        shadowColor={'gray500'}
        px={'4'}
        py={'4'}
        mx={'2'}
        mt={'1'}>
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Box flexDirection={'row'}>
            <Text
              fontSize={20}
              mr={'3'}
              variant={'textBase'}
              fontWeight={'600'}
              color={'gray650'}>
              {category.icon.symbol}
            </Text>
            <Text variant={'textBase'} fontWeight={'600'} color={'gray650'}>
              {category.name}
            </Text>
          </Box>
          <Pressable onPress={navigateToCreateCategory}>
            <Entypo name={'dots-three-vertical'} color={'gray'} size={18} />
          </Pressable>
        </Box>
      </Box>
    </Pressable>
  );
};
