export type Subscription = {
  id: string
  userId: string
  subscriptionId: string
  customerId: string
  priceId: string
  status: string
  currentPeriodEnd: Date | null
  createdAt: Date
  updatedAt: Date
}

export type SubscriptionWithActive = Subscription & {
  active: boolean
}
