import { ENDPOINTS } from '@/features/endpoints'
import privateClient from '@/lib/client/private-client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { GetMyProjectsResponse } from '@/features/projects/types'

export const useGetMyProjects = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await privateClient.get<GetMyProjectsResponse>(
        ENDPOINTS.PROJECTS.GET_MY_PROJECTS,
        { params: { page: pageParam, limit } },
      )
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage,
  })
}
