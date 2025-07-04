"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Instagram, Facebook, Github } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import { useColorMode } from "@/app/providers"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { colorMode } = useColorMode()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 h-10 w-10 overflow-hidden">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                alt="Logo"
                className="h-full w-full animate-spin-slow"
                style={{ animationDuration: "10s" }}
              />
            </div>
            <span className="text-xl font-bold">WebDev</span>
          </div>

          {/* Updated navigation menu with glass effect */}
          <div className="hidden md:block">
            <div
              className={`rounded-full backdrop-blur-md ${
                colorMode === "purple"
                  ? "bg-purple-900/20 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                  : "bg-blue-900/20 shadow-[0_0_15px_rgba(30,64,175,0.3)]"
              } px-6 py-2 transition-all duration-300`}
            >
              <div className="flex items-center space-x-8">
                <a href="#about" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
                  About me
                </a>
                <a href="#skills" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
                  Skills
                </a>
                <a href="#projects" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
                  Projects
                </a>
                <a href="#contact" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <div className="hidden md:flex items-center space-x-4">
              
              <a
                href="https://github.com/johnwycliffe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

