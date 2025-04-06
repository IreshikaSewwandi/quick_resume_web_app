import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This would typically come from a database or API
const getExampleData = (id: string) => {
  const examples = {
    "software-engineer": {
      title: "Software Engineer",
      name: "Alex Johnson",
      description:
        "A clean, professional resume for software engineering positions highlighting technical skills and project experience.",
      image: "/Software_Engineer.png?height=600&width=450",
      highlights: [
        "Clear organization of technical skills by proficiency level",
        "Project-focused work experience with measurable outcomes",
        "Clean, scannable format optimized for ATS systems",
        "Balance of technical expertise and soft skills",
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Git", "CI/CD", "Agile Methodologies"],
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Innovations Inc.",
          period: "2020 - Present",
          description:
            "Led development of cloud-based applications serving 50,000+ users. Improved system performance by 35% through code optimization.",
        },
        {
          title: "Software Developer",
          company: "Digital Solutions LLC",
          period: "2017 - 2020",
          description:
            "Developed and maintained web applications using React and Node.js. Collaborated with UX team to implement responsive designs.",
        },
      ],
      education: {
        degree: "B.S. Computer Science",
        school: "University of Technology",
        year: "2017",
      },
    },
    "marketing-specialist": {
      title: "Marketing Specialist",
      name: "Jamie Smith",
      description:
        "Creative resume format for marketing professionals that emphasizes campaign results and creative skills.",
      image: "/Marketing_Specialist.png?height=600&width=450",
      highlights: [
        "Results-focused descriptions with metrics and KPIs",
        "Showcase of creative campaign examples",
        "Emphasis on both digital and traditional marketing skills",
        "Clean design that demonstrates attention to branding",
      ],
      skills: [
        "Social Media Marketing",
        "Content Strategy",
        "SEO/SEM",
        "Email Campaigns",
        "Analytics",
        "Brand Development",
      ],
      experience: [
        {
          title: "Marketing Manager",
          company: "Brand Forward Agency",
          period: "2019 - Present",
          description:
            "Managed marketing campaigns for 12+ clients resulting in average engagement increase of 45%. Led rebranding initiatives that increased client conversion rates by 28%.",
        },
        {
          title: "Digital Marketing Specialist",
          company: "Growth Marketing Inc.",
          period: "2017 - 2019",
          description:
            "Executed social media strategies across platforms, growing audience by 10,000+ followers. Optimized PPC campaigns reducing cost-per-acquisition by 32%.",
        },
      ],
      education: {
        degree: "B.A. Marketing Communications",
        school: "State University",
        year: "2017",
      },
    },
    // Add more examples as needed
    default: {
      title: "Example Resume",
      name: "Sample Name",
      description: "A professional resume template example.",
      image: "/data-analyst.png?height=600&width=450",
      highlights: [
        "Clean, professional layout",
        "Well-organized sections",
        "Balanced white space",
        "ATS-friendly format",
      ],
      skills: ["Communication", "Leadership", "Problem Solving", "Teamwork", "Time Management"],
      experience: [
        {
          title: "Senior Position",
          company: "Example Company",
          period: "2020 - Present",
          description: "Accomplished professional with demonstrated success in this role.",
          image: "/Graphic_Designer.png?height=600&width=450",
        },
        {
          title: "Junior Position",
          company: "Previous Company",
          period: "2017 - 2020",
          description: "Developed key skills and contributed to team success through various projects.",
   
        },
      ],
      education: {
        degree: "Bachelor's Degree",
        school: "University Name",
        year: "2017",
      },
    },
  }

  return examples[id as keyof typeof examples] || examples.default
}

export default function ExampleDetailPage({ params }: { params: { id: string } }) {
  const example = getExampleData(params.id)

  return (
    <div className="container py-8">
      <Link href="/examples" className="flex items-center text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Examples
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{example.title} Resume</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{example.description}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Why This Resume Works</h2>
            <ul className="space-y-2">
              {example.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Resume Breakdown</h2>

              <div className="mb-6">
                <h3 className="font-medium text-lg mb-2">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {example.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-lg mb-2">Experience Highlights</h3>
                <div className="space-y-4">
                  {example.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-sm text-gray-500">{exp.company}</p>
                        </div>
                        <p className="text-sm text-gray-500">{exp.period}</p>
                      </div>
                      <p className="text-sm mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Education</h3>
                <p className="font-medium">{example.education.degree}</p>
                <p className="text-sm text-gray-500">
                  {example.education.school}, {example.education.year}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <Link href={`/builder?template=${params.id}`}>Use This Template</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/templates">Browse More Templates</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="relative aspect-[3/4] w-full mb-4">
                <Image
                  src={example.image || "/placeholder.svg"}
                  alt={`${example.title} Resume Example`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-medium">{example.name}</h3>
                <p className="text-sm text-gray-500">{example.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

