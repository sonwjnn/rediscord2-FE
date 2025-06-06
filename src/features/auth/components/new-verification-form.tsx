'use client'

import { CardWrapper } from '@/features/auth/components/card-wrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Spinner } from '@/components/spinner'
import { useResendNewVerification } from '@/features/auth/api/use-resend-new-verification'
import { useNewVerification } from '@/features/auth/api/use-new-verification'
import { formatErrorMessage } from '@/lib/utils'

export const NewVerificationForm = () => {
  const router = useRouter()
  const { mutateAsync: newVerification } = useNewVerification()
  const { mutateAsync: resendNewVerification, isPending: resendLoading } =
    useResendNewVerification()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams?.get('token') || ''
  const email = searchParams?.get('email') || ''

  const onSubmit = useCallback(async () => {
    if (success || error) return

    if (!token) {
      setError('Missing token!')
      return
    }

    await newVerification({ token })
      .then(() => {
        setSuccess('Email verified successfully!')
        setError(undefined)
      })
      .catch(err => {
        setError(formatErrorMessage(err?.message))
      })
  }, [token, newVerification, error, success])

  const handleResendNewVerification = useCallback(async () => {
    if (!email) {
      setError('Missing email!')
      return
    }

    await resendNewVerification({ email })
      .then(() => {
        setSuccess('Resend email successfully!')
        setError(undefined)
      })
      .catch(err => {
        setError(formatErrorMessage(err?.message))
      })
  }, [email, resendNewVerification])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Verify your email account"
      headerDescription={`${
        !error ? `We have sent a link to ${email || 'your email'}.` : ''
      }`}
      type="verify-email"
    >
      <div className="flex flex-col w-full items-center justify-center">
        {!success && !error && <Spinner className="text-primary" />}
        <FormSuccess message={success} />
        {!success && !resendLoading && <FormError message={error} />}
        {!success && (
          <div className="text-xs text-primary text-pretty my-3">
            Didn&apos;t get your email?{' '}
            <button
              type="button"
              disabled={resendLoading}
              onClick={handleResendNewVerification}
              className="text-xs underline text-sky-500 cursor-pointer disabled:opacity-50"
            >
              Resend the code
            </button>{' '}
            or{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/register')}
              className="text-xs underline text-sky-500 cursor-pointer disabled:opacity-50"
            >
              update your email address.
            </button>
          </div>
        )}
      </div>
    </CardWrapper>
  )
}
