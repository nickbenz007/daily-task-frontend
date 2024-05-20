import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from './type.tsx';
import HomeScreen from '../screens/home_screen';
import EditTaskScreen from '../screens/edit_task';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'EditTask'}
        component={EditTaskScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
