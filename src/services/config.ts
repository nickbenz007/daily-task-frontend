import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://daily-task-backend.vercel.app/';
const TIMEOUT = 10000;
export const DAILY_TASK_TOKEN = 'token';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: TIMEOUT,
});

export const saveToken = async (key: string, value: string) => {
  try {
    if (value) {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (error) {
    console.error('An error occurred while saving Token', error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(async request => {
  try {
    const access_token = await AsyncStorage.getItem(DAILY_TASK_TOKEN);
    request.headers.Authorization = access_token;

    if (access_token) {
      request.headers.Authorization = `Bearer ${access_token}`;
    }
    return request;
  } catch (error) {
    console.log(error);
    return request;
  }
});

axiosInstance.interceptors.response.use(
  async response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized error occurred:', error.response);
      await AsyncStorage.removeItem(DAILY_TASK_TOKEN);
    } else {
      console.log('Request error:', error.response);
    }
    return Promise.reject(error.response);
  },
);

export const fetcher = (url: string) =>
  axiosInstance.get(url).then(res => res.data);

export default axiosInstance;
