"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  autoPlayInterval?: number
  className?: string
}

export function ProductCarousel({ images, autoPlayInterval = 5000, className }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Reset the timer when the current index changes
  useEffect(() => {
    if (isHovering) return

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      next()
    }, autoPlayInterval)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentIndex, autoPlayInterval, next, isHovering])

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      next()
    }, autoPlayInterval)
  }, [autoPlayInterval, next])

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-border/40 shadow-md bg-muted/10",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full w-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 h-full w-full transition-all duration-500",
              index === currentIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105",
            )}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <p className="font-medium text-sm md:text-base drop-shadow-md">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-1.5 w-8 rounded-full transition-all",
              index === currentIndex ? "bg-primary" : "bg-background/50 hover:bg-background/80",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-between p-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background/90 border-0"
          onClick={(e) => {
            e.preventDefault()
            prev()
          }}
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background/90 border-0"
          onClick={(e) => {
            e.preventDefault()
            next()
          }}
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)
