export enum CleaningDelayEnum {
  FOUR_HOURS,
  ONE_HOUR,
  THIRTY_MINUTE,
  DO_NOT_CLEAN,
}

export enum StatusEnum {
  ONLINE,
  IDLE,
  DND,
  OFFLINE,
  MOBILE,
}

export type ProviderType = 'google' | 'github'

export interface ProviderConfig {
  issuerUrl: string
  clientId: string
  redirectUri: string
  clientSecret?: string
  scopes: string
  algorithm?: 'oauth2' | 'oidc'
  authorizationEndpoint?: string
  tokenEndpoint?: string
}

export interface UseOAuthOptions {
  onLoginSuccess?: () => void
  onLoginError?: (error: Error) => void
}

export type FileType = {
  id: string
  path: string
}

export enum UserFileTypeEnum {
  DESIGN = 'DESIGN',
  PROFILE = 'PROFILE',
}

export type User = {
  id: string
  name?: string
  username: string
  password?: string
  email: string
  emailVerified?: Date
  imageUrl?: string
  isTwoFactorEnabled: boolean
  createdAt: Date
}
