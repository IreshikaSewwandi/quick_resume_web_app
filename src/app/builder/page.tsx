"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { PersonalInfoForm } from "../../components/personal-info-form"
import { ExperienceForm } from "../../components/experience-form"
import { EducationForm } from "../../components/education-form"
import { SkillsForm } from "../../components/skills-form"
import { ResumePreview } from "../../components/resume-preview"
import { Download, Eye, Save } from "lucide-react"
import type { ResumeData } from "@/types/resume"

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      title: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  })

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <Card>
              <CardContent className="pt-6">
                <TabsContent value="personal">
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    updateData={(data) => updateResumeData("personalInfo", data)}
                  />
                </TabsContent>
                <TabsContent value="experience">
                  <ExperienceForm
                    data={resumeData.experience}
                    updateData={(data) => updateResumeData("experience", data)}
                  />
                </TabsContent>
                <TabsContent value="education">
                  <EducationForm
                    data={resumeData.education}
                    updateData={(data) => updateResumeData("education", data)}
                  />
                </TabsContent>
                <TabsContent value="skills">
                  <SkillsForm data={resumeData.skills} updateData={(data) => updateResumeData("skills", data)} />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-950 border rounded-lg overflow-hidden flex-1">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  )
}

