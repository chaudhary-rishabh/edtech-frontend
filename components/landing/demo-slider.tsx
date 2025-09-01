"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DemoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const demos = [
    {
      title: "DSA",
      description: "Master Data Structures and Algorithms to crack top product company interviews.",
      videoId: "FkVv5U7gjUw",
    },
    {
      title: "Web Development",
      description: "Build full-stack web applications with the latest technologies.",
      videoId: "NzXohHxGkZ0",
    },
    {
      title: "Interview Preparation",
      description: "Ace your tech interviews with mock sessions and expert guidance.",
      videoId: "N16A258rXJU",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % demos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + demos.length) % demos.length)
  }

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See Apna College in action
          </h2>
          <p className="text-xl text-gray-600">
            Watch how our students at Apna College are getting placed at top companies.
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative aspect-video">
              {demos.map((demo, index) => (
                <iframe
                  key={index}
                  src={`https://www.youtube.com/embed/${demo.videoId}?rel=0&modestbranding=1`}
                  title={demo.title}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ))}
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {demos[currentSlide].title}
              </h3>
              <p className="text-gray-600">{demos[currentSlide].description}</p>
            </div>
          </div>

          {/* Left Arrow */}
          <Button
            onClick={prevSlide}
            variant="outline"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-3 bg-white shadow z-30"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Right Arrow */}
          <Button
            onClick={nextSlide}
            variant="outline"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-3 bg-white shadow z-30"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {demos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-gray-900" : "bg-gray-300"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
