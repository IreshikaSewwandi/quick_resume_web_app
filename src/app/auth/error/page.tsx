import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import Link from "next/link"

export default function AuthError() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          <CardDescription>There was a problem with your authentication request</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">This could be due to an expired session, invalid credentials, or a system error.</p>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button asChild className="w-full">
            <Link href="/auth/signin">Try Again</Link>
          </Button>
          <p className="mt-4 text-center text-sm text-gray-500">
            Need help?{" "}
            <Link href="/contact" className="text-gray-900 underline underline-offset-4 hover:text-gray-900">
              Contact Support
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

