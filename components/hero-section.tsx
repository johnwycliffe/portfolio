"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useColorMode } from "@/app/providers"

export default function HeroSection() {
  const planetRef = useRef<HTMLDivElement>(null)
  const { getGradient, colorMode } = useColorMode()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!planetRef.current) return

      const x = (window.innerWidth / 2 - e.clientX) / 25
      const y = (window.innerHeight / 2 - e.clientY) / 25

      planetRef.current.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "John-ch-resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Softer cloud effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={planetRef}
          className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[1000px] rounded-[100%] bg-gradient-to-b ${getGradient("bg")} opacity-40 blur-[100px] transition-colors duration-500`}
        />
        <div
          className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-[100%] bg-gradient-to-b from-white ${colorMode === "purple" ? "via-purple-400" : "via-blue-400"} to-transparent opacity-20 blur-[80px] transition-colors duration-500`}
        />
      </div>

      {/* Rest of the component remains the same until the buttons */}
      <div className="relative z-10 max-w-4xl">
        <div className="mb-6 inline-flex items-center rounded-full bg-gray-800/60 backdrop-blur-sm px-4 py-2 text-sm">
          <span
            className={`mr-2 h-2 w-2 rounded-full ${colorMode === "purple" ? "bg-blue-500" : "bg-blue-700"} transition-colors duration-500`}
          ></span>
          Fullstack Developer Portfolio
        </div>

        <motion.h1
          className="mb-4 text-5xl font-bold md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hello ,I'm {" "}
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${getGradient("text")} transition-colors duration-500`}
          >
            John Wycliffe
          </span>{" "}
           a FullStack Webdevloper
        </motion.h1>

        <motion.p
          className="mb-12 text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          I'm a Final year b.tech student with experience in building  Website, Mobile Software applications and problem solving  skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={scrollToAbout}
            className={`${
              colorMode === "purple" ? "bg-purple-800 hover:bg-purple-700" : "bg-blue-800 hover:bg-blue-700"
            } text-white px-8 py-6 text-lg w-[200px] rounded-xl transition-colors duration-500`}
            suppressHydrationWarning
          >
            Know More!
          </Button>

          <Button
            onClick={handleDownloadResume}
            className="group flex items-center justify-center gap-2 px-8 py-6 text-lg w-[200px] bg-transparent border border-white/20 text-white hover:bg-white hover:text-black rounded-xl transition-all duration-300"
            suppressHydrationWarning
          >
            <Download className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:text-black" />
            Download Resume
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="animate-bounce absolute bottom-10"
      >
        <ArrowDown className="h-8 w-8 text-gray-400" />
      </motion.div>
    </section>
  )
}
