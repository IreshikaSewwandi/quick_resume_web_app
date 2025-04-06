"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Checkbox } from "../components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import type { Education } from "../../types/resume"
import { Plus, Trash } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface EducationFormProps {
  data: Education[]
  updateData: (data: Education[]) => void
}

export function EducationForm({ data, updateData }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(
    data.length > 0
      ? data
      : [
          {
            id: uuidv4(),
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
          },
        ],
  )

  const handleChange = (id: string, field: keyof Education, value: string | boolean) => {
    const updatedEducations = educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    const updatedEducations = [...educations, newEducation]
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const removeEducation = (id: string) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id)
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Education</h3>
        <Button onClick={addEducation} size="sm" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </div>

      {educations.map((education, index) => (
        <Card key={education.id} className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Education {index + 1}</CardTitle>
              {educations.length > 1 && (
                <Button
                  onClick={() => removeEducation(education.id)}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => handleChange(education.id, "institution", e.target.value)}
                  placeholder="University or School Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => handleChange(education.id, "degree", e.target.value)}
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                <Input
                  id={`field-${education.id}`}
                  value={education.field}
                  onChange={(e) => handleChange(education.id, "field", e.target.value)}
                  placeholder="Computer Science, Business, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${education.id}`}
                  type="month"
                  value={education.startDate}
                  onChange={(e) => handleChange(education.id, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                </div>
                <Input
                  id={`endDate-${education.id}`}
                  type="month"
                  value={education.endDate}
                  onChange={(e) => handleChange(education.id, "endDate", e.target.value)}
                  disabled={education.current}
                />
              </div>
              <div className="flex items-center space-x-2 md:col-span-2">
                <Checkbox
                  id={`current-${education.id}`}
                  checked={education.current}
                  onCheckedChange={(checked) => {
                    handleChange(education.id, "current", !!checked)
                  }}
                />
                <Label htmlFor={`current-${education.id}`}>I am currently studying here</Label>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`description-${education.id}`}>Description</Label>
                <Textarea
                  id={`description-${education.id}`}
                  value={education.description}
                  onChange={(e) => handleChange(education.id, "description", e.target.value)}
                  placeholder="Describe your studies, achievements, etc."
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

