'use client'

import { SuccessModal } from '@/features/subscriptions/components/success-modal'
import { FailModal } from '@/features/subscriptions/components/fail-modal'
import { SubscriptionModal } from '@/features/subscriptions/components/subscription-modal'
import { useMountedState } from 'react-use'

export const Modals = () => {
  const mounted = useMountedState()

  if (!mounted) return null

  return (
    <>
      <FailModal />
      <SuccessModal />
      <SubscriptionModal />
    </>
  )
}
