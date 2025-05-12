import { useQuery } from '@tanstack/react-query'

import privateClient from '@/lib/client/private-client'
import { ENDPOINTS } from '@/features/endpoints'

import { AxiosResponse } from 'axios'
import { UserFile } from '../types'

export type ResponseType = AxiosResponse<UserFile[]>

export const useGetUserFiles = () => {
  const query = useQuery({
    queryKey: ['user-files'],
    queryFn: async () => {
      const response = await privateClient.get<UserFile[]>(
        ENDPOINTS.USER_FILES.GET_BY_USER_ID,
      )

      return response
    },
  })

  return query
}
