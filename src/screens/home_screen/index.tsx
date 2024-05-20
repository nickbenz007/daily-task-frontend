import React from 'react';
import {Box, Text, AnimatedBox, AnimatedText} from '@/utils/theme';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import useGlobalUserStore from '@/store/useGlobalUserStore.ts';
import {TasksActions} from '@/components/tasks/tasks_actions.tsx';
import useSWR from 'swr';
import {ITask} from '@/types';
import {fetcher} from '@/services/config.ts';
import {Loader} from '@/components/helper/Loader.tsx';
import {FlatList} from 'react-native';
import {Task} from '@/components/tasks/task.tsx';
import {getGreetings} from '@/utils/helpers';
import {format} from 'date-fns';
import {FadeInRight} from 'react-native-reanimated';

const greetings = getGreetings({hour: new Date().getHours()});
const today = new Date();

const HomeScreen = () => {
  const {user} = useGlobalUserStore();
  console.log('response', JSON.stringify(user, null, 2));

  const {
    data: tasks,
    isLoading,
    mutate: mutateTasks,
  } = useSWR<ITask[]>('tasks/', fetcher);

  if (isLoading || !tasks) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1}>
        <Box p={'4'}>
          <AnimatedText entering={FadeInRight.delay(500).duration(700)}>
            <Text
              variant={'text2Xl'}
              fontWeight={'600'}
              color={'black'}
              textTransform={'capitalize'}>
              Good {greetings} {user && user?.name}
            </Text>
          </AnimatedText>
          <Text
            variant={'text2Xl'}
            fontWeight={'600'}
            color={'black'}
            textTransform={'capitalize'}>
            It's {format(today, 'eeee, LLL dd')}
          </Text>
          <Text
            py={'3'}
            variant={'textXl'}
            fontWeight={'600'}
            color={'black'}
            textTransform={'capitalize'}>
            You have {tasks?.tasks.length} Tasks.
          </Text>
        </Box>
        <TasksActions categoryId={''} />
        <Box height={14} />
        <Box mx={'3'}>
          <FlatList
            data={tasks?.tasks}
            keyExtractor={(_item, index) => index.toString()}
            ItemSeparatorComponent={() => <Box height={14} />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <Task key={item.index} task={item} mutateTasks={mutateTasks} />
              );
            }}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
