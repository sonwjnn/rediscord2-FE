import * as z from 'zod'

export const LoginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, { message: 'Email or username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Minimun 6 characters required' }),
  username: z
    .string()
    .min(1, { message: 'User name is required' })
    .refine(name => !name.includes(' '), {
      message: 'User name cannot contain spaces',
    }),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
})

export const ResetSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters is required',
  }),
})

export const UserSchema = z.object({
  name: z.string().min(1, { message: 'User name is required' }),
  image: z.string().min(1, { message: 'User image is required' }),
})
