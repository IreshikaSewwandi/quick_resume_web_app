"use client"

import Link from "next/link"
import { Button } from "../components/ui/button"
import { ModeToggle } from "../components/mode-toggle"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Button className="hidden md:flex">Sign In</Button>
          <Button variant="outline" className="hidden md:flex">
            Sign Up
          </Button>
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
            <div className="flex flex-col gap-2 pt-2">
              <Button>Sign In</Button>
              <Button variant="outline">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

