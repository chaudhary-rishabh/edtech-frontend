"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Check } from "lucide-react"

export default function EmailCTA() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsLoading(false)
        setIsSubmitted(true)
        setEmail("")

        // Reset after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000)
    }

    return (
        <section className="py-16 lg:py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800" />

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <defs>
                                <pattern id="ctaGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="10" cy="10" r="1" fill="white" />
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#ctaGrid)" />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 lg:p-16 text-center">
                        <motion.h2
                            className="text-3xl lg:text-5xl font-serif text-white mb-6 leading-tight"
                            style={{ fontFamily: "Lora, serif" }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Still any doubt?
                        </motion.h2>

                        <motion.p
                            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Subscribe to stay updated with the latest features, tutorials, and success stories from the Apna College
                            community.
                        </motion.p>

                        <motion.form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex-1">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full px-6 py-4 rounded-2xl border-0 text-gray-900 placeholder-gray-500 font-sans focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading || isSubmitted}
                                className={`px-8 py-4 rounded-2xl font-sans font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitted ? "bg-green-500 text-white" : "bg-white text-blue-600 hover:bg-gray-50 hover:shadow-xl"
                                    } ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                                whileHover={!isLoading && !isSubmitted ? { scale: 1.05 } : {}}
                                whileTap={!isLoading && !isSubmitted ? { scale: 0.95 } : {}}
                            >
                                {isSubmitted ? (
                                    <>
                                        <Check size={20} />
                                        Subscribed!
                                    </>
                                ) : isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                        Subscribing...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Subscribe
                                    </>
                                )}
                            </motion.button>
                        </motion.form>

                        <motion.p
                            className="text-sm text-blue-200 mt-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            No spam, unsubscribe at any time. We respect your privacy.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
