import React from 'react';
import {Box, Text} from '@/utils/theme';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import useSWR from 'swr';
import {fetcher} from '@/services/config.ts';
import {Loader} from '@/components/helper/Loader.tsx';
import {FlatList} from 'react-native';
import {ICategory} from '@/types';
import {Category} from '@/components/categories/category.tsx';
import {CreateNewList} from '@/components/categories/create_new_list.tsx';

const CategoriesScreen = () => {
  const {
    isLoading,
    data: categories,
    error,
  } = useSWR<ICategory[]>('categories/', fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    console.log(error, 'An error occurred while fetching categories.');
  }

  if (!categories) {
    return null;
  }

  const renderItem = ({item}: {item: ICategory}) => (
    <Category category={item} />
  );

  return (
    <SafeAreaWrapper>
      <Box flex={1} px={'2'}>
        <Text variant={'text2Xl'} color={'black'} fontWeight={'700'} my={'2'}>
          Categories
        </Text>
        <FlatList
          data={categories?.categories}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box height={14} />}
          keyExtractor={item => item._id}
        />
        <CreateNewList />
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoriesScreen;
