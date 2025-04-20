const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ACCOUNT_ENDPOINTS = {
  GET_BY_USER_ID: (userId: string) => `${API_URL}/accounts/user/${userId}`,
} as const;