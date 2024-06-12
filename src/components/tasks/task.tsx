import React from 'react';
import {ITask} from '@/types';
import {Box, Text, AnimatedBox} from '@/utils/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/services/config.ts';
import {Platform, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationType} from '@/navigation/type.tsx';
import {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type TaskProps = {
  task: ITask;
  mutateTasks: () => Promise<ITask[] | undefined>;
};

interface ITaskStatusRequest {
  id: string;
  isCompleted: boolean;
}

const toggleTaskStatusRequest = async (
  url: string,
  {arg}: {arg: ITaskStatusRequest},
) => {
  try {
    await axiosInstance.put(url + '/' + arg.id, {...arg});
  } catch (error) {
    console.log(error, 'An error occurred while toggling task request');
  }
};

export const Task = ({task, mutateTasks}: TaskProps) => {
  const navigation = useNavigation<HomeScreenNavigationType>();
  const {trigger} = useSWRMutation('tasks/update', toggleTaskStatusRequest);
  const offset = useSharedValue(1);
  const tikIconSize = useSharedValue(0.8);

  const toggleTaskStatus = async () => {
    try {
      const _updatedTask = {
        id: task._id,
        isCompleted: !task.isCompleted,
      };
      await trigger(_updatedTask);
      if (mutateTasks) {
        await mutateTasks();
      }
      if (!_updatedTask.isCompleted) {
        (offset.value = 1), (tikIconSize.value = 0);
      } else {
        (offset.value = 1.1), (tikIconSize.value = 1);
      }
    } catch (error) {
      console.log(error, 'An error occurred while toggling task status');
    }
  };

  const navigateToEditTask = () => {
    navigation.navigate('EditTask', {task});
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(offset.value)}],
    };
  });

  const tikIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(tikIconSize.value)}],
      opacity: task.isCompleted ? offset.value : 0,
    };
  });

  return (
    <AnimatedBox
      entering={FadeInLeft.delay(400).duration(600)}
      exiting={FadeInRight.delay(500).duration(700)}>
      <TouchableOpacity onLongPress={navigateToEditTask}>
        <Box
          mx={'1'}
          px={'2'}
          py={'4'}
          bg={'white'}
          borderWidth={1}
          borderColor={'gray200'}
          borderRadius={'rounded-2xl'}
          elevation={3}
          shadowOffset={{width: 3, height: 3}}
          shadowOpacity={0.6}
          shadowColor={Platform.OS === 'ios' ? 'gray100' : 'gray100'}
          shadowRadius={6}>
          <Box flexDirection={'row'} alignItems={'center'}>
            <AnimatedBox
              style={[animatedStyles]}
              flexDirection={'row'}
              alignItems={'center'}>
              <TouchableOpacity onPress={toggleTaskStatus}>
                <Box
                  mx={'2'}
                  width={26}
                  height={26}
                  borderWidth={1}
                  borderRadius={'rounded-7xl'}
                  borderColor={'white'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  bg={task.isCompleted ? 'green600' : 'gray300'}>
                  {task.isCompleted && (
                    <AnimatedBox style={[tikIconStyles]}>
                      <Entypo name={'check'} color={'white'} size={20} />
                    </AnimatedBox>
                  )}
                </Box>
              </TouchableOpacity>
            </AnimatedBox>
            <Text variant={'textSm'} fontWeight={'600'} color={'gray700'}>
              {task.name}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </AnimatedBox>
  );
};
