import { NewVerificationForm } from '@/components/auth/new-verification-form'
import { Suspense } from 'react'

const ConfirmEmailPage = () => {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  )
}

export default ConfirmEmailPage
