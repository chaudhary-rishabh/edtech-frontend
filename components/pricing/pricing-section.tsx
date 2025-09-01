"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const pricingData = {
    standard: {
        monthly: { price: 3000, original: 12 },
        yearly: { price: 8999, original: 10 },
    },
    premium: {
        monthly: { price: 20000, original: 24 },
        yearly: { price: 14999, original: 20 },
    },
}

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly")

    const getPlanPrices = (plan: "standard" | "premium") => {
        return billingCycle === "monthly" ? pricingData[plan].monthly : pricingData[plan].yearly
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl xl:text-3xl/none text-gray-900">
                        Balance Of Authenticity & Affordability
                    </h2>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12 text-sm">
                    <motion.div initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                        <Card className="relative flex flex-col justify-between h-full p-6 rounded-3xl shadow-2xl shadow-gray-700/40 border-none bg-gradient-to-br from-blue-500 via-gray-100 to-purple-600">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-bold text-gray-900">ALPHA PLUS 6.0 α</CardTitle>
                                <CardDescription className="text-gray-600">Complete DSA Batch</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="text-3xl font-bold text-gray-900">
                                    ₹{getPlanPrices("standard").price}
                                    <span className="ml-2 text-lg font-normal text-gray-500 line-through">
                                        ₹{getPlanPrices("standard").original}
                                    </span>
                                </div>
                                <Button className="w-full mt-6 bg-white rounded-xl text-black shadow-2xl">Explore More</Button>
                                <div className="mt-6 space-y-2 text-gray-700">
                                    <ul className="space-y-1">
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Programming Language</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Data Structures & Algorithms</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Advanced DSA</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 50 Live Practice Sessions with MAANG Engineers : alternate day</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Quant & Aptitude Preparation</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Core Subjects Study Material</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Individual doubt support : TA</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Certificate of Completion</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Duration - 4 months</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Start Date - 25th Aug, 2025</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                        <Card className="relative flex flex-col justify-between h-full p-6 rounded-3xl shadow-2xl shadow-gray-700/40 border-none bg-gradient-to-br from-purple-100 via-gray-100 to-blue-300">
                            <Badge className="absolute -top-3 right-6 px-3 py-1 text-xs font-medium text-white bg-purple-600 rounded-full shadow-md rotate-3">
                                MOST POPULAR
                            </Badge>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-bold text-gray-900">SIGMA 9.0 Σ</CardTitle>
                                <CardDescription className="text-gray-600">Complete DSA + Web Development</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="text-3xl font-bold text-gray-900">
                                    ₹{getPlanPrices("premium").price}
                                    <span className="ml-2 text-lg font-normal text-gray-500 line-through">
                                        ₹{getPlanPrices("premium").original}
                                    </span>
                                </div>
                                <Button className="w-full mt-6 bg-gradient-to-t from-gray-300 to-purple-700 rounded-xl text-white shadow-2xl">Enroll now</Button>
                                <div className="mt-6 space-y-2 text-gray-700">
                                    <ul className="space-y-1">
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Everything included in Alpha Plus 6.0</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Complete DSA in Java/C++</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Projects like Zerodha, Airbnb, Zoom, LinkedIn, ChatGPT, GitHub & many more</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Quant & Aptitude Preparation</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Complete MERN Stack</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Frontend & React</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Backend & Database</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Individual Doubt Support for DSA & Development : TA</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Core Subjects Study Material</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 1:1 Live Resume Correction with Mentor</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 2 Certificates of Completion</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Duration - 8.5 months</li>
                                        <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Start Date - 25th Aug, 2025</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
