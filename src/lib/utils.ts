import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const errorMapping: Record<string, string> = {
  emailNotVerified: 'Email not verified!',
  tokenNotFound: 'Invalid token!',
  tokenExpired: 'Token expired!',
  userNotFound: 'User not found!',
  isSocialAccount: 'This email is already in use with different provider!',
  incorrectPassword: 'Incorrect password!',
  emailExists: 'Email already exists!',
  usernameExists: 'Username already exists!',
}

export const formatErrorMessage = (message: string | null) => {
  if (!message) return 'Something went wrong!'

  return errorMapping[message] || message
}
