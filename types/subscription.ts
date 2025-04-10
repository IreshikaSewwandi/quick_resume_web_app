export type SubscriptionTier = "free" | "pro"

export type SubscriptionPeriod = "monthly" | "annual"

export interface Subscription {
  tier: SubscriptionTier
  period?: SubscriptionPeriod
  startDate: Date
  endDate?: Date
  cvCount: number
  active: boolean
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  tier: SubscriptionTier
  period?: SubscriptionPeriod
  price: number
  features: string[]
}
