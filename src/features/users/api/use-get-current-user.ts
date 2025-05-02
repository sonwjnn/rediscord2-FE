import { ENDPOINTS } from '@/features/endpoints'
import privateClient from '@/lib/client/private-client'
import { User } from '@/features/users/types'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type ResponseType = AxiosResponse<User>

export const useGetCurrentUser = () => {
  return useMutation<ResponseType, Error>({
    mutationKey: ['me'],
    mutationFn: async () => {
      const response = await privateClient.get<User>(ENDPOINTS.AUTH.ME)
      return response
    },
  })
}
