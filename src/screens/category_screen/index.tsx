import React from 'react';
import {Box, Text} from '@/utils/theme';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CategoriesStackParamList} from '@/navigation/type.tsx';
import useSWR from 'swr';
import {fetcher} from '@/services/config.ts';
import {ICategory, ITask} from '@/types';
import {Loader} from '@/components/helper/Loader.tsx';
import NavigateBack from '@/components/helper/navigate_back.tsx';
import {FlatList} from 'react-native';
import {TasksActions} from '@/components/tasks/tasks_actions.tsx';
import {Task} from '@/components/tasks/task.tsx';

type CategoryScreenRouteProp = RouteProp<CategoriesStackParamList, 'Category'>;

const CategoryScreen = () => {
  const route = useRoute<CategoryScreenRouteProp>();
  const {id} = route.params;

  const {data: category, isLoading: isLoadingCategory} = useSWR<ICategory[]>(
    `categories/${id}`,
    fetcher,
  );

  const {
    data: tasks,
    isLoading: isLoadingTasks,
    mutate: mutateTasks,
  } = useSWR<ITask[]>(`tasks/tasks-by-categories/${id}`, fetcher, {
    refreshInterval: 10000,
  });

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx={'2'} my={'2'}>
        <Box width={50} alignItems={'center'}>
          <NavigateBack />
        </Box>
        <Box alignItems={'center'} flexDirection={'row'} my={'4'}>
          <Text mx={'4'} variant={'textLg'}>
            {category?.icon.symbol}
          </Text>
          <Text
            variant={'text2Xl'}
            fontWeight={'700'}
            style={{
              color: category?.color.code,
            }}>
            {category?.name}
          </Text>
        </Box>
        <TasksActions categoryId={id} />
        {isLoadingCategory || isLoadingTasks ? (
          <Loader />
        ) : (
          <Box>
            {tasks ? (
              <FlatList
                data={tasks}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Box height={14} />}
                renderItem={({item, index}) => {
                  return (
                    <Task key={index} task={item} mutateTasks={mutateTasks} />
                  );
                }}
              />
            ) : (
              <Box alignItems={'center'} py={'4'}>
                <Text variant={'textLg'} color={'gray700'}>
                  No task created yet.!
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoryScreen;
