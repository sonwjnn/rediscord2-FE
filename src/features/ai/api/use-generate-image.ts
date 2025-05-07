import privateClient from '@/lib/client/private-client'
import { useMutation } from '@tanstack/react-query'

type ResponseType = void
type RequestType = void

export const useGenerateImage = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      // const response = await privateClient.get();
      // return await response.json();
    },
  })

  return mutation
}
