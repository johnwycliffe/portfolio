"use client"

import { useEffect, useRef, useState } from "react"
import { useColorMode } from "@/app/providers"
import { useMobile } from "@/hooks/use-mobile"

export default function SpaceBackground() {
  const blackholeRef = useRef<HTMLVideoElement>(null)
  const blueholeRef = useRef<HTMLVideoElement>(null)
  const { colorMode } = useColorMode()
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    // Ensure videos are playing
    const playVideos = async () => {
      try {
        // Create promises to track loading
        const promises = []

        if (blackholeRef.current) {
          blackholeRef.current.load() // Force load
          promises.push(
            new Promise<void>((resolve) => {
              blackholeRef.current!.onloadeddata = () => {
                blackholeRef.current!.play().catch((e) => console.error("Error playing blackhole video:", e))
                resolve()
              }
            }),
          )
        }

        if (blueholeRef.current) {
          blueholeRef.current.load() // Force load
          promises.push(
            new Promise<void>((resolve) => {
              blueholeRef.current!.onloadeddata = () => {
                blueholeRef.current!.play().catch((e) => console.error("Error playing bluehole video:", e))
                resolve()
              }
            }),
          )
        }

        // Wait for all videos to load
        await Promise.all(promises)
        setIsLoaded(true)
      } catch (error) {
        console.error("Error playing videos:", error)
        // Set loaded anyway to avoid blank screen
        setIsLoaded(true)
      }
    }

    playVideos()

    // Add event listeners to restart videos when they end
    const handleBlackholeEnded = () => {
      if (blackholeRef.current) {
        blackholeRef.current.currentTime = 0
        blackholeRef.current.play().catch((e) => console.error("Error replaying blackhole video:", e))
      }
    }

    const handleBlueholeEnded = () => {
      if (blueholeRef.current) {
        blueholeRef.current.currentTime = 0
        blueholeRef.current.play().catch((e) => console.error("Error replaying bluehole video:", e))
      }
    }

    if (blackholeRef.current) {
      blackholeRef.current.addEventListener("ended", handleBlackholeEnded)
    }

    if (blueholeRef.current) {
      blueholeRef.current.addEventListener("ended", handleBlueholeEnded)
    }

    return () => {
      // Clean up event listeners
      if (blackholeRef.current) {
        blackholeRef.current.removeEventListener("ended", handleBlackholeEnded)
      }
      if (blueholeRef.current) {
        blueholeRef.current.removeEventListener("ended", handleBlueholeEnded)
      }
    }
  }, [])

  // Determine video size based on device
  const videoSize = isMobile ? "100%" : "130%"
  const videoScale = isMobile ? "0.8" : "0.95"

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Black hole video (purple theme) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          colorMode === "purple" ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          ref={blackholeRef}
          className={`absolute object-cover ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          style={{
            height: videoSize,
            width: videoSize,
            objectPosition: "center center",
            transform: `translate(-50%, -50%) rotate(-0deg) scale(${videoScale})`,
            left: "50%",
            top: "50%",
          }}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster="/placeholder.svg?height=800&width=800"
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video>
      </div>

      {/* Blue hole video (blue theme) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          colorMode === "navy" ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          ref={blueholeRef}
          className={`absolute object-cover ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          style={{
            height: videoSize,
            width: videoSize,
            objectPosition: "center center",
            transform: `translate(-50%, -50%) rotate(-0deg) scale(${videoScale})`,
            left: "50%",
            top: "50%",
          }}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster="/placeholder.svg?height=800&width=800"
        >
          <source src="/bluehole.webm" type="video/webm" />
        </video>
      </div>
    </div>
  )
}

