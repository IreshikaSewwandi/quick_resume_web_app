import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function ExamplesPage() {
  const examples = [
    {
      id: "software-engineer",
      title: "Software Engineer",
      description:
        "A clean, professional resume for software engineering positions highlighting technical skills and project experience.",
      image: "/Software_Engineer.png?height=400&width=300",
    },
    {
      id: "marketing-specialist",
      title: "Marketing Specialist",
      description:
        "Creative resume format for marketing professionals that emphasizes campaign results and creative skills.",
      image: "/Marketing_Specialist.png?height=400&width=300",
    },
    {
      id: "project-manager",
      title: "Project Manager",
      description:
        "Structured resume layout for project managers showcasing leadership skills and successful project deliveries.",
      image: "/project-manager.png?height=400&width=300",
    },
    {
      id: "graphic-designer",
      title: "Graphic Designer",
      description:
        "Visual-focused resume for designers that demonstrates creativity while maintaining professional structure.",
      image: "/Graphic_Designer.png?height=400&width=300",
    },
    {
      id: "data-analyst",
      title: "Data Analyst",
      description:
        "Detail-oriented resume for data professionals highlighting analytical skills and quantifiable achievements.",
      image: "/data-analyst.png?height=400&width=300",
    },
    {
      id: "healthcare-professional",
      title: "Healthcare Professional",
      description:
        "Organized resume for healthcare workers emphasizing certifications, patient care, and medical expertise.",
      image: "/healthcare-professional.png?height=400&width=300",
    },
  ]

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Resume Examples</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Browse through our collection of professionally crafted resume examples for different industries and career
          levels. Use these as inspiration to create your own standout resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <Card key={example.id} className="overflow-hidden flex flex-col">
            <div className="relative aspect-[3/4] w-full">
              <Image src={example.image || "/placeholder.svg"} alt={example.title} fill className="object-cover" />
            </div>
            <CardContent className="flex flex-col flex-grow p-5">
              <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">{example.description}</p>
              <div className="flex gap-2 mt-auto">
                <Button asChild className="flex-1">
                  <Link href={`/builder?template=${example.id}`}>Use This Format</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href={`/examples/${example.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Need More Inspiration?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Our resume builder makes it easy to create a professional resume regardless of your industry or experience
          level. Try it now to see how simple it is to create your own standout resume.
        </p>
        <Button size="lg" asChild>
          <Link href="/builder">Create Your Resume Now</Link>
        </Button>
      </div>
    </div>
  )
}

