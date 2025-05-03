import { useQuery } from '@tanstack/react-query'
import { Project } from '@/features/projects/types'
import privateClient from '@/lib/client/private-client'
import { ENDPOINTS } from '@/features/endpoints'

export const useGetProject = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['project', { id }],
    queryFn: async () => {
      const response = await privateClient.get<Project>(
        ENDPOINTS.PROJECTS.GET_BY_ID(id),
      )

      return response
    },
  })

  return query
}
