import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigation from './HomeStackNavigation.tsx';
import TodayScreen from '@/screens/today_screen';
import CompletedScreen from '@/screens/completed_screen';
import Icon from '@/components/helper/icons.tsx';
import {RootBottomTabParamList} from '@/navigation/type.tsx';
import CategoriesStackNavigator from '@/navigation/CategoriesStackNavigation.tsx';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/utils/theme';

const Tab = createBottomTabNavigator<RootBottomTabParamList>();
const BottomTabNavigation = () => {
  const theme = useTheme<Theme>();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          height: '12%',
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          fontStyle: 'normal',
          paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name={'HomeStack'}
        component={HomeStackNavigation}
        options={() => ({
          title: 'Home',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({color}) => <Icon name={'home'} color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={'Completed'}
        component={CompletedScreen}
        options={() => ({
          title: 'Completed',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({color}) => <Icon name={'completed'} color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={'Today'}
        component={TodayScreen}
        options={() => ({
          title: 'Today',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({color}) => <Icon name={'today'} color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={'CategoriesStack'}
        component={CategoriesStackNavigator}
        options={() => ({
          title: 'Categories',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({color}) => <Icon name={'categories'} color={color} />,
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
