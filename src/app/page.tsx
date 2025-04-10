import Link from "next/link"
import { Button } from "../components/ui/button"
import { ArrowRight, Check } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Your Professional Resume in Minutes
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Our easy-to-use resume builder helps you create a personalized, professional resume that will
                    impress employers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/builder">
                    <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/templates">
                    <Button size="lg" variant="outline">
                      View Templates
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[450px] bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <div className="absolute inset-0 p-8">
                      <div className="h-full w-full bg-white rounded-md shadow-lg dark:bg-gray-900">
                        <div className="p-6 space-y-4">
                          <div className="w-1/3 h-6 bg-gray-200 rounded dark:bg-gray-700" />
                          <div className="space-y-2">
                            <div className="w-3/4 h-4 bg-gray-200 rounded dark:bg-gray-700" />
                            <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700" />
                            <div className="w-2/3 h-4 bg-gray-200 rounded dark:bg-gray-700" />
                          </div>
                          <div className="pt-4 space-y-2">
                            <div className="w-1/4 h-5 bg-gray-200 rounded dark:bg-gray-700" />
                            <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700" />
                            <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700" />
                          </div>
                          <div className="pt-4 space-y-2">
                            <div className="w-1/4 h-5 bg-gray-200 rounded dark:bg-gray-700" />
                            <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700" />
                            <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700" />
                            <div className="w-3/4 h-4 bg-gray-200 rounded dark:bg-gray-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to create a professional resume
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-700">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Multiple Templates</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Choose from a variety of professional templates to make your resume stand out.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-700">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Easy Editing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Simple and intuitive interface to edit your resume sections with real-time preview.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-700">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Export Options</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Download your resume as PDF, share via link, or print directly from the app.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Choose Your Plan</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Get started for free or upgrade to Pro for unlimited resumes and premium features
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="flex flex-col border rounded-lg overflow-hidden">
                <div className="p-6 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Basic resume building for starters</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$0</span>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Create up to 2 resumes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Basic templates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Download as PDF</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800">
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/auth/signup">Select Plan</Link>
                  </Button>
                </div>
              </div>

              {/* Pro Monthly Plan */}
              <div className="flex flex-col border rounded-lg overflow-hidden">
                <div className="p-6 bg-primary text-white">
                  <h3 className="text-2xl font-bold">Pro Monthly</h3>
                  <p className="text-primary-foreground/80 mt-2">Professional resume building with unlimited access</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$5</span>
                    <span className="text-primary-foreground/80 ml-2">/month</span>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Unlimited resumes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>All premium templates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Download in multiple formats</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>AI resume suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Custom sections</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 bg-primary/5">
                  <Button asChild className="w-full">
                    <Link href="/pricing">Select Plan</Link>
                  </Button>
                </div>
              </div>

              {/* Pro Annual Plan */}
              <div className="flex flex-col border rounded-lg overflow-hidden border-primary shadow-lg">
                <div className="p-6 bg-primary text-white">
                  <h3 className="text-2xl font-bold">Pro Annual</h3>
                  <p className="text-primary-foreground/80 mt-2">Save 17% with annual billing</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$50</span>
                    <span className="text-primary-foreground/80 ml-2">/year</span>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Everything in Pro Monthly</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>2 months free</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Resume analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Early access to new features</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 bg-primary/5">
                  <Button asChild className="w-full">
                    <Link href="/pricing">Select Plan</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">© 2023 QuickResume. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
