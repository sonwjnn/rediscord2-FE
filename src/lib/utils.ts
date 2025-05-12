import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const errorMapping: Record<string, string> = {
  emailNotVerified: 'Email not verified! Please check your email.',
  emailVerified: 'Email verified!',
  tokenNotFound: 'Invalid token!',
  tokenExpired: 'Token expired!',
  userNotFound: 'User not exists!',
  isSocialAccount: 'This email is already in use with different provider!',
  incorrectPassword: 'Incorrect password!',
  emailExists: 'Email already exists!',
  usernameExists: 'Username already exists!',
  samePassword: 'New password cannot be the same as the old password!',
}

export const formatErrorMessage = (message: string | null) => {
  if (!message) return 'Something went wrong!'

  return errorMapping[message] || message
}

export const getS3ImageUrlByPath = (path: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_S3_URL || 'https://sondraw.s3.amazonaws.com'
  return `${baseUrl}/${path}`
}
