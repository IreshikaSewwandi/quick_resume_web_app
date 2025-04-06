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
import { SimpleToast } from "../../components/ui/simple-toast"

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

  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "info"
  }>({
    show: false,
    message: "",
    type: "info",
  })

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleSave = () => {
    try {
      // Save to localStorage for now
      localStorage.setItem("savedResume", JSON.stringify(resumeData))
      setToast({
        show: true,
        message: "Resume saved successfully!",
        type: "success",
      })
    } catch (error) {
      console.error("Error saving resume:", error)
      setToast({
        show: true,
        message: "Failed to save resume",
        type: "error",
      })
    }
  }

  const handlePreview = () => {
    try {
      // Get the resume content
      const resumeContent = document.getElementById("resume-preview-content")

      if (!resumeContent) {
        throw new Error("Resume content not found")
      }

      // Open a new window
      const previewWindow = window.open("", "_blank", "width=800,height=600,scrollbars=yes")

      if (!previewWindow) {
        throw new Error("Please allow pop-ups to preview your resume")
      }

      // Write the resume content to the new window
      previewWindow.document.write("<html><head><title>Resume Preview</title>")
      previewWindow.document.write("<style>")
      previewWindow.document.write(`
        body { 
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          color: black;
        }
        h1, h2, h3 { margin-top: 0; }
        .text-center { text-align: center; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mt-1 { margin-top: 0.25rem; }
        .text-sm { font-size: 0.875rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-lg { font-size: 1.125rem; }
        .font-bold { font-weight: bold; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .border-b { border-bottom: 1px solid #e2e8f0; }
        .pb-1 { padding-bottom: 0.25rem; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-start { align-items: flex-start; }
        .flex-wrap { flex-wrap: wrap; }
        .justify-center { justify-content: center; }
        .gap-x-4 { column-gap: 1rem; }
        .gap-2 { gap: 0.5rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .rounded-full { border-radius: 9999px; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .ml-1 { margin-left: 0.25rem; }
      `)
      previewWindow.document.write("</style></head><body>")
      previewWindow.document.write(resumeContent.innerHTML)
      previewWindow.document.write("</body></html>")
      previewWindow.document.close()
    } catch (error) {
      console.error("Error previewing resume:", error)
      setToast({
        show: true,
        message: error instanceof Error ? error.message : "Failed to preview resume",
        type: "error",
      })
    }
  }

  const handleDownload = () => {
    try {
      // Get the resume content
      const resumeContent = document.getElementById("resume-preview-content")

      if (!resumeContent) {
        throw new Error("Resume content not found")
      }

      // Open a new window
      const printWindow = window.open("", "", "height=600,width=800")

      if (!printWindow) {
        throw new Error("Please allow pop-ups to download your resume")
      }

      // Write the resume content to the new window
      printWindow.document.write("<html><head><title>Resume</title>")
      printWindow.document.write("<style>")
      printWindow.document.write(`
        body { 
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1, h2, h3 { margin-top: 0; }
        .text-center { text-align: center; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mt-1 { margin-top: 0.25rem; }
        .text-sm { font-size: 0.875rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-lg { font-size: 1.125rem; }
        .font-bold { font-weight: bold; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .border-b { border-bottom: 1px solid #e2e8f0; }
        .pb-1 { padding-bottom: 0.25rem; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-start { align-items: flex-start; }
        .flex-wrap { flex-wrap: wrap; }
        .justify-center { justify-content: center; }
        .gap-x-4 { column-gap: 1rem; }
        .gap-2 { gap: 0.5rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .rounded-full { border-radius: 9999px; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .ml-1 { margin-left: 0.25rem; }
        @media print {
          body { -webkit-print-color-adjust: exact; }
        }
      `)
      printWindow.document.write("</style></head><body>")
      printWindow.document.write(resumeContent.innerHTML)
      printWindow.document.write("</body></html>")
      printWindow.document.close()

      // Wait for content to load before printing
      printWindow.onload = () => {
        printWindow.focus()
        printWindow.print()
        printWindow.close()
      }
    } catch (error) {
      console.error("Error downloading PDF:", error)
      setToast({
        show: true,
        message: error instanceof Error ? error.message : "Failed to download resume",
        type: "error",
      })
    }
  }

  const closeToast = () => {
    setToast({ ...toast, show: false })
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
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button size="sm" onClick={handleDownload}>
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

      {toast.show && <SimpleToast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  )
}

