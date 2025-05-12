import { useQuery } from '@tanstack/react-query'

import privateClient from '@/lib/client/private-client'
import { ENDPOINTS } from '@/features/endpoints'

import { AxiosResponse } from 'axios'
import { RandomImage } from '../types'

export type ResponseType = AxiosResponse<RandomImage[]>

export const useGetImagesByKeyword = (keyword: string) => {
  const query = useQuery({
    enabled: !!keyword,
    queryKey: ['images', keyword],
    queryFn: async () => {
      const response = await privateClient.get<RandomImage[]>(
        ENDPOINTS.UNSPLASH.GET_BY_KEYWORD,
        { params: { query: keyword } },
      )

      return response
    },
  })

  return query
}
