import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Project } from '@/features/projects/types'
import { ENDPOINTS } from '@/features/endpoints'
import privateClient from '@/lib/client/private-client'
import { AxiosResponse } from 'axios'

type ResponseType = AxiosResponse<Project>
type RequestType = Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt'>

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ['project', { id }],
    mutationFn: async json => {
      const response = await privateClient.patch<Project>(
        ENDPOINTS.PROJECTS.EDIT_BY_ID(id),
        json,
      )

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', { id }] })
    },
    onError: () => {
      toast.error('Failed to update project')
    },
  })

  return mutation
}
