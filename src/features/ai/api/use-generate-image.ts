import { ENDPOINTS } from '@/features/endpoints'
import privateClient from '@/lib/client/private-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { GenerateImageRequest, GenerateImageResponse } from '../types'

type ResponseType = AxiosResponse<GenerateImageResponse>

export const useGenerateImage = () => {
  const mutation = useMutation<ResponseType, Error, GenerateImageRequest>({
    mutationFn: async json => {
      const response = await privateClient.post<GenerateImageResponse>(
        ENDPOINTS.AI.GENERATE_IMAGE,
        json,
      )

      return response
    },
  })

  return mutation
}
