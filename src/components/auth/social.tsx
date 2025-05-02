'use client'

import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
interface SocialProps {}
import { useAuth } from '@/hooks/use-auth'
import { Spinner } from '@/components/spinner'

export const Social = ({}: SocialProps) => {
  const { onProviderSignIn, isLoading } = useAuth()
  return (
    <div className="flex flex-col gap-y-2.5">
      <Button
        onClick={() => onProviderSignIn('google')}
        size="lg"
        variant="outline"
        className="w-full relative"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner className="mr-2" />
        ) : (
          <FcGoogle className="mr-2 size-5 top-2.5 left-2.5 absolute" />
        )}
        Continue with Google
      </Button>
    </div>
  )
}
