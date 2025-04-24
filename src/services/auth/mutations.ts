import { useMutation } from '@tanstack/react-query'
import { LoginResponse } from './types'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'
import { User } from '@/types/user'
import { getMe, login, logout, register } from './api'
import { AUTH_KEYS } from './keys'

export const useLogin = () => {
  return useMutation<
    AxiosResponse<LoginResponse>,
    Error,
    { usernameOrEmail: string; password: string }
  >({
    mutationKey: [AUTH_KEYS.LOGIN],
    mutationFn: login,
    onSuccess: () => {
      toast.success('Login successfully!')
    },
    onError: () => {
      toast.error('Login failed!')
    },
  })
}

export const useRegister = () => {
  return useMutation<
    AxiosResponse<void>,
    Error,
    { username: string; email: string; password: string }
  >({
    mutationKey: [AUTH_KEYS.REGISTER],
    mutationFn: register,
    onSuccess: () => {
      toast.success('Register successfully!')
    },
    onError: () => {
      toast.error('Register failed!')
    },
  })
}

export const useGetCurrentUser = () => {
  return useMutation<AxiosResponse<User>, Error>({
    mutationKey: [AUTH_KEYS.ME],
    mutationFn: getMe,
  })
}

export const useLogout = () => {
  return useMutation<AxiosResponse, Error>({
    mutationKey: [AUTH_KEYS.LOGOUT],
    mutationFn: logout,
  })
}
