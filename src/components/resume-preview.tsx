"use client"

import type { ResumeData } from "@/types/resume"

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="p-8 max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-1">{personalInfo.name || "Your Name"}</h1>
        {personalInfo.title && <p className="text-gray-600 dark:text-gray-400 mb-2">{personalInfo.title}</p>}

        <div className="flex flex-wrap justify-center gap-x-4 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{exp.position || "Position"}</h3>
                    <p className="text-sm">{exp.company || "Company"}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exp.startDate
                      ? new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                      : "Start Date"}{" "}
                    -{" "}
                    {exp.current
                      ? "Present"
                      : exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                        : "End Date"}
                  </p>
                </div>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.institution || "Institution"}</h3>
                    <p className="text-sm">
                      {edu.degree || "Degree"}
                      {edu.field ? `, ${edu.field}` : ""}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {edu.startDate
                      ? new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                      : "Start Date"}{" "}
                    -{" "}
                    {edu.current
                      ? "Present"
                      : edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                        : "End Date"}
                  </p>
                </div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                {skill.name || "Skill"}
                {skill.level > 0 && (
                  <span className="ml-1 text-gray-500 dark:text-gray-400">{Array(skill.level).fill("●").join("")}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

