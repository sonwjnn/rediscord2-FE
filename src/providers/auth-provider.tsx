'use client'

import {
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  createContext,
} from 'react'
import {
  useLogin,
  useRegister,
  useGetCurrentUser,
  useLogout,
  useReactOauthLogin,
} from '@/services/auth/mutations'
import {
  createSessionCookies,
  getToken,
  removeSessionCookies,
} from '@/lib/token-cookies'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/use-user-store'
import { ProviderType, User } from '@/types/user'
import { LoginResponse } from '@/services/auth/types'
import { useGoogleLogin } from '@react-oauth/google'
export interface AuthContextType {
  isAuthenticated: boolean
  currentUser: User | null
  onCredentialSignIn: (
    usernameOrEmail: string,
    password: string,
  ) => Promise<LoginResponse | void>
  onProviderSignIn: (provider: ProviderType) => void
  handleAuthSuccess: () => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<void>
  isLoading: boolean
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AFTER_SIGN_IN_REDIRECT_URL = '/'
export const AFTER_LOGOUT_REDIRECT_URL = '/'

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const { user, setUser } = useUserStore()

  const { mutateAsync: loginMutation, isPending: loginPending } = useLogin()
  const { mutateAsync: loginSocialMutation, isPending: loginSocialPending } =
    useReactOauthLogin()
  const { mutateAsync: registerMutation, isPending: registerPending } =
    useRegister()
  const { mutateAsync: logoutMutation, isPending: logoutPending } = useLogout()
  const {
    mutateAsync: getCurrentUserMutation,
    isPending: getCurrentUserPending,
  } = useGetCurrentUser()

  const isLoading =
    loginPending ||
    registerPending ||
    logoutPending ||
    getCurrentUserPending ||
    loginSocialPending

  const clearData = useCallback(() => {
    setUser(null)
    removeSessionCookies()
  }, [setUser])

  const handleAuthSuccess = useCallback(async () => {
    try {
      const response = await getCurrentUserMutation()

      if (response.status === 200) {
        delete response.data.password
        setUser(response.data)
        router.replace(AFTER_SIGN_IN_REDIRECT_URL)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }, [getCurrentUserMutation, router, setUser])

  const onCredentialSignIn = useCallback(
    async (usernameOrEmail: string, password: string) => {
      try {
        const response = await loginMutation({ usernameOrEmail, password })

        if (response.status === 200) {
          const token = response.data?.accessToken
          const refreshToken = response.data?.refreshToken

          createSessionCookies({ token, refreshToken })

          await handleAuthSuccess()
        }
      } catch (error) {
        throw error
      }
    },
    [loginMutation, handleAuthSuccess],
  )

  const loginGoogle = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const response = await loginSocialMutation({
          accessToken: tokenResponse.access_token,
        })

        if (response.status === 200) {
          const token = response.data?.accessToken
          const refreshToken = response.data?.refreshToken

          createSessionCookies({ token, refreshToken })

          await handleAuthSuccess()
        }
      } catch (err) {
        console.error('Server auth failed', err)
      }
    },
    onError: () => {
      console.error('Google login failed')
    },
    scope: 'openid email profile',
    flow: 'implicit',
  })

  const onProviderSignIn = useCallback(
    (provider: ProviderType) => {
      switch (provider) {
        case 'google':
          loginGoogle()
          break
        default:
          break
      }
    },
    [loginGoogle],
  )

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        const response = await registerMutation({ username, email, password })

        if (response.status === 200) {
          await handleAuthSuccess()
        }
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },
    [registerMutation, handleAuthSuccess],
  )

  const logout = useCallback(async () => {
    try {
      const token = getToken()

      if (!token) return

      const reponse = await logoutMutation()

      if (reponse.status !== 401) {
        clearData()
      }

      router.replace('/auth/login')
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }, [logoutMutation, clearData, router])

  useEffect(() => {
    ;(async () => {
      try {
        const token = getToken()

        if (!token) {
          clearData()
          return
        }

        const userStorage = sessionStorage.getItem('user-storage')
        let userSession = null

        if (userStorage) {
          const parsed = JSON.parse(userStorage)
          userSession = parsed.state?.user
        }

        if (userSession) return

        const response = await getCurrentUserMutation()
        if (response?.data) {
          setUser(response.data)
        }
      } catch (error) {
        console.log(error)
        clearData()
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleAuthExpired = () => {
      clearData()
      toast.error('Your session has expired. Please log in again.')
      router.replace('/auth/login')
    }

    window.addEventListener('AUTH_EXPIRED', handleAuthExpired as EventListener)

    return () => {
      window.removeEventListener(
        'AUTH_EXPIRED',
        handleAuthExpired as EventListener,
      )
    }
  }, [router, clearData])

  const value = useMemo(
    () => ({
      isAuthenticated: !!user && !!getToken(),
      currentUser: user,
      onCredentialSignIn,
      onProviderSignIn,
      handleAuthSuccess,
      register,
      logout,
      isLoading,
    }),
    [
      user,
      onCredentialSignIn,
      onProviderSignIn,
      register,
      logout,
      handleAuthSuccess,
      isLoading,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
