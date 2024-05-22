import React from 'react';
import {Box, Text} from '@/utils/theme';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import useSWR from 'swr';
import {fetcher} from '@/services/config.ts';
import {ITask} from '@/types';
import {Loader} from '@/components/helper/Loader.tsx';
import {FlatList} from 'react-native';
import {Task} from '@/components/tasks/task.tsx';

const CompletedScreen = () => {
  const {
    data: tasks,
    isLoading: isLoadingCompleted,
    mutate: mutateTasks,
  } = useSWR<ITask[]>('tasks/completed', fetcher, {refreshInterval: 1000});

  if (isLoadingCompleted) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box
          width={200}
          flexDirection="row"
          borderColor={'green600'}
          borderBottomWidth={2}
          py={'2'}>
          <Text variant="text2Xl" fontWeight="700" color={'black'}>
            Completed Tasks
          </Text>
        </Box>
        <Box height={16} />

        {tasks?.tasks && tasks?.tasks.length >= 0 ? (
          <FlatList
            data={tasks?.tasks}
            renderItem={({item, index}) => {
              return <Task key={index} task={item} mutateTasks={mutateTasks} />;
            }}
            ItemSeparatorComponent={() => <Box height={14} />}
            keyExtractor={item => item._id}
          />
        ) : (
          <Box
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection="row">
            <Text variant={'textXl'} color={'gray650'} fontWeight={'500'}>
              No completed Tasks available yet.
            </Text>
          </Box>
        )}
      </Box>
    </SafeAreaWrapper>
  );
};

export default CompletedScreen;
