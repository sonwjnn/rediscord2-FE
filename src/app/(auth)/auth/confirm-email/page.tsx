import { NewVerificationForm } from '@/features/auth/components/new-verification-form'
import { Suspense } from 'react'

const ConfirmEmailPage = () => {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  )
}

export default ConfirmEmailPage
