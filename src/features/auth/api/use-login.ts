import { ENDPOINTS } from '@/features/endpoints'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { LoginResponse, LoginRequest } from '@/features/auth/types'
import publicClient from '@/lib/client/public-client'

type ResponseType = AxiosResponse<LoginResponse>

export const useLogin = () => {
  return useMutation<ResponseType, Error, LoginRequest>({
    mutationFn: async json => {
      const response = await publicClient.post<LoginResponse>(
        ENDPOINTS.AUTH.LOGIN,
        json,
      )

      return response
    },
  })
}
