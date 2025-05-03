import { ENDPOINTS } from '@/features/endpoints'
import privateClient from '@/lib/client/private-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type ResponseType = AxiosResponse<string>

export const useBilling = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await privateClient.get(ENDPOINTS.SUBSCRIPTIONS.BILLING)

      return response
    },
    onSuccess: ({ data }) => {
      window.location.href = data
    },
    onError: () => {
      toast.error('Failed to create session')
    },
  })

  return mutation
}
