'use client'

import { LogoutButton } from '@/components/auth/logout-button'
import { useAuth } from '@/hooks/use-auth'
import { useGetCurrentUser } from '@/features/users/api/use-get-current-user'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { mutateAsync: getCurrentUserMutation } = useGetCurrentUser()

  const { currentUser } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Welcome {JSON.stringify(currentUser)}
      </h1>
      <p className="mt-4 text-xl text-gray-600">You are logged in!</p>

      <LogoutButton>Logout</LogoutButton>
      <button onClick={() => getCurrentUserMutation()}>Get User</button>
    </div>
  )
}
