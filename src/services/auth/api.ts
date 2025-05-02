import publicClient from '@/services/client/public-client'
import privateClient from '@/services/client/private-client'

import { ENDPOINTS } from '@/services/endpoints'

import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ReactOauthLoginRequest,
  RegisterRequest,
  ResendNewVerificationRequest,
  ResetPasswordRequest,
  SocialLoginRequest,
} from './types'
import { User } from '@/types/user'

export const login = async ({ usernameOrEmail, password }: LoginRequest) => {
  const response = await publicClient.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    {
      usernameOrEmail,
      password,
    },
  )

  return response
}

export const loginSocial = async (props: SocialLoginRequest) => {
  const endpoint = (() => {
    switch (props.type) {
      case 'google':
        return ENDPOINTS.AUTH.LOGIN_GOOGLE
      case 'github':
        return ENDPOINTS.AUTH.LOGIN_GITHUB
      default:
        return ENDPOINTS.AUTH.LOGIN_GOOGLE
    }
  })()

  const response = await publicClient.post<LoginResponse>(endpoint, {
    idToken: props.idToken,
  })
  return response
}

export const loginReactOauth = async ({
  accessToken,
}: ReactOauthLoginRequest) => {
  const response = await publicClient.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN_GOOGLE,
    {
      accessToken,
    },
  )
  return response
}

export const register = async ({
  username,
  email,
  password,
}: RegisterRequest) => {
  const response = await publicClient.post<void>(ENDPOINTS.AUTH.REGISTER, {
    username,
    email,
    password,
  })
  return response
}

export const getMe = async () => {
  const response = await privateClient.get<User>(ENDPOINTS.AUTH.ME)
  return response
}

export const logout = async () => {
  const response = await privateClient.post(ENDPOINTS.AUTH.LOGOUT)

  return response
}

export const newVerification = async ({ token }: { token: string }) => {
  const response = await publicClient.post(ENDPOINTS.AUTH.CONFIRM_EMAIL, {
    token,
  })

  return response
}

export const resendNewVerification = async ({
  email,
}: ResendNewVerificationRequest) => {
  const response = await publicClient.post(
    ENDPOINTS.AUTH.RESEND_CONFIRM_EMAIL,
    { email },
  )

  return response
}

export const forgotPassword = async ({ email }: ForgotPasswordRequest) => {
  const response = await publicClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
    email,
  })

  return response
}

export const resetPassword = async ({
  hash,
  password,
}: ResetPasswordRequest) => {
  const response = await publicClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
    hash,
    password,
  })

  return response
}
