import axios from 'axios';
import { API_BASE_URL } from '@/services/endpoints';
import { createSessionCookies } from '@/lib/tokenCookies';

const publicClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

publicClient.interceptors.request.use(
  (config) => {
    // add anything before request is sent
    return config;
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  },
);

publicClient.interceptors.response.use(
  (response) => {
    const token = response.data?.accessToken;
    const refreshToken = response.data?.refreshToken;

    createSessionCookies({ token, refreshToken });

    return response;
  },
  () => {
    // Do something with response error
    throw new Error('Something went wrong');
  },
);

export default publicClient;
