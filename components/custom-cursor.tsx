"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { useColorMode } from "@/app/providers"

export default function CustomCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)
  const { colorMode } = useColorMode()

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0
    }

    if (isTouchDevice()) {
      return
    }

    setHidden(false)

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      // Direct update for immediate response
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], .hover-trigger").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      removeEventListeners()
      // Restore default cursor
      document.body.style.cursor = "auto"
    }
  }, [cursorX, cursorY])

  // Don't render on touch devices or when hidden
  if (hidden) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[9999] ${clicked ? "scale-75" : "scale-100"}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className={`h-3 w-3 rounded-full ${colorMode === "purple" ? "bg-purple-400" : "bg-blue-400"}`} />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[9998] flex h-8 w-8 items-center justify-center rounded-full ${
          linkHovered ? "scale-150" : clicked ? "scale-75" : "scale-100"
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          transition: "transform 0.15s ease-out",
        }}
      >
        <div
          className={`h-full w-full rounded-full border-2 ${
            colorMode === "purple" ? "border-purple-500" : "border-blue-500"
          }`}
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-24 w-24 rounded-full opacity-20 blur-xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`h-full w-full rounded-full ${
            colorMode === "purple"
              ? "bg-gradient-to-r from-purple-600 to-blue-500"
              : "bg-gradient-to-r from-blue-600 to-blue-400"
          }`}
        />
      </motion.div>
    </>
  )
}

