import { useMutation } from '@tanstack/react-query'

type ResponseType = void
type RequestType = void

export const useRemoveBg = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      // const response = await client.api.ai["remove-bg"].$post({ json });
      // return await response.json();
    },
  })

  return mutation
}
