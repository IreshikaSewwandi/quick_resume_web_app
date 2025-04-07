"use client"

import type React from "react"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useState } from "react"
import { SimpleToast } from "../../components/ui/simple-toast"
import { useRequireAuth } from "@/hooks/use-require-auth"

export default function ProfilePage() {
  const { user, isLoading } = useRequireAuth()

  const [name, setName] = useState("")
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "info"
  }>({
    show: false,
    message: "",
    type: "info",
  })

  // Update name when user data is loaded
  if (user && user.name !== name && name === "") {
    setName(user.name)
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // In a real app, you would update the user profile in your database
      // For now, we'll just show a success message
      setToast({
        show: true,
        message: "Profile updated successfully!",
        type: "success",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      setToast({
        show: true,
        message: "Failed to update profile",
        type: "error",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdateProfile}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ""} disabled placeholder="Your email" />
                  <p className="text-sm text-gray-500">Email cannot be changed</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Account Type</Label>
                <p>Standard Account</p>
              </div>
              <div className="space-y-2">
                <Label>Member Since</Label>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {toast.show && (
        <SimpleToast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
      )}
    </div>
  )
}

