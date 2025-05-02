'use client'

import { useCallback } from 'react'
import * as oauth from 'oauth4webapi'
import { useGetCurrentUser, useSocialLogin } from '@/services/auth/mutations'
import { createSessionCookies } from '@/lib/token-cookies'
import { ProviderConfig, ProviderType, UseOAuthOptions } from '@/types/user'
import { useUserStore } from '@/store/use-user-store'
import { AFTER_SIGN_IN_REDIRECT_URL } from '@/providers/auth-provider'

interface OAuthActions {
  login: (provider: ProviderType) => void
  handleCallback: () => Promise<void>
  isLoading: boolean
}

const SESSION_STORAGE_KEYS = {
  CODE_VERIFIER: 'oauth_code_verifier',
  STATE: 'oauth_state',
  PROVIDER: 'oauth_provider',
}

const PROVIDER_CONFIGS: Record<ProviderType, ProviderConfig> = {
  google: {
    issuerUrl: 'https://accounts.google.com',
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    scopes: 'openid email profile',
    algorithm: 'oidc',
  },
  github: {
    issuerUrl: 'https://github.com',
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
    redirectUri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || '',
    clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    scopes: 'user:email read:user',
    algorithm: 'oidc',
  },
}

export function useOAuth(options: UseOAuthOptions = {}): OAuthActions {
  const { setUser } = useUserStore()
  const { mutateAsync: socialLogin, isPending: socialLoginLoading } =
    useSocialLogin()
  const {
    mutateAsync: getCurrentUserMutation,
    isPending: getCurrentUserPending,
  } = useGetCurrentUser()

  const getCurrentUrl = useCallback(() => {
    return new URL(window.location.href)
  }, [])

  const login = useCallback(
    async (provider: ProviderType) => {
      try {
        const config = PROVIDER_CONFIGS[provider]

        const issuer = new URL(config.issuerUrl)

        const as = await oauth
          .discoveryRequest(issuer, { algorithm: config.algorithm ?? 'oidc' })
          .then(response => oauth.processDiscoveryResponse(issuer, response))

        const client: oauth.Client = { client_id: config.clientId }

        const codeVerifier = oauth.generateRandomCodeVerifier()
        const codeChallenge =
          await oauth.calculatePKCECodeChallenge(codeVerifier)

        sessionStorage.setItem(SESSION_STORAGE_KEYS.CODE_VERIFIER, codeVerifier)
        sessionStorage.setItem(SESSION_STORAGE_KEYS.PROVIDER, provider)

        const authorizationUrl = new URL(as.authorization_endpoint!)
        authorizationUrl.searchParams.set('client_id', client.client_id)
        authorizationUrl.searchParams.set('redirect_uri', config.redirectUri)
        authorizationUrl.searchParams.set('response_type', 'code')
        authorizationUrl.searchParams.set('scope', config.scopes)
        authorizationUrl.searchParams.set('code_challenge', codeChallenge)
        authorizationUrl.searchParams.set('code_challenge_method', 'S256')

        if (as.code_challenge_methods_supported?.includes('S256') !== true) {
          const state = oauth.generateRandomState()
          authorizationUrl.searchParams.set('state', state)
          sessionStorage.setItem(SESSION_STORAGE_KEYS.STATE, state)
        }

        window.location.href = authorizationUrl.href
      } catch (error) {
        console.error('Error during social login:', error)
        const errorObj =
          error instanceof Error ? error : new Error(String(error))
        options.onLoginError?.(errorObj)
      }
    },
    [options],
  )

  const handleCallback = useCallback(async () => {
    try {
      const provider = sessionStorage.getItem(
        SESSION_STORAGE_KEYS.PROVIDER,
      ) as ProviderType
      const codeVerifier = sessionStorage.getItem(
        SESSION_STORAGE_KEYS.CODE_VERIFIER,
      )

      if (!provider || !codeVerifier) {
        throw new Error('Missing OAuth parameters')
      }
      const config = PROVIDER_CONFIGS[provider]

      const state = sessionStorage.getItem(SESSION_STORAGE_KEYS.STATE)

      if (!codeVerifier) {
        throw new Error('No code verifier found in session storage')
      }

      const issuer = new URL(config.issuerUrl)

      const as = await oauth
        .discoveryRequest(issuer, { algorithm: config.algorithm ?? 'oidc' })
        .then(response => oauth.processDiscoveryResponse(issuer, response))

      const client: oauth.Client = {
        client_id: config.clientId,
      }

      const clientAuth = oauth.ClientSecretPost(config.clientSecret!)

      const currentUrl = getCurrentUrl()

      const params = oauth.validateAuthResponse(
        as,
        client,
        currentUrl,
        state || undefined,
      )

      const response = await oauth.authorizationCodeGrantRequest(
        as,
        client,
        clientAuth,
        params,
        config.redirectUri,
        codeVerifier,
      )

      const result = await oauth.processAuthorizationCodeResponse(
        as,
        client,
        response,
      )

      if (!result.id_token) {
        throw new Error('No id token received')
      }

      const loginResponse = await socialLogin({
        idToken: result.id_token,
        type: provider,
      })

      if (loginResponse.status === 200) {
        const accessToken = loginResponse.data?.accessToken
        const refreshToken = loginResponse.data?.accessToken

        createSessionCookies({ token: accessToken, refreshToken })

        const response = await getCurrentUserMutation()

        if (response.status === 200) {
          delete response.data.password
          setUser(response.data)
          window.location.href = AFTER_SIGN_IN_REDIRECT_URL
        }
      }

      sessionStorage.removeItem(SESSION_STORAGE_KEYS.CODE_VERIFIER)
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.STATE)

      window.history.replaceState({}, document.title, window.location.pathname)
    } catch (error) {
      throw error
    }
  }, [getCurrentUrl, socialLogin, getCurrentUserMutation, setUser])

  return {
    login,
    handleCallback,
    isLoading: socialLoginLoading || getCurrentUserPending,
  }
}

// Hook để thực hiện API request đến protected resources
// export function useProtectedRequest() {
//   return async (url: string, method = 'GET', options = {}) => {
//     const accessToken = localStorage.getItem('access_token')

//     if (!accessToken) {
//       throw new Error('No access token available')
//     }

//     const response = await oauth.protectedResourceRequest(
//       accessToken,
//       method,
//       new URL(url),
//       options,
//     )

//     return response.json()
//   }
// }
