import { ENDPOINTS } from '@/features/endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'
import privateClient from '@/lib/client/private-client'

type ResponseType = AxiosResponse<void>
type RequestType = { id: string }

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id }) => {
      const response = await privateClient.delete<void>(
        ENDPOINTS.PROJECTS.DELETE_BY_ID(id),
      )

      return response
    },
    onSuccess: () => {
      toast.success('Project deleted successfully.')

      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: () => {
      toast.error('Failed to delete project.')
    },
  })
}
