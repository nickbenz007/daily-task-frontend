import React from 'react';
import {Box, Text, AnimatedText} from '@/utils/theme';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import useGlobalUserStore from '@/store/useGlobalUserStore.ts';
import {TasksActions} from '@/components/tasks/tasks_actions.tsx';
import useSWR from 'swr';
import {ITask} from '@/types';
import {fetcher} from '@/services/config.ts';
import {Loader} from '@/components/helper/Loader.tsx';
import {FlatList, Pressable} from 'react-native';
import {Task} from '@/components/tasks/task.tsx';
import {getGreetings} from '@/utils/helpers';
import {format} from 'date-fns';
import {FadeInRight} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@/navigation/type.tsx';

const greetings = getGreetings({hour: new Date().getHours()});
const today = new Date();

const HomeScreen = () => {
  const navigation = useNavigation<AppStackParamList>();
  const {user, updateUser} = useGlobalUserStore();

  const {
    data: tasks,
    isLoading,
    mutate: mutateTasks,
  } = useSWR<ITask[]>('tasks/', fetcher);

  const navigateToSignInScreen = () => {
    navigation.navigate('Root', {screen: 'SignIn'});
  };

  const logOutUser = async () => {
    try {
      await AsyncStorage.removeItem('token');
      updateUser(null);
      navigateToSignInScreen();
    } catch (error) {
      console.log('An error occurred while logging Out', error);
    }
  };

  if (isLoading || !tasks) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1}>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Box p={'4'}>
            <AnimatedText entering={FadeInRight.delay(500).duration(700)}>
              <Text
                variant={'textXl'}
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
          <Box mx={'2'} my={'3'} alignItems={'center'}>
            <Pressable
              onPress={logOutUser}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 7,
                backgroundColor: 'crimson',
                borderRadius: 50,
              }}>
              <Text
                variant={'textSm'}
                fontWeight={'700'}
                color={'white'}
                textAlign={'center'}>
                Logout
              </Text>
            </Pressable>
          </Box>
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
