'use client'

import { useAuth } from '@/hooks/use-auth'
import { useGetCurrentUser } from '@/features/users/api/use-get-current-user'
import { useEffect, useState } from 'react'
import { UserButton } from '@/features/auth/components/user-button'
import { useGetMyProjects } from '@/features/projects/api/use-get-my-projects'
import { useCreateProject } from '@/features/projects/api/use-create-project'

import { Item } from './item'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { mutateAsync: getCurrentUserMutation } = useGetCurrentUser()
  const { data, isLoading } = useGetMyProjects(10)
  const { currentUser } = useAuth()
  const { mutateAsync: createProject } = useCreateProject()

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

      <UserButton />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {data?.pages.map((page, index) => (
            <div key={index} className="space-y-1">
              {page.data.map(project => (
                <Item key={project.id} {...project} />
              ))}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() =>
          createProject({
            name: 'New Project',
            json: '{}',
            height: 100,
            width: 100,
          })
        }
      >
        Create Project
      </button>
      <button onClick={() => getCurrentUserMutation()}>Get User</button>
    </div>
  )
}
