import { ENDPOINTS } from '@/features/endpoints'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import privateClient from '@/lib/client/private-client'

type ResponseType = AxiosResponse<void>

export const useLogout = () => {
  return useMutation<ResponseType, Error, void>({
    mutationFn: async () => {
      const response = await privateClient.post(ENDPOINTS.AUTH.LOGOUT)

      return response
    },
  })
}
