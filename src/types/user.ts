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

export type providerType = 'google' | 'github'

export type SocialProvider = 'google' | 'github';

export interface ProviderConfig {
  issuerUrl: string;
  clientId: string;
  clientSecret: string;
  scopes: string;
  authorizationEndpoint?: string;
  tokenEndpoint?: string;
}

export interface UseOAuthOptions {
  redirectUri?: string;
  onLoginSuccess?: () => void;
  onLoginError?: (error: Error) => void;
}

export type User = {
  id: string
  name?: string
  password?: string
  email: string
  emailVerified?: Date
  image?: string
  isTwoFactorEnabled: boolean
  createdAt: Date
}
