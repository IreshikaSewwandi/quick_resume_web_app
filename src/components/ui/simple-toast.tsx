"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface SimpleToastProps {
  message: string
  type?: "success" | "error" | "info"
  duration?: number
  onClose: () => void
}

export function SimpleToast({ message, type = "info", duration = 3000, onClose }: SimpleToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${bgColor} text-white px-4 py-2 rounded shadow-lg flex items-center`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2">
        <X size={16} />
      </button>
    </div>
  )
}

