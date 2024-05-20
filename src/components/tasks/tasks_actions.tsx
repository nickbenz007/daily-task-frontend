import React, {useState} from 'react';
import {Box, Text} from '@/utils/theme';
import {FlatList, Pressable, TextInput, TouchableOpacity} from 'react-native';
import {ICategory, ITaskRequest} from '@/types';
import {format, isToday} from 'date-fns';
import useSWR from 'swr';
import axiosInstance, {fetcher} from '@/services/config.ts';
import {Loader} from '@/components/helper/Loader.tsx';
import {Calendar} from 'react-native-calendars';
import useSWRMutation from 'swr/mutation';

type TaskActionsProps = {
  categoryId: string;
};

const createTaskRequest = async (url: string, {arg}: {arg: ITaskRequest}) => {
  try {
    await axiosInstance.post(url, {
      ...arg,
    });
  } catch (error) {
    console.log('Oops.! Something went wrong while creating task', error);
  }
};

export const today = new Date();
export const todayISODate = new Date();
todayISODate.setHours(0, 0, 0, 0);

export const TasksActions = ({categoryId}: TaskActionsProps) => {
  const [newTask, setNewTask] = useState<ITaskRequest>({
    categoryId: categoryId,
    date: todayISODate.toISOString(),
    isCompleted: false,
    name: '',
  });

  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);

  const {
    data: categories,
    isLoading,
    error,
  } = useSWR<ICategory[]>('categories', fetcher, {
    refreshInterval: 2000,
  });

  const {trigger} = useSWRMutation('tasks/create', createTaskRequest);

  const onCreateTask = async () => {
    try {
      if (newTask.name.length.toString().trim().length > 0) {
        await trigger({
          ...newTask,
        });
        setNewTask({
          categoryId: newTask.categoryId,
          date: todayISODate.toISOString(),
          isCompleted: false,
          name: '',
        });
      }
    } catch (error) {
      console.log('Error occurred while creating task', error);
    }
  };

  const selectedCategory = categories?.categories?.find(
    (_category: {_id: string}) => _category._id === newTask.categoryId,
  );

  if (isLoading || !categories) {
    return <Loader />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Box>
      <Box
        shadowOffset={{width: 0, height: 2}}
        shadowOpacity={0.7}
        shadowRadius={3.84}
        shadowColor={'sky300'}
        elevation={5}
        bg={'sky50'}
        py={'5'}
        px={'3'}
        mb={'3'}
        mx={'2'}
        borderRadius={'rounded-3xl'}
        flexDirection={'row'}
        position={'relative'}
        justifyContent={'space-between'}>
        <TextInput
          placeholder={'Create Task'}
          placeholderTextColor={'gray'}
          textAlignVertical={'center'}
          style={{
            paddingHorizontal: 16,
            borderRadius: 15,
            fontSize: 16,
            fontWeight: '600',
            width: '50%',
          }}
          value={newTask.name}
          onChangeText={text =>
            setNewTask(prevState => {
              return {
                ...prevState,
                name: text,
              };
            })
          }
          onSubmitEditing={onCreateTask}
        />
        <Box flexDirection={'column'} alignItems={'flex-end'}>
          <TouchableOpacity
            onPress={() => {
              setIsSelectingDate(prevState => !prevState);
            }}>
            <Box
              flexDirection={'row'}
              justifyContent={'center'}
              borderRadius={'rounded'}
              bg={'white'}
              p={'2'}
              my={'2'}>
              <Text variant={'textSm'} fontWeight={'600'} color={'gray700'}>
                {isToday(new Date(newTask.date))
                  ? 'Today'
                  : format(new Date(newTask.date).toISOString(), 'MMM-dd')}
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsSelectingCategory(prevState => !prevState);
            }}>
            <Box
              p={'2'}
              bg={'white'}
              flexDirection={'row'}
              alignItems={'center'}
              borderRadius={'rounded'}>
              <Box
                width={16}
                height={16}
                borderWidth={4}
                borderRadius={'rounded'}
                style={{
                  borderColor: selectedCategory?.color.code,
                }}
                mr={'1'}
              />
              <Text variant={'textSm'} mx={'1'} fontWeight={'600'}>
                {selectedCategory?.name}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
      {isSelectingCategory && (
        <Box alignItems={'flex-end'} justifyContent={'center'} my={'2'}>
          <FlatList
            data={categories?.categories}
            keyExtractor={item => item._id}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => {
                    setNewTask(prevState => {
                      return {
                        ...prevState,
                        categoryId: item._id,
                      };
                    });
                    setIsSelectingCategory(false);
                  }}>
                  <Box
                    bg={'gray200'}
                    px={'4'}
                    py={'3'}
                    borderBottomStartRadius={
                      categories?.categories.length - 1 === index
                        ? 'rounded-xl'
                        : 'none'
                    }
                    borderBottomEndRadius={
                      categories?.categories.length - 1 === index
                        ? 'rounded-xl'
                        : 'none'
                    }
                    borderTopStartRadius={index === 0 ? 'rounded-xl' : 'none'}
                    borderTopEndRadius={index === 0 ? 'rounded-xl' : 'none'}>
                    <Box flexDirection={'row'}>
                      <Text style={{fontSize: 16}}>{item.icon.symbol}</Text>
                      <Text
                        style={{fontSize: 16}}
                        mx={'2'}
                        fontWeight={
                          newTask.categoryId === item._id ? '800' : '500'
                        }>
                        {item.name}
                      </Text>
                    </Box>
                  </Box>
                </Pressable>
              );
            }}
          />
        </Box>
      )}
      {isSelectingDate && (
        <Box>
          <Calendar
            minDate={format(today, 'MM-dd')}
            onDayPress={date => {
              setIsSelectingDate(false);
              const selectedDate = new Date(date.dateString).toISOString();
              setNewTask(prevState => {
                return {
                  ...prevState,
                  date: selectedDate,
                };
              });
            }}
          />
        </Box>
      )}
    </Box>
  );
};
