import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  headerDescription?: string
  showSocial?: boolean
  type?:
    | 'login'
    | 'signup'
    | 'verify-email'
    | 'reset-password'
    | 'forgot-password'
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerDescription = '',
  showSocial,
  type,
}: CardWrapperProps) => {
  const isLogin = type === 'login'
  const isSignup = type === 'signup'
  const isOther = !isLogin && !isSignup

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <Header label={headerLabel} description={headerDescription} />
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        {children}
        {(isLogin || isSignup) && (
          <>
            <p className="text-xs text-right px-0 font-normal hover:underline -mt-2">
              <Link href={'/auth/forgot-password'}>Forgot password?</Link>
            </p>
            <Separator />
          </>
        )}
        {showSocial ? <Social /> : null}
        {isLogin && (
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" onClick={() => {}}>
              <span className="text-sky-700 hover:underline">Sign up</span>
            </Link>
          </p>
        )}
        {isSignup && (
          <p className="text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" onClick={() => {}}>
              <span className="text-sky-700 hover:underline">Sign in</span>
            </Link>
          </p>
        )}
        {isOther && (
          <p className="text-xs text-muted-foreground">
            <Link href="/auth/login" onClick={() => {}}>
              <span className="text-sky-700 hover:underline">
                Back to login
              </span>
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
