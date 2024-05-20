import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoriesScreen from '@/screens/categories_screen';
import CategoryScreen from '@/screens/category_screen';
import {CategoriesStackParamList} from '@/navigation/type.tsx';
import CreateCategoryScreen from '@/screens/create_category_screen';

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

const CategoriesStackNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={'Categories'}
          component={CategoriesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Category'}
          component={CategoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'CreateCategory'}
          component={CreateCategoryScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default CategoriesStackNavigator;
