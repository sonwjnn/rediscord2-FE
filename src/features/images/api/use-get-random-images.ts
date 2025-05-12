import { useQuery } from '@tanstack/react-query'

import privateClient from '@/lib/client/private-client'
import { ENDPOINTS } from '@/features/endpoints'

import { AxiosResponse } from 'axios'
import { RandomImage } from '../types'

export type ResponseType = AxiosResponse<RandomImage[]>

export const useGetRandomImages = () => {
  const query = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const response = await privateClient.get<RandomImage[]>(
        ENDPOINTS.UNSPLASH.GET_RANDOM,
      )

      return response
    },
    staleTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  return query
}
