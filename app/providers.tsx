"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

type ColorMode = "purple" | "navy"

interface ColorContextType {
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  getGradient: (type: "text" | "bg") => string
}

const ColorContext = createContext<ColorContextType>({
  colorMode: "purple",
  setColorMode: () => {},
  getGradient: () => "",
})

export function useColorMode() {
  return useContext(ColorContext)
}

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("colorMode") as ColorMode | null
      return savedMode || "purple"
    }
    return "purple"
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Apply theme colors to CSS variables when colorMode changes
    const root = document.documentElement
    if (colorMode === "purple") {
      root.style.setProperty("--primary", "252 87% 67%")
      root.style.setProperty("--secondary", "217 76% 51%")
      root.style.setProperty("--accent", "261 73% 63%")
    } else {
      root.style.setProperty("--primary", "217 76% 51%")
      root.style.setProperty("--secondary", "223 76% 37%")
      root.style.setProperty("--accent", "224 76% 48%")
    }

    // Save to localStorage
    localStorage.setItem("colorMode", colorMode)
  }, [colorMode, mounted])

  const getGradient = (type: "text" | "bg") => {
    if (type === "text") {
      return colorMode === "purple" ? "from-purple-400 to-blue-500" : "from-blue-400 to-blue-600"
    } else {
      return colorMode === "purple"
        ? "from-purple-600/40 via-blue-500/40 to-transparent"
        : "from-blue-800/40 via-blue-600/40 to-transparent"
    }
  }

  if (!mounted) {
    return null
  }

  return <ColorContext.Provider value={{ colorMode, setColorMode, getGradient }}>{children}</ColorContext.Provider>
}

