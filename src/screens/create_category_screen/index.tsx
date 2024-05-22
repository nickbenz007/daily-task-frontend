import React, {useState} from 'react';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import {Box, Text, Theme} from '@/utils/theme';
import NavigateBack from '@/components/helper/navigate_back.tsx';
import {Pressable, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {ICategory, ICategoryRequest, IColor, IIcon} from '@/types';
import {getColors, getIcons} from '@/utils/helpers';
import PressableView from '@/components/helper/PressableView.tsx';
import useSWRMutation from 'swr/mutation';
import axiosInstance, {BASE_URL} from '@/services/config.ts';
import {useSWRConfig} from 'swr';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CategoriesStackParamList} from '@/navigation/type.tsx';
import Entypo from 'react-native-vector-icons/Entypo';

type CreateCategoryRouteTypes = RouteProp<
  CategoriesStackParamList,
  'CreateCategory'
>;

const CreateCategoryScreen = () => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const route = useRoute<CreateCategoryRouteTypes>();
  const COLORS = getColors();
  const ICONS = getIcons();

  const DEFAULT_COLORS = COLORS[0];
  const DEFAULT_ICONS = ICONS[0];

  const createCategoryRequest = async (
    url: string,
    {arg}: {arg: ICategoryRequest},
  ) => {
    try {
      await axiosInstance.post(url, {...arg});
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategoryRequest = async (
    url: string,
    {arg}: {arg: ICategoryRequest},
  ) => {
    try {
      await axiosInstance.put(url, {...arg});
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategoryRequest = async (
    url: string,
    {arg}: {arg: {id: string}},
  ) => {
    try {
      await axiosInstance.delete(url + '/' + arg.id);
    } catch (error) {
      console.error(error);
    }
  };

  const isEditing = route.params.category ? true : false;

  const {trigger} = useSWRMutation('categories/create', createCategoryRequest);

  const {trigger: updateTrigger} = useSWRMutation(
    'categories/category/update',
    updateCategoryRequest,
  );

  const {trigger: deleteTrigger} = useSWRMutation(
    'categories/category',
    deleteCategoryRequest,
  );

  const {mutate: mutate} = useSWRConfig();

  const [createCategory, setCreateCategory] = useState<
    Omit<ICategory, '_id' | 'user' | 'isEditable'>
  >({
    name: route.params.category?.name ?? '',
    color: route.params.category?.color ?? DEFAULT_COLORS,
    icon: route.params.category?.icon ?? DEFAULT_ICONS,
  });

  const createNewCategory = async () => {
    try {
      if (isEditing) {
        const updateCategoryItem = {
          ...route.params.category,
          ...createCategory,
        };
        await updateTrigger({
          ...updateCategoryItem,
        });
      } else {
        await trigger({
          ...createCategory,
        });
      }
      await mutate(BASE_URL + 'categories');
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const updateColor = (color: IColor) => {
    setCreateCategory(prevState => {
      return {
        ...prevState,
        color,
      };
    });
  };
  const updateIcon = (icon: IIcon) => {
    setCreateCategory(prevState => {
      return {
        ...prevState,
        icon,
      };
    });
  };

  const deleteCategory = async () => {
    try {
      if (isEditing && route.params.category?._id) {
        await deleteTrigger({
          id: route.params.category?._id,
        });
      }
      await mutate(BASE_URL + 'categories');
      navigation.goBack();
    } catch (error) {
      console.log(error, 'Error occurred while deleting category');
      throw error;
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx={'2'}>
        <Box height={16} />
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <NavigateBack />
          {isEditing && (
            <Pressable onPress={deleteCategory}>
              <Box
                p={'2'}
                bg={'red50'}
                elevation={3}
                shadowOffset={{width: 0, height: 2}}
                shadowOpacity={0.7}
                shadowColor={'gray400'}
                shadowRadius={3.84}
                borderRadius={'rounded-7xl'}>
                <Entypo name={'trash'} color={'crimson'} size={20} />
              </Box>
            </Pressable>
          )}
        </Box>
        <Box height={16} />
        <Box bg={'gray250'} borderRadius={'rounded-2xl'}>
          <TextInput
            value={createCategory.name}
            maxLength={36}
            placeholder={'Create a category'}
            placeholderTextColor={theme.colors.gray400}
            style={{
              fontSize: 16,
              lineHeight: 20,
              paddingHorizontal: 20,
              paddingVertical: 20,
              color: 'black',
            }}
            onChangeText={text => {
              setCreateCategory(prevState => {
                return {...prevState, name: text};
              });
            }}
          />
        </Box>
        <Box height={14} />
        <Box bg={'blu50'} borderRadius={'rounded-2xl'} p={'4'}>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Box
              bg={'white'}
              width={80}
              p={'2'}
              mb={'4'}
              borderRadius={'rounded-2xl'}
              alignItems={'center'}>
              <Text
                variant={'textLg'}
                fontWeight={'700'}
                color={createCategory.color.name as any}>
                Color
              </Text>
            </Box>
            <Box ml={'4'}>
              <Text variant={'textSm'} fontWeight={'700'} color={'gray600'}>
                Select a Color
              </Text>
            </Box>
          </Box>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-evenly'}>
            {COLORS.map(_color => {
              return (
                <TouchableOpacity
                  key={_color.id}
                  onPress={() => {
                    updateColor(_color);
                  }}>
                  <Box
                    m={'2'}
                    height={24}
                    width={24}
                    borderRadius={'rounded-7xl'}
                    alignItems={'center'}
                    style={{
                      backgroundColor: _color.code,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </Box>
        </Box>
        <Box height={14} />
        <Box bg={'sky50'} borderRadius={'rounded-2xl'} p={'4'}>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Box
              bg={'white'}
              width={80}
              p={'1'}
              mb={'4'}
              borderRadius={'rounded-2xl'}
              alignItems={'center'}>
              <Text variant={'textXl'} fontWeight={'600'}>
                {createCategory.icon.symbol}
              </Text>
            </Box>
            <Box ml={'4'}>
              <Text variant={'textSm'} fontWeight={'700'} color={'gray600'}>
                Select an Icon
              </Text>
            </Box>
          </Box>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-evenly'}>
            {ICONS.map(icon => {
              return (
                <TouchableOpacity
                  key={icon.id}
                  onPress={() => {
                    updateIcon(icon);
                  }}>
                  <Box
                    bg={'white'}
                    height={40}
                    width={40}
                    borderRadius={'rounded-7xl'}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Text variant={'textXl'}>{icon.symbol}</Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </Box>
        <Box
          position={'absolute'}
          left={0}
          right={0}
          bottom={20}
          alignItems={'center'}>
          <PressableView
            label={isEditing ? 'Edit & Update Category' : 'Create New Category'}
            uppercase={true}
            onPress={createNewCategory}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategoryScreen;
