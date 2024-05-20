import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppStackParamList} from './type.tsx';
import BottomTabNavigation from './BottomTabStackNavigation.tsx';

const Tab = createBottomTabNavigator<AppStackParamList>();

const AppStackNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Root'}
        component={BottomTabNavigation}
        options={{
          tabBarStyle: {height: 0},
          headerShown: false,
          tabBarLabel: '',
          tabBarButton: () => null,
        }}
        initialParams={{}}
      />
    </Tab.Navigator>
  );
};

export default AppStackNavigation;
