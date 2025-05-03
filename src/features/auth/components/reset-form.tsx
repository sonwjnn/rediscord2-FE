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
import { ResetSchema } from '@/schemas'
import { useResetPassword } from '@/features/auth/api/use-reset-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const ResetForm = () => {
  const { mutateAsync: resetPassword, isPending: resetPasswordLoading } =
    useResetPassword()

  const searchParams = useSearchParams()

  const token = searchParams?.get('token')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('')
    setSuccess('')

    if (!token) {
      setError('Missing token!')
      return
    }

    resetPassword({ hash: token!, password: values.password })
      .then(() => {
        setSuccess('Reset password successfully!')
        setError(undefined)
      })
      .catch(err => {
        setError(formatErrorMessage(err?.message))
      })
  }

  return (
    <CardWrapper
      headerLabel="Enter a new password?"
      headerDescription=" Enter a new password to continue."
      type="reset-password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    disabled={resetPasswordLoading}
                    placeholder="Password"
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
            disabled={resetPasswordLoading}
          >
            {resetPasswordLoading ? <Spinner className="mr-2" /> : null}
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
