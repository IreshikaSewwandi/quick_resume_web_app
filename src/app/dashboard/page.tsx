"use client"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import Link from "next/link"
import { FileText, Plus, AlertTriangle } from "lucide-react"
import { useRequireAuth } from "@/hooks/use-require-auth"
import { Progress } from "../../components/ui/progress"

export default function Dashboard() {
  const { user, isLoading, canCreateCV } = useRequireAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  // Mock data for resumes - in a real app, this would come from a database
  const resumes = [
    { id: 1, title: "Software Developer Resume", lastUpdated: "2023-04-15" },
    { id: 2, title: "Marketing Specialist Resume", lastUpdated: "2023-03-22" },
  ]

  const { subscription } = user
  const isFree = subscription?.tier === "free"
  const cvLimit = isFree ? 2 : Number.POSITIVE_INFINITY
  const cvCount = subscription?.cvCount || 0
  const cvRemaining = Math.max(0, cvLimit - cvCount)
  const cvPercentage = isFree ? (cvCount / cvLimit) * 100 : 100

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <Button asChild disabled={!canCreateCV}>
          <Link href={canCreateCV ? "/builder" : "/pricing"}>
            <Plus className="mr-2 h-4 w-4" /> Create New Resume
          </Link>
        </Button>
      </div>

      {/* Subscription Status Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription>
            {isFree ? "You're currently on the Free plan" : `You're on the Pro ${subscription?.period} plan`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Resume Usage</span>
                <span className="text-sm text-gray-500">
                  {cvCount} / {isFree ? cvLimit : "Unlimited"}
                </span>
              </div>
              <Progress value={cvPercentage} className="h-2" />
            </div>

            {isFree && cvCount >= 2 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 p-3 rounded-md flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">You've reached your free plan limit</p>
                  <p className="text-sm mt-1">Upgrade to Pro for unlimited resumes and premium features.</p>
                </div>
              </div>
            )}

            {subscription?.endDate && (
              <div className="text-sm text-gray-500">
                {subscription.tier === "pro" && (
                  <p>Your subscription will renew on {new Date(subscription.endDate).toLocaleDateString()}</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {isFree ? (
            <Button asChild>
              <Link href="/pricing">Upgrade to Pro</Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/account/billing">Manage Subscription</Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      {resumes.length === 0 ? (
        <Card className="text-center p-12">
          <CardContent className="pt-6 pb-8 flex flex-col items-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
              <FileText className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              You haven't created any resumes yet. Start building your professional resume now.
            </p>
            <Button asChild disabled={!canCreateCV}>
              <Link href={canCreateCV ? "/builder" : "/pricing"}>
                <Plus className="mr-2 h-4 w-4" /> Create Your First Resume
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id}>
              <CardHeader>
                <CardTitle>{resume.title}</CardTitle>
                <CardDescription>Last updated: {resume.lastUpdated}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/builder?resume=${resume.id}`}>Edit</Link>
                </Button>
                <Button variant="outline">Preview</Button>
                <Button>Download</Button>
              </CardFooter>
            </Card>
          ))}
          {canCreateCV && (
            <Card className="border-dashed flex items-center justify-center h-[200px]">
              <Button variant="ghost" asChild className="flex flex-col h-full w-full">
                <Link href="/builder" className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Plus className="h-8 w-8 mx-auto mb-2" />
                    <span>Create New Resume</span>
                  </div>
                </Link>
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
