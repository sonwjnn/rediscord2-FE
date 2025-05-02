import { useMutation } from '@tanstack/react-query'
import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  NewVerificationResponse,
  ReactOauthLoginRequest,
  RegisterRequest,
  ResendNewVerificationRequest,
  ResetPasswordRequest,
  SocialLoginRequest,
} from './types'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'
import { User } from '@/types/user'
import {
  forgotPassword,
  getMe,
  login,
  loginReactOauth,
  loginSocial,
  logout,
  newVerification,
  register,
  resendNewVerification,
  resetPassword,
} from './api'
import { AUTH_KEYS } from './keys'

export const useLogin = () => {
  return useMutation<AxiosResponse<LoginResponse>, Error, LoginRequest>({
    mutationKey: [AUTH_KEYS.LOGIN],
    mutationFn: login,
    onSuccess: () => {
      toast.success('Login successfully!')
    },
    onError: err => {
      return err
    },
  })
}

export const useSocialLogin = () => {
  return useMutation<AxiosResponse<LoginResponse>, Error, SocialLoginRequest>({
    mutationKey: [AUTH_KEYS.SOCIAL_LOGIN],
    mutationFn: loginSocial,
    onSuccess: () => {
      toast.success('Login successfully!')
    },
    onError: () => {
      toast.error('Login failed!')
    },
  })
}

export const useReactOauthLogin = () => {
  return useMutation<
    AxiosResponse<LoginResponse>,
    Error,
    ReactOauthLoginRequest
  >({
    mutationKey: [AUTH_KEYS.LOGIN],
    mutationFn: loginReactOauth,
    onSuccess: () => {
      toast.success('Login successfully!')
    },
    onError: () => {
      toast.error('Login failed!')
    },
  })
}

export const useRegister = () => {
  return useMutation<AxiosResponse<void>, Error, RegisterRequest>({
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

export const useNewVerification = () => {
  return useMutation<
    AxiosResponse<NewVerificationResponse>,
    Error,
    { token: string }
  >({
    mutationKey: [AUTH_KEYS.CONFIRM_EMAIL],
    mutationFn: newVerification,
  })
}

export const useResendNewVerification = () => {
  return useMutation<AxiosResponse, Error, ResendNewVerificationRequest>({
    mutationKey: [AUTH_KEYS.RESEND_CONFIRM_EMAIL],
    mutationFn: resendNewVerification,
  })
}

export const useForgotPassword = () => {
  return useMutation<AxiosResponse, Error, ForgotPasswordRequest>({
    mutationKey: [AUTH_KEYS.FORGOT_PASSWORD],
    mutationFn: forgotPassword,
  })
}

export const useResetPassword = () => {
  return useMutation<AxiosResponse, Error, ResetPasswordRequest>({
    mutationKey: [AUTH_KEYS.RESET_PASSWORD],
    mutationFn: resetPassword,
  })
}
