"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Prep wiser",
    description: "AI-Powered Mock Interview Prep Platform",
    tags: ["Next.js", "Vapi .ai", "Gemini AI", "TypeScript"],
    image: "/Prepwiser.png?height=600&width=500",
    github: "https://github.com/johnwycliffe/ai-mock-interviewer",
    demo: "https://prepwiser-roan.vercel.app",
  },
  {
    title: "Movie Finder",
    description: "Explore a wide range of movies available on the platform.",
    tags: ["Next.js", "Firebase","App write", "Tailwind CSS"],
    image: "/moviefinder.png?height=600&width=800",
    github: "https://github.com/johnwycliffe/Johns-movie-finder",
    demo: "john-s-movie-finder.vercel.app",
  },
  {
    title: "Space Portfolio",
    description: "A space-themed portfolio template for developers",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    image: "/Space portp.png?height=600&width=800",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "University Finder",
    description: " An Indian university search portal . Featuring state filters, live search, and Firebase-secured",
    tags: ["HTML","CSS","javascript","React js "],
    image: "/iipu.png?height=600&width=800",
    github: "https://github.com",
    demo: "https://demo.com",
  },
]

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="projects" className="py-20 px-4 md:px-8">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          className="mb-12 text-center text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Projects</span>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-gray-900 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                <p className="mb-4 text-gray-300">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

