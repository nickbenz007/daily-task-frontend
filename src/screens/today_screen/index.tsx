import React from 'react';
import {Box, Text} from '@/utils/theme';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import useSWR from 'swr';
import {fetcher} from '@/services/config.ts';
import {ITask} from '@/types';
import {Loader} from '@/components/helper/Loader.tsx';
import {FlatList} from 'react-native';
import {Task} from '@/components/tasks/task.tsx';
import {isToday} from 'date-fns';

const TodayScreen = () => {
  const {
    data: tasks,
    isLoading: isLoadingTasks,
    mutate: mutateTasks,
  } = useSWR<ITask[]>('tasks/today-tasks', fetcher, {refreshInterval: 1000});

  if (isLoadingTasks) {
    return <Loader />;
  }

  const todayTask = tasks?.todayTasks.filter(
    (task: {date: string | number | Date}) => isToday(new Date(task.date)),
  );

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box
          width={160}
          flexDirection="row"
          borderColor={'green600'}
          borderBottomWidth={2}
          py={'2'}>
          <Text variant="text2Xl" fontWeight="700">
            Today's Tasks
          </Text>
        </Box>
        <Box height={16} />

        {todayTask && todayTask.length >= 0 ? (
          <FlatList
            data={todayTask}
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
            <Text variant={'text2Xl'} color={'gray650'} fontWeight={'500'}>
              No tasks available yet for today
            </Text>
          </Box>
        )}
      </Box>
    </SafeAreaWrapper>
  );
};

export default TodayScreen;
