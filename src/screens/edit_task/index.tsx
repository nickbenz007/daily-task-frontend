import React, {useState} from 'react';
import {Box, Text} from '@/utils/theme';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import NavigateBack from '@/components/helper/navigate_back.tsx';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlatList, Pressable, TextInput, TouchableOpacity} from 'react-native';
import {format, isToday} from 'date-fns';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {HomeStackParamList} from '@/navigation/type.tsx';
import useSWR, {useSWRConfig} from 'swr';
import {ICategory, ITask} from '@/types';
import axiosInstance, {fetcher} from '@/services/config.ts';
import useSWRMutation from 'swr/mutation';
import {Loader} from '@/components/helper/Loader.tsx';
import {Calendar} from 'react-native-calendars';
import {today} from '@/components/tasks/tasks_actions.tsx';

type EditTaskRouteProps = RouteProp<HomeStackParamList, 'Home'>;

const updateTaskRequest = async (url: string, {arg}: {arg: ITask}) => {
  try {
    await axiosInstance.put(url + '/' + arg._id, {
      ...arg,
    });
  } catch (e) {
    console.error(e);
  }
};

const deleteTaskRequest = async (url: string, {arg}: {arg: {id: string}}) => {
  try {
    await axiosInstance.delete(url + '/' + arg.id);
  } catch (e) {
    console.error(e);
  }
};

const EditTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<EditTaskRouteProps>();
  const {task} = route.params;
  const [updatedTask, setUpdatedTask] = useState<ITask>(task);

  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);

  const {mutate} = useSWRConfig();

  const {
    data: categories,
    isLoading,
    error,
  } = useSWR<ICategory[]>('categories', fetcher);

  const selectedCategory = categories?.categories?.find(
    (_category: {_id: string}) => _category._id === updatedTask.categoryId,
  );

  const {trigger} = useSWRMutation('tasks/edit-task', updateTaskRequest);
  const {trigger: triggerDelete} = useSWRMutation('tasks/', deleteTaskRequest);

  const updateTask = async () => {
    try {
      if (updatedTask.name.length.toString().trim().length > 0) {
        await trigger({...updatedTask});
        await mutate('tasks/');
      }
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async () => {
    try {
      await triggerDelete({
        id: task._id,
      });
      await mutate('tasks/');
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !categories?.categories) {
    return <Loader />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <SafeAreaWrapper>
      <Box mx={'2'} p={'2'}>
        <Box
          mt={'2'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <NavigateBack />
          <Pressable onPress={deleteTask}>
            <Box
              p={'3'}
              bg={'gray200'}
              shadowOffset={{width: 0, height: 2}}
              shadowOpacity={0.7}
              shadowRadius={3.84}
              shadowColor={'gray300'}
              elevation={3}
              borderRadius={'rounded-7xl'}
              alignItems={'center'}>
              <Entypo name={'trash'} color={'crimson'} size={22} />
            </Box>
          </Pressable>
        </Box>
        <Box height={20} />
        <Box
          py={'5'}
          px={'3'}
          mb={'4'}
          borderRadius={'rounded-3xl'}
          shadowOffset={{width: 0, height: 2}}
          shadowOpacity={0.7}
          shadowRadius={3.84}
          shadowColor={'sky300'}
          elevation={5}
          bg={'sky50'}
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
              fontWeight: '400',
              width: '50%',
              color: 'black',
            }}
            value={updatedTask.name}
            onChangeText={text =>
              setUpdatedTask(prevState => {
                return {
                  ...prevState,
                  name: text,
                };
              })
            }
            onSubmitEditing={updateTask}
          />

          <Box
            flexDirection={'column'}
            alignItems={'flex-end'}
            justifyContent={'center'}>
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
                mb={'2'}>
                <Text fontWeight={'600'} color={'gray700'}>
                  {isToday(new Date(updatedTask.date))
                    ? 'Date'
                    : format(new Date(updatedTask.date), 'MMM-dd')}
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsSelectingCategory(prevState => !prevState);
              }}>
              <Box
                p={'2'}
                bg={'green100'}
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
                <Text mx={'1'} fontWeight={'600'} color={'black'}>
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
                      setUpdatedTask(prevState => {
                        return {
                          ...prevState,
                          categoryId: item._id,
                        };
                      });
                      setIsSelectingCategory(false);
                    }}>
                    <Box
                      bg={'gray200'}
                      p={'2'}
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
                        <Text>{item.icon.symbol}</Text>
                        <Text
                          mx={'3'}
                          fontWeight={
                            updatedTask.categoryId === item._id ? '700' : '400'
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
              onDayPress={day => {
                setIsSelectingDate(false);
                const selectedDate = new Date(day.dateString).toISOString();
                setUpdatedTask(prevState => {
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
    </SafeAreaWrapper>
  );
};

export default EditTaskScreen;
