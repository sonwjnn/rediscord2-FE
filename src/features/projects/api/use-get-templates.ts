import { useQuery } from '@tanstack/react-query'
import {
  GetTemplatesRequest,
  GetTemplatesResponse,
} from '@/features/projects/types'
import { AxiosResponse } from 'axios'
import privateClient from '@/lib/client/private-client'
import { ENDPOINTS } from '@/features/endpoints'

export type ResponseType = AxiosResponse<GetTemplatesResponse>['data']

export const useGetTemplates = (apiQuery: GetTemplatesRequest) => {
  const query = useQuery({
    queryKey: [
      'templates',
      {
        page: apiQuery.page,
        limit: apiQuery.limit,
      },
    ],
    queryFn: async () => {
      const response = await privateClient.get<GetTemplatesResponse>(
        ENDPOINTS.PROJECTS.GET_TEMPLATES,
        { params: apiQuery },
      )

      return response.data
    },
  })

  return query
}
