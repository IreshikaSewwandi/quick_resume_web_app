"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Checkbox } from "../components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import type { Experience } from "@/types/resume"
import { Plus, Trash } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface ExperienceFormProps {
  data: Experience[]
  updateData: (data: Experience[]) => void
}

export function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    data.length > 0
      ? data
      : [
          {
            id: uuidv4(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
          },
        ],
  )

  const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
    const updatedExperiences = experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    const updatedExperiences = [...experiences, newExperience]
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const removeExperience = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id)
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <Button onClick={addExperience} size="sm" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </div>

      {experiences.map((experience, index) => (
        <Card key={experience.id} className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Experience {index + 1}</CardTitle>
              {experiences.length > 1 && (
                <Button
                  onClick={() => removeExperience(experience.id)}
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
                <Label htmlFor={`company-${experience.id}`}>Company</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => handleChange(experience.id, "company", e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`position-${experience.id}`}>Position</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => handleChange(experience.id, "position", e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleChange(experience.id, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id={`endDate-${experience.id}`}
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => handleChange(experience.id, "endDate", e.target.value)}
                    disabled={experience.current}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:col-span-2">
                <Checkbox
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onCheckedChange={(checked) => {
                    handleChange(experience.id, "current", !!checked)
                  }}
                />
                <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`description-${experience.id}`}>Description</Label>
                <Textarea
                  id={`description-${experience.id}`}
                  value={experience.description}
                  onChange={(e) => handleChange(experience.id, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
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

