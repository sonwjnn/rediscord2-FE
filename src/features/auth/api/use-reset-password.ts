import { ENDPOINTS } from '@/features/endpoints'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ResetPasswordRequest } from '@/features/auth/types'
import publicClient from '@/lib/client/public-client'

type ResponseType = AxiosResponse<void>

export const useResetPassword = () => {
  return useMutation<ResponseType, Error, ResetPasswordRequest>({
    mutationFn: async json => {
      const response = await publicClient.post(
        ENDPOINTS.AUTH.RESET_PASSWORD,
        json,
      )

      return response
    },
  })
}
