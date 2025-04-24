import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL, ENDPOINTS } from '@/services/endpoints'
import {
  createSessionCookies,
  getRefreshToken,
  getToken,
} from '@/lib/token-cookies'

const privateClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
})

// Flag to track if a token refresh is in progress
let isRefreshing = false

// Array to manage failed requests during token refresh process
// When a request fails with 401 error and system is refreshing token (isRefreshing=true),
// that request will be queued here to retry later
// refresh sucesss: retry all failed queue
// refresh failed: reject all failed queue
let failedQueue: {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token!)
    }
  })
  failedQueue = []
}

privateClient.interceptors.request.use(
  config => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    )
  },
)

privateClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config! as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return privateClient(originalRequest)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await Promise.race<any>([
          fetch(`${API_BASE_URL}/${ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getRefreshToken()}`,
            },
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Refresh token timeout')), 5000),
          ),
        ])

        if (!response.ok) {
          throw new Error('Refresh token failed')
        }

        const data = await response.json()

        const newToken = data?.accessToken
        const refreshToken = data?.refreshToken

        if (!newToken) {
          throw new Error('No token received in headers')
        }

        createSessionCookies({ token: newToken, refreshToken })

        originalRequest.headers.Authorization = `Bearer ${newToken}`

        processQueue(null, newToken)

        return privateClient(originalRequest)
      } catch (refreshError) {
        // clear data
        processQueue(refreshError, null)

        // handle logout
        window.dispatchEvent(
          new CustomEvent('AUTH_EXPIRED', {
            detail: {
              currentPath: window.location.pathname,
              error: 'Session expired',
            },
          }),
        )

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    if (error.response?.status === 401 && originalRequest._retry) {
      processQueue(error, null)

      window.dispatchEvent(
        new CustomEvent('AUTH_EXPIRED', {
          detail: {
            currentPath: window.location.pathname,
            error: 'Session expired',
          },
        }),
      )
    }

    return Promise.reject(error)
  },
)

export default privateClient
