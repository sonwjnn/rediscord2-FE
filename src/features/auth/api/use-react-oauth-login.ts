import { ENDPOINTS } from '@/features/endpoints'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { LoginResponse, ReactOauthLoginRequest } from '@/features/auth/types'
import publicClient from '@/lib/client/public-client'
import { toast } from 'sonner'

type ResponseType = AxiosResponse<LoginResponse>

export const useReactOauthLogin = () => {
  return useMutation<ResponseType, Error, ReactOauthLoginRequest>({
    mutationFn: async json => {
      const response = await publicClient.post<LoginResponse>(
        ENDPOINTS.AUTH.LOGIN_GOOGLE,
        json,
      )
      return response
    },
    onSuccess: () => {
      toast.success('Login successfully!')
    },
    onError: err => {
      return err
    },
  })
}
