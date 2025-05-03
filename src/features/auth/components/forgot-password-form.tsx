'use client'

import { CardWrapper } from '@/features/auth/components/card-wrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formatErrorMessage } from '@/lib/utils'
import { ForgotPasswordSchema } from '@/schemas'
import { useForgotPassword } from '@/features/auth/api/use-forgot-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const ForgotPasswordForm = () => {
  const { mutateAsync: forgotPassword, isPending: forgotPasswordLoading } =
    useForgotPassword()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError('')
    setSuccess('')

    forgotPassword(values)
      .then(() => {
        setSuccess('Link has been sent to your email!')
        setError(undefined)
      })
      .catch(err => {
        setError(formatErrorMessage(err?.message))
      })
  }

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      headerDescription="Enter your email address and we will send you a password reset link."
      type="forgot-password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    disabled={forgotPasswordLoading}
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            className="w-full"
            type="submit"
            size="lg"
            disabled={forgotPasswordLoading}
          >
            {forgotPasswordLoading ? <Spinner className="mr-2" /> : null}
            Send
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
