"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent } from "../components/ui/card"
import type { Skill } from "@/types/resume"
import { Plus, Trash } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { Slider } from "../components/ui/slider"

interface SkillsFormProps {
  data: Skill[]
  updateData: (data: Skill[]) => void
}

export function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>(data.length > 0 ? data : [{ id: uuidv4(), name: "", level: 3 }])

  const handleNameChange = (id: string, value: string) => {
    const updatedSkills = skills.map((skill) => (skill.id === id ? { ...skill, name: value } : skill))
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const handleLevelChange = (id: string, value: number[]) => {
    const updatedSkills = skills.map((skill) => (skill.id === id ? { ...skill, level: value[0] } : skill))
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const addSkill = () => {
    const newSkill: Skill = { id: uuidv4(), name: "", level: 3 }
    const updatedSkills = [...skills, newSkill]
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const removeSkill = (id: string) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id)
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Skills</h3>
        <Button onClick={addSkill} size="sm" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <Label htmlFor={`skill-${skill.id}`} className="sr-only">
                  Skill
                </Label>
                <Input
                  id={`skill-${skill.id}`}
                  value={skill.name}
                  onChange={(e) => handleNameChange(skill.id, e.target.value)}
                  placeholder="Skill name (e.g., JavaScript, Project Management)"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <Label htmlFor={`level-${skill.id}`} className="text-xs">
                    Proficiency: {skill.level}/5
                  </Label>
                </div>
                <Slider
                  id={`level-${skill.id}`}
                  min={1}
                  max={5}
                  step={1}
                  value={[skill.level]}
                  onValueChange={(value) => handleLevelChange(skill.id, value)}
                />
              </div>
              <Button
                onClick={() => removeSkill(skill.id)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                disabled={skills.length <= 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

