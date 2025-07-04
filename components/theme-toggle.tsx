"use client"

import { Moon, Sun } from "lucide-react"
import { useColorMode } from "@/app/providers"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { colorMode, setColorMode } = useColorMode()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setColorMode(colorMode === "purple" ? "navy" : "purple")
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      className="flex items-center space-x-1 rounded-full bg-gray-800/40 backdrop-blur-sm px-3 py-1 text-xs font-medium transition-all hover:bg-gray-700/40"
    >
      {colorMode === "purple" ? (
        <>
          <Moon className="h-3 w-3 text-purple-400" />
          <span>John Mode</span>
        </>
      ) : (
        <>
          <Sun className="h-3 w-3 text-blue-400" />
          <span>John Mode</span>
        </>
      )}
    </Button>
  )
}

