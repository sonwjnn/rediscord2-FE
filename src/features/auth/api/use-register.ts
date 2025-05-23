import { ENDPOINTS } from '@/features/endpoints'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { RegisterRequest } from '@/features/auth/types'
import publicClient from '@/lib/client/public-client'

type ResponseType = AxiosResponse<void>

export const useRegister = () => {
  return useMutation<ResponseType, Error, RegisterRequest>({
    mutationFn: async json => {
      const response = await publicClient.post<void>(
        ENDPOINTS.AUTH.REGISTER,
        json,
      )

      return response
    },
  })
}
