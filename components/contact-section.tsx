"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Send, Mail, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useColorMode } from "@/app/providers"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [serverResponse, setServerResponse] = useState<any>(null)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { colorMode } = useColorMode()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setServerResponse(null)

    try {
      console.log('Sending form data:', formState)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()
      console.log('Server response:', data)
      setServerResponse(data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setServerResponse(null)
      }, 5000)
    } catch (err) {
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message')
      setTimeout(() => {
        setError("")
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-black bg-opacity-60">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          className="mb-12 text-center text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Contact{" "}
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${colorMode === "purple" ? "from-purple-400 to-blue-500" : "from-blue-400 to-blue-600"}`}
          >
            Me
          </span>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-4 text-2xl font-semibold">Get In Touch</h3>
            <p className="mb-6 text-gray-300">
              Any suggestions or ideas wanted to be shared and collab together. Please connect with me or send a DM to my socials
            </p>

            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-4">
                <Mail className={`h-6 w-6 ${colorMode === "purple" ? "text-purple-500" : "text-blue-500"}`} />
                <span>johnwycliffechindada@outlook.com</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/johnwycliffe"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full ${
                  colorMode === "purple" ? "bg-gray-800 hover:bg-purple-900" : "bg-gray-800 hover:bg-blue-900"
                } p-3 text-gray-300 transition-colors hover:text-white`}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/john-wycliffe-chindada-2717a5274/"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full ${
                  colorMode === "purple" ? "bg-gray-800 hover:bg-purple-900" : "bg-gray-800 hover:bg-blue-900"
                } p-3 text-gray-300 transition-colors hover:text-white`}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full ${
                  colorMode === "purple" ? "bg-gray-800 hover:bg-purple-900" : "bg-gray-800 hover:bg-blue-900"
                } p-3 text-gray-300 transition-colors hover:text-white`}
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isSubmitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-lg bg-gray-800 p-8 text-center">
                <div className={`mb-4 rounded-full ${colorMode === "purple" ? "bg-purple-500" : "bg-blue-500"} p-3`}>
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Message Sent!</h3>
                <p className="text-gray-300">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-gray-800 p-6">
                {error && (
                  <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                    {error}
                  </div>
                )}
                {serverResponse && (
                  <div className="mb-4 rounded-md bg-blue-500/10 p-3 text-sm text-blue-500">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(serverResponse, null, 2)}
                    </pre>
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] bg-gray-700"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    colorMode === "purple"
                      ? "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        <p suppressHydrationWarning>&copy; {new Date().getFullYear()} John Wycliffe Chindada. All rights reserved.</p>
      </div>
    </section>
  )
}

