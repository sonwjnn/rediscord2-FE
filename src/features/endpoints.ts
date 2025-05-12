export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    REFRESH_TOKEN: 'auth/refresh',
    CONFIRM_EMAIL: 'auth/email/confirm',
    RESEND_CONFIRM_EMAIL: 'auth/email/confirm/resend',
    LOGOUT: 'auth/logout',
    ME: 'auth/me',
    FORGOT_PASSWORD: 'auth/forgot/password',
    RESET_PASSWORD: 'auth/reset/password',
    LOGIN_GOOGLE: 'auth/google/login',
    LOGIN_GITHUB: 'auth/github/login',
  },

  USER: {
    GET_BY_ID: (id: string) => `users/${id}`,
    EDIT_BY_ID: (id: string) => `users/${id}`,
    GET_BY_EMAIL: (email: string) => `users/email/${email}`,
  },
  PROJECTS: {
    CREATE: 'projects',
    GET_TEMPLATES: 'projects/templates',
    GET_MY_PROJECTS: 'projects',
    GET_BY_ID: (id: string) => `projects/${id}`,
    EDIT_BY_ID: (id: string) => `projects/${id}`,
    DELETE_BY_ID: (id: string) => `projects/${id}`,
    DUPLICATE_BY_ID: (id: string) => `projects/${id}/duplicate`,
  },
  SUBSCRIPTIONS: {
    BILLING: 'payment/billing',
    CHECKOUT: 'payment/create-checkout-session',
    GET_CURRENT: 'payment/subscription',
  },
  USER_FILES: {
    UPLOAD: 'user-files/upload',
    GET_BY_USER_ID: 'user-files',
  },
  UNSPLASH: {
    GET_RANDOM: 'unsplash/random',
    GET_BY_KEYWORD: 'unsplash/search',
  },
  AI: {
    REMOVE_BG: 'replicate/remove-bg',
    GENERATE_IMAGE: 'replicate/generate-image',
  },
} as const
