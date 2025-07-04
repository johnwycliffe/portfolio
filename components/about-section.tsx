"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useColorMode } from "@/app/providers"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isHovered, setIsHovered] = useState(false)
  const { colorMode } = useColorMode()

  return (
    <section id="about" className="py-20 px-4 md:px-8">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          className="mb-12 text-center text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          About{" "}
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${colorMode === "purple" ? "from-purple-400 to-blue-500" : "from-blue-400 to-blue-600"}`}
          >
            Me
          </span>
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="relative mx-auto overflow-hidden rounded-xl transition-all duration-300"
              style={{
                width: "320px",
                height: "320px",
                boxShadow: isHovered
                  ? `0 0 25px 5px ${colorMode === "purple" ? "rgba(147, 51, 234, 0.7)" : "rgba(37, 99, 235, 0.7)"}`
                  : "none",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/johnny-R95LOXvlgdBgDkzO1z3vWykiKKI8Rh.jpeg"
                alt="Developer portrait"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 border-4 rounded-xl transition-all duration-300 ${
                  isHovered ? (colorMode === "purple" ? "border-purple-500" : "border-blue-500") : "border-transparent"
                }`}
              />
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="mb-4 text-lg text-gray-300">
              I'm a passionate full-stack developer with expertise in creating immersive digital experiences. With a
              background in both front-end and back-end technologies, I bring ideas to life through clean, efficient
              code and intuitive design.
            </p>
            <p className="mb-4 text-lg text-gray-300">
              My journey in the digital universe began 3 years ago, and since then, I've been on a mission to explore
              new technologies and push the boundaries of what's possible on the web and mobile platforms.
            </p>
            <p className="text-lg text-gray-300">
              When I'm not coding, you can find me exploring the latest design trends,playing music  with  musical Instruments , or gazing at the actual stars that inspired this website.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

