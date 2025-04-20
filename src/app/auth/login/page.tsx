"use client"

import { LoginForm } from '@/components/auth/login-form'
import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    redirect("/")
  }

  return <LoginForm />
}

export default LoginPage
