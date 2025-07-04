"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { X, Lock, ChevronLeft, ChevronRight } from "lucide-react"
import { useColorMode } from "@/app/providers"

// Sample certificate data - replace with your actual certificates
const certificates = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    image: "/placeholder.svg?height=400&width=600",
  },
 
  {
    id: 4,
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2022",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2023",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Full Stack Web Development",
    issuer: "Udacity",
    date: "2021",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function CertificationsSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[0] | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { colorMode } = useColorMode()

  // Anti-screenshot measures
  useEffect(() => {
    const preventScreenshot = (e: KeyboardEvent) => {
      // Detect print screen attempt
      if (e.key === "PrintScreen" || (e.ctrlKey && e.key === "p") || (e.metaKey && e.key === "p")) {
        e.preventDefault()
        alert("Screenshots are not allowed for certificate verification purposes.")
        return false
      }
    }

    // Prevent context menu
    const preventContextMenu = (e: MouseEvent) => {
      if (selectedCertificate) {
        e.preventDefault()
        return false
      }
    }

    window.addEventListener("keydown", preventScreenshot)
    window.addEventListener("contextmenu", preventContextMenu)

    return () => {
      window.removeEventListener("keydown", preventScreenshot)
      window.removeEventListener("contextmenu", preventContextMenu)
    }
  }, [selectedCertificate])

  // Auto-scroll effect
  useEffect(() => {
    if (!sliderRef.current || isPaused) return

    let animationId: number
    let startTime: number

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      if (!sliderRef.current) return

      const elapsed = timestamp - startTime
      const scrollAmount = elapsed * 0.02 // Adjust speed here

      if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth - sliderRef.current.clientWidth) {
        sliderRef.current.scrollLeft = 0
      } else {
        sliderRef.current.scrollLeft = scrollAmount % sliderRef.current.scrollWidth
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPaused])

  // Navigation functions
  const scrollLeft = () => {
    if (!sliderRef.current) return

    // Calculate the width of one certificate card plus gap
    const cardWidth = 280 + 24 // card width + gap
    sliderRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" })

    // Pause auto-scrolling temporarily
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 1000)
  }

  const scrollRight = () => {
    if (!sliderRef.current) return

    // Calculate the width of one certificate card plus gap
    const cardWidth = 280 + 24 // card width + gap
    sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" })

    // Pause auto-scrolling temporarily
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 1000)
  }

  return (
    <section id="certifications" className="py-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="mb-12 text-center text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          My{" "}
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${colorMode === "purple" ? "from-purple-400 to-blue-500" : "from-blue-400 to-blue-600"}`}
          >
            Certifications
          </span>
        </motion.h2>

        {/* Certificates slider with navigation buttons */}
        <div className="relative">
          {/* Left navigation button */}
          <motion.button
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full ${
              colorMode === "purple" ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
            } shadow-lg transition-colors duration-300 focus:outline-none`}
            onClick={scrollLeft}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </motion.button>

          {/* Right navigation button */}
          <motion.button
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full ${
              colorMode === "purple" ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
            } shadow-lg transition-colors duration-300 focus:outline-none`}
            onClick={scrollRight}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </motion.button>

          {/* Certificates container */}
          <div
            className="relative overflow-hidden mx-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-6"
              style={{ scrollBehavior: "smooth" }}
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="flex-shrink-0 cursor-pointer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedCertificate(cert)}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div
                    className={`relative w-[280px] h-[200px] rounded-lg overflow-hidden border-2 ${
                      colorMode === "purple" ? "border-purple-700" : "border-blue-700"
                    } bg-gray-900 shadow-lg`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.title}
                        className="w-full h-full object-cover opacity-80"
                        style={{ userSelect: "none" }}
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white truncate">{cert.title}</h3>
                      <p className="text-sm text-gray-300">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>

                    <div
                      className={`absolute top-3 right-3 p-1 rounded-full ${
                        colorMode === "purple" ? "bg-purple-500" : "bg-blue-500"
                      }`}
                    >
                      <Lock className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setSelectedCertificate(null)}></div>

            <motion.div
              className={`relative max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden border-2 ${
                colorMode === "purple" ? "border-purple-500" : "border-blue-500"
              } shadow-2xl`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="relative">
                <div className="p-4 flex justify-between items-center border-b border-gray-800">
                  <h3 className="text-xl font-bold">{selectedCertificate.title}</h3>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="relative p-6">
                  {/* Certificate image with watermark overlay */}
                  <div className="relative rounded-lg overflow-hidden" style={{ userSelect: "none" }}>
                    <img
                      src={selectedCertificate.image || "/placeholder.svg"}
                      alt={selectedCertificate.title}
                      className="w-full object-contain max-h-[70vh]"
                      draggable="false"
                      style={{
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        userSelect: "none",
                      }}
                    />

                    {/* Watermark overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, ${
                          colorMode === "purple" ? "rgba(147, 51, 234, 0.2)" : "rgba(37, 99, 235, 0.2)"
                        }, transparent 100px)`,
                      }}
                    >
                      <p className="text-4xl font-bold text-white transform rotate-45 select-none">VERIFICATION ONLY</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-gray-300">
                      Issued by: <span className="font-medium text-white">{selectedCertificate.issuer}</span>
                    </p>
                    <p className="text-gray-300">
                      Date: <span className="font-medium text-white">{selectedCertificate.date}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

