import { ENDPOINTS } from '@/features/endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { CreateProjectRequest, Project } from '@/features/projects/types'
import { toast } from 'sonner'
import privateClient from '@/lib/client/private-client'

type ResponseType = AxiosResponse<Project>

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, CreateProjectRequest>({
    mutationFn: async json => {
      const response = await privateClient.post<Project>(
        ENDPOINTS.PROJECTS.CREATE,
        json,
      )

      return response
    },
    onSuccess: () => {
      toast.success('Project created.')

      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
