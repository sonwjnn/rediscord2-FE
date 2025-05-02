import { ENDPOINTS } from '@/features/endpoints'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ResendNewVerificationRequest } from '@/features/auth/types'
import publicClient from '@/lib/client/public-client'

type ResponseType = AxiosResponse<void>

export const useResendNewVerification = () => {
  return useMutation<ResponseType, Error, ResendNewVerificationRequest>({
    mutationFn: async json => {
      const response = await publicClient.post(
        ENDPOINTS.AUTH.RESEND_CONFIRM_EMAIL,
        json,
      )

      return response
    },
  })
}
