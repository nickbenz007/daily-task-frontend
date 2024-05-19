import React from 'react';
import {Box} from '@/utils/theme';
import PressableView from '@/components/helper/PressableView.tsx';
import {useNavigation} from '@react-navigation/native';
import {CategoryNavigationType} from '@/navigation/type.tsx';

export const CreateNewCategory = () => {
  const navigation = useNavigation<CategoryNavigationType>();
  const navigateToCreateNewCategory = () => {
    navigation.navigate('CreateCategory', {});
  };
  return (
    <Box>
      <PressableView
        label={'Create New Category'}
        onPress={navigateToCreateNewCategory}
        uppercase={true}
      />
    </Box>
  );
};
