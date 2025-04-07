import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define paths that are considered public
  const publicPaths = [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/auth/error",
    "/auth/forgot-password",
    "/templates",
    "/examples",
  ]

  const isPublicPath = publicPaths.some((publicPath) => path === publicPath || path.startsWith("/api/"))

  // Check if the path is public or if it's an asset (like images, css, etc.)
  if (isPublicPath || path.includes(".")) {
    return NextResponse.next()
  }

  // For client-side auth, we'll just let the client handle the redirection
  // The protected routes will check for authentication in their components
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

