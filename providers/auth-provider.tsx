"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types/user"
import type { Subscription, SubscriptionTier, SubscriptionPeriod } from "@/types/subscription"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  upgradeSubscription: (tier: SubscriptionTier, period: SubscriptionPeriod) => Promise<boolean>
  incrementCVCount: () => Promise<boolean>
  canCreateCV: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => false,
  signOut: () => {},
  upgradeSubscription: async () => false,
  incrementCVCount: async () => false,
  canCreateCV: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [canCreateCV, setCanCreateCV] = useState(false)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)

        // Ensure subscription exists
        if (!parsedUser.subscription) {
          parsedUser.subscription = {
            tier: "free",
            startDate: new Date(),
            cvCount: 0,
            active: true,
          }
        } else {
          // Convert string dates back to Date objects
          if (parsedUser.subscription.startDate) {
            parsedUser.subscription.startDate = new Date(parsedUser.subscription.startDate)
          }
          if (parsedUser.subscription.endDate) {
            parsedUser.subscription.endDate = new Date(parsedUser.subscription.endDate)
          }
        }

        setUser(parsedUser)
        updateCanCreateCV(parsedUser)
      } catch (error) {
        console.error("Error parsing stored user:", error)
        // If there's an error, create a new user with default subscription
        const defaultUser = createDefaultUser()
        setUser(defaultUser)
        updateCanCreateCV(defaultUser)
      }
    }
    setIsLoading(false)
  }, [])

  // Create a default user with free subscription
  const createDefaultUser = () => {
    return {
      id: "guest",
      name: "Guest User",
      email: "guest@example.com",
      subscription: {
        tier: "free" as SubscriptionTier,
        startDate: new Date(),
        cvCount: 0,
        active: true,
      },
    }
  }

  // Update canCreateCV whenever user changes
  useEffect(() => {
    if (user) {
      updateCanCreateCV(user)
    }
  }, [user])

  const updateCanCreateCV = (user: User) => {
    if (!user || !user.subscription) {
      setCanCreateCV(false)
      return
    }

    const { tier, cvCount, active, endDate } = user.subscription

    // Check if subscription is active and not expired
    const isActive = active && (!endDate || new Date() < new Date(endDate))

    if (!isActive) {
      setCanCreateCV(false)
      return
    }

    // Free tier can create up to 2 CVs
    if (tier === "free") {
      setCanCreateCV(cvCount < 2)
    } else if (tier === "pro") {
      // Pro tier has unlimited CVs
      setCanCreateCV(true)
    } else {
      setCanCreateCV(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // For demo purposes, we'll just accept any email/password
      // In a real app, you would validate against a backend

      // Create a default free subscription for new users
      const defaultSubscription: Subscription = {
        tier: "free",
        startDate: new Date(),
        cvCount: 0,
        active: true,
      }

      // Mock user data
      const userData: User = {
        id: "1",
        name: email.split("@")[0],
        email: email,
        subscription: defaultSubscription,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      updateCanCreateCV(userData)
      return true
    } catch (error) {
      console.error("Error signing in:", error)
      return false
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
    setCanCreateCV(false)
  }

  const upgradeSubscription = async (tier: SubscriptionTier, period: SubscriptionPeriod) => {
    if (!user) return false

    try {
      // In a real app, this would call your payment API
      // For demo purposes, we'll just update the user object

      const today = new Date()
      let endDate: Date | undefined

      if (period === "monthly") {
        endDate = new Date(today)
        endDate.setMonth(endDate.getMonth() + 1)
      } else if (period === "annual") {
        endDate = new Date(today)
        endDate.setFullYear(endDate.getFullYear() + 1)
      }

      const updatedSubscription: Subscription = {
        tier,
        period,
        startDate: today,
        endDate,
        cvCount: user.subscription?.cvCount || 0,
        active: true,
      }

      const updatedUser = {
        ...user,
        subscription: updatedSubscription,
      }

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      updateCanCreateCV(updatedUser)
      return true
    } catch (error) {
      console.error("Error upgrading subscription:", error)
      return false
    }
  }

  const incrementCVCount = async () => {
    if (!user) return false

    try {
      // In a real app, this would call your backend API
      // For demo purposes, we'll just update the user object

      // Ensure subscription exists
      const currentSubscription = user.subscription || {
        tier: "free" as SubscriptionTier,
        startDate: new Date(),
        cvCount: 0,
        active: true,
      }

      const updatedSubscription = {
        ...currentSubscription,
        cvCount: (currentSubscription.cvCount || 0) + 1,
      }

      const updatedUser = {
        ...user,
        subscription: updatedSubscription,
      }

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      updateCanCreateCV(updatedUser)
      return true
    } catch (error) {
      console.error("Error incrementing CV count:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        upgradeSubscription,
        incrementCVCount,
        canCreateCV,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
