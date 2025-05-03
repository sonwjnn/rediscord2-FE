import { LoginForm } from '@/features/auth/components/login-form'
import { Suspense } from 'react'

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage
