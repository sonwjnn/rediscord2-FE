import { ENDPOINTS } from '@/features/endpoints'
import privateClient from '@/lib/client/private-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { RemoveBgRequest, RemoveBgResponse } from '../types'

type ResponseType = AxiosResponse<RemoveBgResponse>

export const useRemoveBg = () => {
  const mutation = useMutation<ResponseType, Error, RemoveBgRequest>({
    mutationFn: async json => {
      const response = await privateClient.post<RemoveBgResponse>(
        ENDPOINTS.AI.REMOVE_BG,
        json,
      )

      return response
    },
  })

  return mutation
}
