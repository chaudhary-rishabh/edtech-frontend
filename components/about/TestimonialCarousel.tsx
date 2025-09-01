"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const testimonials = [
    {
        id: 1,
        name: "Sarah Chen",
        title: "CTO, TechFlow",
        company: "TechFlow",
        image: "/placeholder.svg?height=300&width=300&text=Sarah+Chen",
        quote:
            "Apna College transformed our development process. What used to take weeks now happens in hours. The AI-generated code is production-ready and follows all our best practices.",
        color: "from-blue-500 to-purple-600",
    },
    {
        id: 2,
        name: "Marcus Rodriguez",
        title: "Founder, InnovateLab",
        company: "InnovateLab",
        image: "/placeholder.svg?height=300&width=300&text=Marcus+Rodriguez",
        quote:
            "The deployment automation is incredible. From idea to live application with CI/CD pipelines - Apna College handles everything seamlessly.",
        color: "from-green-500 to-teal-600",
    },
    {
        id: 3,
        name: "Emily Watson",
        title: "Lead Developer, DataSync",
        company: "DataSync",
        image: "/placeholder.svg?height=300&width=300&text=Emily+Watson",
        quote:
            "I was skeptical about AI-generated code, but Apna College produces clean, maintainable applications that scale beautifully. It's like having a senior developer on demand.",
        color: "from-pink-500 to-rose-600",
    },
    {
        id: 4,
        name: "David Kim",
        title: "Product Manager, CloudVision",
        company: "CloudVision",
        image: "/placeholder.svg?height=300&width=300&text=David+Kim",
        quote:
            "Apna College's natural language processing is remarkable. I describe what I want, and it builds exactly that - complete with database design and API endpoints.",
        color: "from-orange-500 to-red-600",
    },
    {
        id: 5,
        name: "Lisa Thompson",
        title: "Startup Founder, EcoTech",
        company: "EcoTech",
        image: "/placeholder.svg?height=300&width=300&text=Lisa+Thompson",
        quote:
            "As a non-technical founder, Apna College gave me the power to prototype and validate ideas quickly. The generated applications are professional-grade.",
        color: "from-indigo-500 to-blue-600",
    },
    {
        id: 6,
        name: "Alex Johnson",
        title: "Engineering Director, ScaleUp",
        company: "ScaleUp",
        image: "/placeholder.svg?height=300&width=300&text=Alex+Johnson",
        quote:
            "The scaling features are outstanding. Apna College automatically configured our autoscaling and deployment pipelines. Our deployment time reduced by 80%.",
        color: "from-cyan-500 to-blue-600",
    },
]

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
            }, 3000)
            return () => clearInterval(interval)
        }
    }, [isHovered])

    const getVisibleTestimonials = () => {
        const visible = []
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % testimonials.length
            visible.push({ ...testimonials[index], displayIndex: i })
        }
        return visible
    }

    return (
        <section className="py-16 lg:py-24 px-4 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-5xl font-serif text-gray-900 mb-6" style={{ fontFamily: "Lora, serif" }}>
                        Trusted by Folks Worldwide
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See how Students worldwide are transforming their Career with Apna College
                    </p>
                </motion.div>

                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                        setIsHovered(false)
                        setHoveredCard(null)
                    }}
                >
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center min-h-[600px]">
                        {getVisibleTestimonials().map((testimonial, index) => {
                            const isEven = index % 2 === 0
                            const isHoveredCard = hoveredCard === testimonial.id

                            return (
                                <motion.div
                                    key={`${testimonial.id}-${currentIndex}`}
                                    className={`relative ${isEven ? "lg:mt-0" : "lg:mt-16"
                                        } ${index === 1 ? "lg:scale-110 z-10" : "lg:scale-95"}`}
                                    initial={{ opacity: 0, y: isEven ? -50 : 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: isEven ? 50 : -50 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredCard(testimonial.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div
                                        className={`relative rounded-3xl overflow-hidden shadow-xl transition-all duration-500 w-80 h-96 ${isHoveredCard ? "transform scale-105 shadow-2xl" : ""
                                            }`}
                                    >
                                        {/* Background - Black and white by default, colorful on hover */}
                                        <div
                                            className={`absolute inset-0 transition-all duration-500 ${isHoveredCard
                                                    ? `bg-gradient-to-br ${testimonial.color}`
                                                    : "bg-gradient-to-br from-gray-800 to-gray-900"
                                                }`}
                                        />

                                        {/* Content */}
                                        <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                                            <div className="space-y-4">
                                                <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/20">
                                                    <img
                                                        src={testimonial.image || "/placeholder.svg"}
                                                        alt={testimonial.name}
                                                        className={`w-full h-full object-cover transition-all duration-500 ${isHoveredCard ? "grayscale-0" : "grayscale"
                                                            }`}
                                                    />
                                                </div>

                                                <div>
                                                    <h3 className="text-xl font-semibold font-sans">{testimonial.name}</h3>
                                                    <p
                                                        className={`text-sm transition-colors duration-500 ${isHoveredCard ? "text-white/90" : "text-gray-300"
                                                            }`}
                                                    >
                                                        {testimonial.title}
                                                    </p>
                                                    <p
                                                        className={`text-xs transition-colors duration-500 ${isHoveredCard ? "text-white/70" : "text-gray-400"
                                                            }`}
                                                    >
                                                        {testimonial.company}
                                                    </p>
                                                </div>
                                            </div>

                                            <blockquote
                                                className={`text-sm leading-relaxed font-serif transition-colors duration-500 ${isHoveredCard ? "text-white" : "text-gray-200"
                                                    }`}
                                                style={{ fontFamily: "Lora, serif" }}
                                            >
                                                "{testimonial.quote}"
                                            </blockquote>
                                        </div>

                                        {/* Hover overlay */}
                                        <div
                                            className={`absolute inset-0 bg-white/5 transition-opacity duration-500 ${isHoveredCard ? "opacity-100" : "opacity-0"
                                                }`}
                                        />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Progress indicators */}
                    <div className="flex justify-center mt-12 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
