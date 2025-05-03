import { ENDPOINTS } from '@/features/endpoints'
import privateClient from '@/lib/client/private-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type ResponseType = AxiosResponse<{
  url: string
}>

export const useCheckout = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await privateClient.post<{
        url: string
      }>(ENDPOINTS.SUBSCRIPTIONS.CHECKOUT)

      return response
    },
    onSuccess: ({ data }) => {
      window.location.href = data.url
    },
    onError: () => {
      toast.error('Failed to create session')
    },
  })

  return mutation
}
