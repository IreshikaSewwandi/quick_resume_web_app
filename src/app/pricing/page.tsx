"use client"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Check } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SimpleToast } from "../../components/ui/simple-toast"
import type { SubscriptionPlan } from "@/types/subscription"

export default function PricingPage() {
  const { user, upgradeSubscription } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "info"
  }>({
    show: false,
    message: "",
    type: "info",
  })

  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      description: "Basic resume building for starters",
      tier: "free",
      price: 0,
      features: ["Create up to 2 resumes", "Basic templates", "Download as PDF", "Email support"],
    },
    {
      id: "pro-monthly",
      name: "Pro Monthly",
      description: "Professional resume building with unlimited access",
      tier: "pro",
      period: "monthly",
      price: 5,
      features: [
        "Unlimited resumes",
        "All premium templates",
        "Download in multiple formats",
        "Priority support",
        "AI resume suggestions",
        "Custom sections",
      ],
    },
    {
      id: "pro-annual",
      name: "Pro Annual",
      description: "Save 17% with annual billing",
      tier: "pro",
      period: "annual",
      price: 50,
      features: ["Everything in Pro Monthly", "2 months free", "Resume analytics", "Early access to new features"],
    },
  ]

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (!user) {
      router.push("/auth/signin?redirect=/pricing")
      return
    }

    setSelectedPlan(plan)

    // If it's the free plan and user is already on free, just show a message
    if (plan.tier === "free" && user.subscription.tier === "free") {
      setToast({
        show: true,
        message: "You're already on the Free plan",
        type: "info",
      })
      return
    }

    // For demo purposes, we'll just upgrade immediately for free plan
    if (plan.tier === "free") {
      handleUpgrade(plan)
      return
    }

    // For paid plans, we would normally show a payment modal
    // For this demo, we'll just simulate the payment process
    handleUpgrade(plan)
  }

  const handleUpgrade = async (plan: SubscriptionPlan) => {
    if (!plan.period && plan.tier !== "free") return

    setIsLoading(true)
    try {
      const success = await upgradeSubscription(
        plan.tier,
        plan.period || "monthly", // Default to monthly for free tier (though not used)
      )

      if (success) {
        setToast({
          show: true,
          message: `Successfully upgraded to ${plan.name} plan!`,
          type: "success",
        })

        // Redirect to dashboard after successful upgrade
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setToast({
          show: true,
          message: "Failed to upgrade subscription",
          type: "error",
        })
      }
    } catch (error) {
      console.error("Error upgrading:", error)
      setToast({
        show: true,
        message: "An error occurred during upgrade",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isCurrentPlan = (plan: SubscriptionPlan) => {
    if (!user) return false

    if (plan.tier !== user.subscription.tier) return false

    if (plan.tier === "free") return user.subscription.tier === "free"

    return plan.period === user.subscription.period
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Select the perfect plan for your resume building needs. Upgrade anytime to unlock more features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col ${
              plan.tier === "pro" && plan.period === "annual" ? "border-primary shadow-lg" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                {plan.period && (
                  <span className="text-gray-500 ml-2">/{plan.period === "monthly" ? "month" : "year"}</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={isCurrentPlan(plan) ? "outline" : "default"}
                disabled={isLoading || isCurrentPlan(plan)}
                onClick={() => handleSelectPlan(plan)}
              >
                {isLoading && selectedPlan?.id === plan.id
                  ? "Processing..."
                  : isCurrentPlan(plan)
                    ? "Current Plan"
                    : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom plan for your team?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          We offer special pricing for teams and organizations. Contact us to learn more about our enterprise plans.
        </p>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </div>

      {toast.show && (
        <SimpleToast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
      )}
    </div>
  )
}
