"use client"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { useRequireAuth } from "@/hooks/use-require-auth"
import { SimpleToast } from "../../../components/ui/simple-toast"
import { useState } from "react"
import { CreditCard, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
  const { user, isLoading } = useRequireAuth()
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "info"
  }>({
    show: false,
    message: "",
    type: "info",
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your billing information...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  const { subscription } = user
  const isProUser = subscription.tier === "pro"

  // Format the next billing date
  const nextBillingDate = subscription.endDate
    ? new Date(subscription.endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"

  const handleCancelSubscription = () => {
    setToast({
      show: true,
      message: "This is a demo. In a real app, this would cancel your subscription.",
      type: "info",
    })
  }

  const handleUpdatePayment = () => {
    setToast({
      show: true,
      message: "This is a demo. In a real app, this would open a payment method update form.",
      type: "info",
    })
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Billing & Subscription</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>Manage your subscription plan and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Current Plan</h3>
                  <p className="text-gray-500">
                    {isProUser
                      ? `Pro ${subscription.period} ($${subscription.period === "monthly" ? "5" : "50"}/${subscription.period})`
                      : "Free"}
                  </p>
                </div>
              </div>

              {isProUser && (
                <>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Next Billing Date</h3>
                      <p className="text-gray-500">{nextBillingDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Payment Method</h3>
                      <p className="text-gray-500">•••• •••• •••• 4242 (Demo Card)</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-4">
              {isProUser ? (
                <>
                  <Button variant="outline" onClick={handleUpdatePayment}>
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="text-red-500" onClick={handleCancelSubscription}>
                    Cancel Subscription
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link href="/pricing">Upgrade to Pro</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Usage Summary</CardTitle>
              <CardDescription>Your current usage statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Resumes Created</h3>
                <p className="text-2xl font-bold">{subscription.cvCount}</p>
              </div>

              <div>
                <h3 className="font-medium">Resume Limit</h3>
                <p className="text-2xl font-bold">{isProUser ? "Unlimited" : "2"}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard">View My Resumes</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Your recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {isProUser ? (
              <div className="border rounded-md divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Pro {subscription.period} Plan</p>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${subscription.period === "monthly" ? "5.00" : "50.00"}</p>
                    <p className="text-sm text-green-500">Paid</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No billing history available on the free plan.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {toast.show && (
        <SimpleToast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
      )}
    </div>
  )
}
