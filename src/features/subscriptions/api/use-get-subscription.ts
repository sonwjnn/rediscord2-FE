import { useQuery } from '@tanstack/react-query'

import privateClient from '@/lib/client/private-client'
import { ENDPOINTS } from '@/features/endpoints'

import { SubscriptionWithActive } from '@/types/subscription'
import { AxiosResponse } from 'axios'

export type ResponseType = AxiosResponse<SubscriptionWithActive>

export const useGetSubscription = () => {
  const query = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const response = await privateClient.get<SubscriptionWithActive>(
        ENDPOINTS.SUBSCRIPTIONS.GET_CURRENT,
      )

      return response
    },
  })

  return query
}
