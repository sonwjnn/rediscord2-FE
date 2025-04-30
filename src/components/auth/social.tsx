'use client'

// import { GithubIcon, GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
interface SocialProps {}
// import { FaGithub } from 'react-icons/fa'
import { useAuth } from '@/hooks/use-auth'
import { providerType } from '@/types/user'

export const Social = ({}: SocialProps) => {
  const { onProviderSignIn } = useAuth()

  const onClick = (provider: providerType) => {
    onProviderSignIn(provider)
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        onClick={() => onClick('google')}
        size="lg"
        className="w-full"
        variant="outline"
      >
        <FcGoogle size={28} />
      </Button>
      {/* <Button
        onClick={() => onClick('github')}
        size="lg"
        className="flex-1/2"
        variant="outline"
      >
        <FaGithub size={36} />
      </Button> */}
    </div>
  )
}
