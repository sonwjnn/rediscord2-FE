'use client'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Spinner } from '@/components/spinner'
import {
  useNewVerification,
  useResendNewVerification,
} from '@/services/auth/mutations'
import { formatErrorMessage } from '@/lib/utils'
import Link from 'next/link'

export const NewVerificationForm = () => {
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
        setError(err?.message)
      })
  }, [email, resendNewVerification])

  useEffect(() => {
    onSubmit()
  }, [onSubmit, resendLoading])

  return (
    <CardWrapper
      headerLabel="Verify Email"
      headerDescription={`${
        !error
          ? `A verification email has been sent to ${email || 'your email'}.`
          : ''
      }`}
      type="verify-email"
    >
      <div className="flex flex-col w-full items-center justify-center">
        {!success && !error && <Spinner size="icon" />}
        <FormSuccess message={success} />
        {success && (
          <Link href="/auth/login">
            <p className="text-xs text-muted-foreground hover:underline mt-3">
              Back to login
            </p>
          </Link>
        )}
        {!success && <FormError message={error} />}
        {!success && (
          <button
            type="button"
            disabled={resendLoading}
            onClick={handleResendNewVerification}
            className="text-sm font-medium text-primary underline my-3"
          >
            Resend email
          </button>
        )}
      </div>
    </CardWrapper>
  )
}
