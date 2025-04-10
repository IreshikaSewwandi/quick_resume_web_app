"use client"

import Link from "next/link"
import { Button } from "../components/ui/button"
import { ModeToggle } from "../components/mode-toggle"
import { useState } from "react"
import { Menu, X, User, LogOut, CreditCard } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  // Safely check if user has a subscription and if the tier is "pro"
  const isProUser = user?.subscription?.tier === "pro"

  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">QuickResume</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          <Link href="/templates" className="text-sm font-medium hover:underline underline-offset-4">
            Templates
          </Link>
          <Link href="/builder" className="text-sm font-medium hover:underline underline-offset-4">
            Resume Builder
          </Link>
          <Link href="/examples" className="text-sm font-medium hover:underline underline-offset-4">
            Examples
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.name && <p className="font-medium">{user.name}</p>}
                    {user.email && <p className="w-[200px] truncate text-sm text-gray-500">{user.email}</p>}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {isProUser ? (
                  <DropdownMenuItem asChild>
                    <Link href="/account/billing">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Manage Subscription</span>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/pricing">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Upgrade to Pro</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    signOut()
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button className="hidden md:flex" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button variant="outline" className="hidden md:flex" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              href="/templates"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="/builder"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Resume Builder
            </Link>
            <Link
              href="/examples"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Examples
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {!user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Button asChild onClick={() => setIsMenuOpen(false)}>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    Dashboard
                  </Button>
                </Link>
                {!isProUser && (
                  <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-start">Upgrade to Pro</Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500"
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
