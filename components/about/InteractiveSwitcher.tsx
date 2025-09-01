"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, Code2, Rocket, Settings, Grid, Brain } from "lucide-react"

const switcherData = [
    {
        id: "design",
        label: "Web Development",
        icon: Palette,
        title: "Projects + Live Classes, MERN Stack",
        description:
            "Projects + Live sessions + recorded classes, MERN Stack, build consistent UI components Reactjs and design systems tailored to your brand. Apna College makes you perfect to build responsive layouts, color schemes.",
        image: "/placeholder.svg?height=400&width=600&text=Design+System",
    },
    {
        id: "dsa",
        label: "Data Structures & Algorithms",
        icon: Brain,
        title: "Master Data Structures + Algorithms",
        description:
            "Get hands-on with algorithms and data structures, the backbone of every coding interview. Solve complex problems, optimize code, and become confident in solving DSA challenges.",
        image: "/placeholder.svg?height=400&width=600&text=DSA+Mastery",
    },
    {
        id: "interview",
        label: "Interview Preparation",
        icon: Code2,
        title: "Crack Coding Interviews + System Design",
        description:
            "Ace your interviews with tailored coaching for coding interviews, behavioral questions, and system design rounds. Apna College prepares you for top tech companies with mock interviews and live sessions.",
        image: "/placeholder.svg?height=400&width=600&text=Interview+Preparation",
    },
    {
        id: "system-design",
        label: "System Design",
        icon: Grid,
        title: "Master System Design for Interviews",
        description:
            "Prepare for system design interviews with in-depth understanding of scalable architectures, distributed systems, and design patterns. Learn how to approach real-world design problems.",
        image: "/placeholder.svg?height=400&width=600&text=System+Design+Mastery",
    },
    {
        id: "job-assistance",
        label: "Job Assistance",
        icon: Brain,
        title: "Job Assistance & Placement Support",
        description:
            "Get personalized job search support, resume reviews, and interview prep. Apna College connects you with top recruiters to help land your dream job in tech, with post-placement support.",
        image: "/placeholder.svg?height=400&width=600&text=Job+Assistance",
    },
    {
        id: "deploy",
        label: "Deploy",
        icon: Rocket,
        title: "Automated Deployment Pipeline",
        description:
            "Launch your application with zero configuration. Apna College sets up CI/CD pipelines, containerization, cloud infrastructure, and monitoring so your app is ready for users immediately.",
        image: "/placeholder.svg?height=400&width=600&text=Deployment+Pipeline",
    },
    {
        id: "maintain",
        label: "Maintain",
        icon: Settings,
        title: "Intelligent Maintenance",
        description:
            "Keep your application running smoothly with AI-powered monitoring, automated updates, and intelligent error detection. Apna College helps you scale and optimize as your user base grows.",
        image: "/placeholder.svg?height=400&width=600&text=Maintenance+Dashboard",
    },
]


export default function InteractiveSwitcher() {
    const [activeItem, setActiveItem] = useState("design")

    const activeData = switcherData.find((item) => item.id === activeItem)

    return (
        <section className="py-16 lg:py-24 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-5xl font-serif text-gray-900 mb-6" style={{ fontFamily: "Lora, serif" }}>
                        All Courses Plans
                    </h2>
                </motion.div>

                <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white p-8">
                            <AnimatePresence mode="wait">
                                {activeData && (
                                    <motion.div
                                        key={activeData.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={activeData.image || "/placeholder.svg"}
                                            alt={activeData.title}
                                            className="w-full h-80 object-cover rounded-2xl"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <motion.div
                        className="order-1 lg:order-2 space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid grid-cols-1 gap-4">
                            {switcherData.map((item) => {
                                const Icon = item.icon
                                return (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setActiveItem(item.id)}
                                        className={`flex items-center gap-4 p-4 rounded-2xl font-sans font-medium transition-all duration-300 text-left ${activeItem === item.id
                                                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                                                : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200"
                                            }`}
                                        whileHover={{ scale: activeItem === item.id ? 1.05 : 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Icon size={24} />
                                        <span className="text-lg">{item.label}</span>
                                    </motion.button>
                                )
                            })}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeData && (
                                <motion.div
                                    key={activeData.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                                >
                                    <h3 className="text-2xl font-serif text-gray-900 mb-4" style={{ fontFamily: "Lora, serif" }}>
                                        {activeData.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">{activeData.description}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Image and Buttons Container */}
                        <div className="relative flex">
                            {/* Left Side - Image (takes about 70% width) */}
                            <div className="w-[70%] relative">
                                <div className="rounded-3xl overflow-hidden shadow-xl bg-white p-4">
                                    <AnimatePresence mode="wait">
                                        {activeData && (
                                            <motion.div
                                                key={activeData.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <img
                                                    src={activeData.image || "/placeholder.svg"}
                                                    alt={activeData.title}
                                                    className="w-full h-64 object-cover rounded-2xl"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Right Side - Vertical Icon Buttons (positioned to overlap) */}
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
                                <div className="flex flex-col gap-3">
                                    {switcherData.map((item, index) => {
                                        const Icon = item.icon
                                        return (
                                            <motion.button
                                                key={item.id}
                                                onClick={() => setActiveItem(item.id)}
                                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${activeItem === item.id
                                                        ? "bg-blue-600 text-white shadow-xl transform scale-110"
                                                        : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-xl border border-gray-200"
                                                    }`}
                                                whileHover={{ scale: activeItem === item.id ? 1.1 : 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <Icon size={20} />
                                            </motion.button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Content */}
                        <div className="mt-8">
                            <AnimatePresence mode="wait">
                                {activeData && (
                                    <motion.div
                                        key={activeData.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
                                    >
                                        <h3 className="text-xl font-serif text-gray-900 mb-3" style={{ fontFamily: "Lora, serif" }}>
                                            {activeData.title}
                                        </h3>
                                        <p className="text-base text-gray-600 leading-relaxed">{activeData.description}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
