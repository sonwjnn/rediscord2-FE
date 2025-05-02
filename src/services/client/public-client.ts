import axios from 'axios'
import { API_BASE_URL } from '@/services/endpoints'

const publicClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
})

publicClient.interceptors.request.use(
  config => {
    // add anything before request is sent
    return config
  },
  error => {
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    )
  },
)

publicClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject(error?.response?.data)
    }

    if (error.request) {
      return Promise.reject({
        statusCode: 500,
        message:
          'No response received from the server. Please check your internet connection.',
      })
    }

    return Promise.reject({
      statusCode: 500,
      message: error.message || 'Something went wrong!',
    })
  },
)

export default publicClient
