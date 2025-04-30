import publicClient from '@/services/client/public-client'
import privateClient from '@/services/client/private-client'

import { ENDPOINTS } from '@/services/endpoints'

import { LoginResponse } from './types'
import { User } from '@/types/user'

export const login = async ({
  usernameOrEmail,
  password,
}: {
  usernameOrEmail: string
  password: string
}) => {
  const response = await publicClient.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    {
      usernameOrEmail,
      password,
    },
  )

  return response
}

export const loginGoogle = async ({ token }: { token: string }) => {
  const response = await publicClient.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN_GOOGLE,
    { token },
  )
  return response
}

export const register = async ({
  username,
  email,
  password,
}: {
  username: string
  email: string
  password: string
}) => {
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
