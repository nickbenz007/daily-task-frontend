import React from 'react';
import {Box, Text} from '@/utils/theme';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationType} from '@/navigation/type.tsx';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import PressableView from '@/components/helper/PressableView.tsx';
import InputField from '@/components/helper/InputField.tsx';
import {signUpUser} from '@/services/api.ts';
import {Controller, useForm} from 'react-hook-form';
import {IUser} from '@/types';

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignIn'>>();
  const navigateToSignInScreen = () => {
    navigation.navigate('SignIn');
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<IUser>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      const {name, email, password} = data;
      const response = await signUpUser({
        name,
        email: email.toLowerCase(),
        password,
      });
      reset();
      navigateToSignInScreen();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px={'5.5'} justifyContent={'center'}>
        <Text variant={'textXl'} color={'gray600'}>
          Welcome to Daily Task.!
        </Text>
        <Text variant={'textXl'} color={'gray600'} mb={'6'}>
          Start your journey here
        </Text>
        <Controller
          name={'name'}
          control={control}
          rules={{required: {value: true, message: 'Please enter your name.'}}}
          render={({field: {onChange, onBlur, value}}) => (
            <InputField
              onBlur={onBlur}
              value={value}
              error={errors.name}
              onChangeText={onChange}
              label={'Name'}
              placeholder={'Name'}
            />
          )}
        />
        <Controller
          control={control}
          rules={{required: true}}
          name={'email'}
          render={({field: {onChange, onBlur, value}}) => (
            <InputField
              label={'Email'}
              placeholder={'Email'}
              value={value}
              error={errors.email}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          rules={{required: true}}
          name={'password'}
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
            Already have an account?{' '}
          </Text>
          <Text
            textAlign={'right'}
            color={'blu600'}
            variant={'textSm'}
            fontWeight={'700'}
            onPress={navigateToSignInScreen}>
            Sign In
          </Text>
        </Box>
        <Box mt={'12'} alignItems={'center'}>
          <PressableView label={'Sign Up'} onPress={handleSubmit(onSubmit)} />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;
