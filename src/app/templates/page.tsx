import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function TemplatesPage() {
  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "A traditional resume layout with a clean, professional look.",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "modern",
      name: "Modern",
      description: "A contemporary design with a fresh, creative approach.",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "A simple, elegant design that focuses on content.",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "creative",
      name: "Creative",
      description: "A bold design for those who want to stand out.",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "professional",
      name: "Professional",
      description: "A sophisticated layout for executive and senior positions.",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "academic",
      name: "Academic",
      description: "Designed for academic and research positions.",
      image: "/placeholder.svg?height=400&width=300",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Resume Templates</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-3xl">
        Choose from our collection of professionally designed resume templates. Each template is fully customizable to
        match your personal style.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <div className="aspect-[3/4] relative">
              <Image src={template.image || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button asChild className="flex-1">
                <Link href={`/builder?template=${template.id}`}>Use Template</Link>
              </Button>
              <Button variant="outline" className="flex-1">
                Preview
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
