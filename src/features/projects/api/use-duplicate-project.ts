import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AxiosResponse } from 'axios'
import { Project } from '@/features/projects/types'
import privateClient from '@/lib/client/private-client'
import { ENDPOINTS } from '@/features/endpoints'

type ResponseType = AxiosResponse<Project>
type RequestType = { id: string }

export const useDuplicateProject = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async param => {
      const response = await privateClient.post<Project>(
        ENDPOINTS.PROJECTS.DUPLICATE_BY_ID(param.id),
      )

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: () => {
      toast.error('Failed to duplicate project')
    },
  })

  return mutation
}
