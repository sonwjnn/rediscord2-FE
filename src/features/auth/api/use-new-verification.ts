import { ENDPOINTS } from '@/features/endpoints'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { NewVerificationResponse } from '@/features/auth/types'
import publicClient from '@/lib/client/public-client'

type ResponseType = AxiosResponse<NewVerificationResponse>

export const useNewVerification = () => {
  return useMutation<ResponseType, Error, { token: string }>({
    mutationFn: async json => {
      const response = await publicClient.post<NewVerificationResponse>(
        ENDPOINTS.AUTH.CONFIRM_EMAIL,
        json,
      )

      return response
    },
  })
}
