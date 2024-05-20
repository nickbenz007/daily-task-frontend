import axiosInstance, {DAILY_TASK_TOKEN, saveToken} from './config.ts';
import {IUser} from '@/types';

type SignUpUserTypes = IUser;

export const signUpUser = async ({name, email, password}: SignUpUserTypes) => {
  try {
    const response = await axiosInstance.post('users/create', {
      name,
      email,
      password,
    });
    return response.data.user;
  } catch (error: any) {
    console.log('Error while Signing Up User', error);
    throw error;
  }
};

type SignInUserTypes = Omit<IUser, 'name'>;

export const signInUser = async ({email, password}: SignInUserTypes) => {
  try {
    if (!email || !password) {
      throw new Error('Email or password is undefined');
    }
    const response = await axiosInstance.post('users/login', {
      email,
      password,
    });
    if (response && response.data.token) {
      const _token = response.data.token;
      axiosInstance.defaults.headers.common.Authorization = _token;
      await saveToken(DAILY_TASK_TOKEN, _token);
      return response?.data;
    } else {
      throw new Error('Empty response received');
    }
  } catch (error) {
    console.error('An error occurred while signing in', error);
    throw new Error('Oops! Something went wrong');
  }
};
