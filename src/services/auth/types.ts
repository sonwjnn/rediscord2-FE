import { ProviderType } from '@/types/user'

export type LoginRequest = {
  usernameOrEmail: string
  password: string
}

export type RegisterRequest = {
  username: string
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  tokenExpires: number
}

export type RefreshReponse = {
  accessToken: string
  refreshToken: string
  tokenExpires: number
}

export type SocialLoginRequest = {
  idToken: string
  type: ProviderType
}

export type ReactOauthLoginRequest = {
  accessToken: string
}

export type NewVerificationRequest = {
  token: string
}

export type NewVerificationResponse = {
  email: string
  success?: string
  error?: string
}

export type ResendNewVerificationRequest = {
  email: string
}

export type ForgotPasswordRequest = {
  email: string
}

export type ResetPasswordRequest = {
  hash: string
  password: string
}
