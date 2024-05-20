import React from 'react';
import {Box, Text} from '@/utils/theme';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenType} from '@/navigation/type.tsx';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import PressableView from '@/components/helper/PressableView.tsx';
import InputField from '@/components/helper/InputField.tsx';
import useGlobalUserStore from '@/store/useGlobalUserStore.ts';
import {Controller, useForm} from 'react-hook-form';
import {signInUser} from '@/services/api.ts';
import {IUser} from '@/types';

const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenType<'SignIn'>>();
  const [errorMessage, setErrorMessage] = useState('');
  const navigateToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  const {updateUser} = useGlobalUserStore();

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<Omit<IUser, 'name'>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: Omit<IUser, 'name'>) => {
    try {
      const {email, password} = data;
      const _user = await signInUser({
        email: email.toLowerCase(),
        password: password.trim().toLowerCase(),
      });
      console.log(_user);
      updateUser({
        email: _user.email,
        name: _user.name,
      });
      reset();
      setErrorMessage('');
    } catch (error) {
      console.log('Error during signing in', error);
      setErrorMessage(errors || 'An unknown error occurred');
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px={'5.5'} justifyContent={'center'}>
        <Text variant={'textXl'} color={'gray600'} mb={'12'}>
          Welcome back.!
        </Text>
        <Controller
          name={'email'}
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <InputField
              label={'Email'}
              placeholder={'Email'}
              value={value}
              onBlur={onBlur}
              error={errors.email}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name={'password'}
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <InputField
              label={'Password'}
              placeholder={'Password'}
              value={value}
              onBlur={onBlur}
              error={errors.password}
              onChangeText={onChange}
              secureTextEntry={true}
            />
          )}
        />
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text variant={'textSm'} color={'blu600'} fontWeight={'500'}>
            Don't have an account?{' '}
          </Text>
          <Text
            textAlign={'right'}
            color={'blu600'}
            variant={'textSm'}
            fontWeight={'700'}
            onPress={navigateToSignUpScreen}>
            Sign Up
          </Text>
        </Box>
        <Box mt={'12'} alignItems={'center'}>
          <PressableView label={'Sign In'} onPress={handleSubmit(onSubmit)} />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignInScreen;
