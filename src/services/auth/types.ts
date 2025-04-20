export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
}

export type RefreshReponse = {
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
}