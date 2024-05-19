import React from 'react';
import {Box, Text} from '../../utils/theme';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenType} from '../../navigation/type.tsx';

const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenType<'SignIn'>>();
  const navigateToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };
  return (
    <Box>
      <Text>Don't have an account let's SignUp</Text>
      <Button title={'SignUp'} onPress={navigateToSignUpScreen} />
    </Box>
  );
};

export default SignInScreen;
