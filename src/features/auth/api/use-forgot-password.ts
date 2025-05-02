import { ENDPOINTS } from '@/features/endpoints'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ForgotPasswordRequest } from '@/features/auth/types'
import publicClient from '@/lib/client/public-client'

type ResponseType = AxiosResponse<void>

export const useForgotPassword = () => {
  return useMutation<ResponseType, Error, ForgotPasswordRequest>({
    mutationFn: async json => {
      const response = await publicClient.post<void>(
        ENDPOINTS.AUTH.FORGOT_PASSWORD,
        json,
      )

      return response
    },
  })
}
