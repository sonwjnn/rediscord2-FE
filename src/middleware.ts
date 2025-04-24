import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes'
import { type NextRequest } from 'next/server'
import * as jose from 'jose'
import { TOKEN_COOKIE } from './lib/constants'

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Cho phép tất cả API auth routes đi qua
  if (isApiAuthRoute) {
    return null
  }

  const token = (await req.cookies.get(TOKEN_COOKIE)?.value) ?? ''

  if (!token) {
    if (isPublicRoute || isAuthRoute) {
      return null
    }

    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  const decodedToken = jose.decodeJwt(token) as {
    id: string
    sessionId: string
    iat: number
    exp: number
  }

  const isLoggedIn = !!decodedToken?.id

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }
  if (!isLoggedIn && !isPublicRoute) {
    // let callbackUrl = nextUrl.pathname
    // if (nextUrl.search) {
    //   callbackUrl += nextUrl.search
    // }

    // const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(`/auth/login`, nextUrl))
  }
  return null
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
