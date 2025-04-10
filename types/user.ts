import type { Subscription } from "./subscription"

export interface User {
  id: string
  name: string
  email: string
  image?: string
  subscription: Subscription
}
