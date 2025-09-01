"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Code, Rocket, TrendingUp } from "lucide-react"

const tabs = [
    {
        id: "plan",
        label: "Plan",
        icon: Zap,
        content:
            "Transform your ideas into comprehensive project blueprints with AI-powered planning. Apna College analyzes your requirements and generates detailed specifications, user stories, and technical architecture in seconds.",
    },
    {
        id: "build",
        label: "Build",
        icon: Code,
        content:
            "Watch your vision come to life as Apna College generates production-ready code across the full stack. From database schemas to frontend components, every line is crafted with best practices and modern frameworks.",
    },
    {
        id: "deploy",
        label: "Deploy",
        icon: Rocket,
        content:
            "Launch your application with enterprise-grade CI/CD pipelines automatically configured. Apna College handles containerization, cloud deployment, and monitoring setup so you can focus on growing your product.",
    },
    {
        id: "scale",
        label: "Scale",
        icon: TrendingUp,
        content:
            "Grow your application seamlessly with intelligent infrastructure scaling. Apna College automatically configures autoscaling, improves CI/CD pipelines, and implements advanced deployment strategies like blue-green and rolling deployments for zero-downtime updates.",
    },
]

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState("plan")

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-16 lg:py-24">
            <div className="max-w-4xl mx-auto w-full">
                <div className="gap-8 lg:gap-16 items-center">
                    {/* Left Content - 60% */}
                    <motion.div
                        className="lg:col-span-3 space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-6">
                            <motion.h1
                                className="text-2xl lg:text-5xl font-serif leading-tight text-gray-900"
                                style={{ fontFamily: "Lora, serif" }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                India's Most Loved Coding Community, With 1M+ Students getting Hired
                            </motion.h1>

                            <motion.p
                                className="text-xl text-gray-600 font-sans leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                DSA + Web Development  + Interview Preparation + System Design + Projects + Job Assistance
                            </motion.p>
                        </div>

                        {/* Tab Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4 justify-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {tabs.map((tab) => {
                                const Icon = tab.icon
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-6 py-3 rounded-3xl font-sans font-medium transition-all duration-300 ${activeTab === tab.id
                                                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {tab.label}
                                    </button>
                                )
                            })}
                        </motion.div>

                        {/* Tab Content */}
                        <div className="min-h-[120px]">
                            <AnimatePresence mode="wait">
                                {tabs.map(
                                    (tab) =>
                                        activeTab === tab.id && (
                                            <motion.div
                                                key={tab.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.5 }}
                                                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                                            >
                                                <p
                                                    className="text-lg text-gray-700 leading-relaxed font-serif"
                                                    style={{ fontFamily: "Lora, serif" }}
                                                >
                                                    {tab.content}
                                                </p>
                                            </motion.div>
                                        ),
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
