import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '@/services/endpoints';
import { LoginResponse } from './types';
import { AxiosResponse } from 'axios';
import publicClient from '@/services/client/publicClient';
import { toast } from 'sonner';
import { User } from '@/types/user';
import privateClient from '../client/privateClient';


export const useLogin = () => {
  return useMutation<
    AxiosResponse<LoginResponse>,
    Error,
    { usernameOrEmail: string; password: string }
  >({
    mutationKey: ['login'],
    mutationFn: async ({ usernameOrEmail, password }) => {
      const response = await publicClient.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
        usernameOrEmail,
        password,
      });
      return response;
    },
    onSuccess: () => {
      toast.success('Login successfully!')
    },
    onError: () => {
      toast.error('Login failed!')
    },
  });
};

export const useRegister = () => {
  return useMutation<
    AxiosResponse<void>,
    Error,
    { username: string; email: string; password: string }
  >({
    mutationKey: ['register'],
    mutationFn: async ({ username, email, password }) => {
      const response = await publicClient.post<void>(ENDPOINTS.AUTH.REGISTER, {
        username,
        email,
        password,
      });
      return response;
    },
    onSuccess: () => {
      toast.success('Register successfully!')
    },
    onError: () => {
      toast.error('Register failed!')
    },
  });
};


export const useGetCurrentUser = () => {
  return useMutation<AxiosResponse<User>, Error>({
    mutationKey: ['me'],
    mutationFn: async () => {
      const response = await privateClient.get<User>(ENDPOINTS.AUTH.ME);
      return response;
    },
  });
};

// export const useLogout = () => {
//   return useMutation<void, Error>({
//     mutationKey: ['logout'],
//     mutationFn: async () => {
//       await publicClient.post(ENDPOINTS.AUTH.LOGOUT);
//     },
//     onSuccess: () => {
//       toast({
//         variant: 'default',
//         title: 'Logout success!',
//       });
//     },
//     onError: (err) => {
//       toast({
//         variant: 'destructive',
//         title: 'Logout failed!',
//       });
//       console.log(err);
//     },
//   });
// };
