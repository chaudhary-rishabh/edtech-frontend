"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does Apna college work?",
      answer:
        "Apna college connects brands with verified creators through our platform. You can browse creator profiles, send collaboration requests, and manage campaigns all in one place.",
    },
    {
      question: "What types of creators are on the platform?",
      answer:
        "We have creators across all major social platforms including Instagram, TikTok, YouTube, Twitter, and LinkedIn. Our creators span various niches from lifestyle and fashion to tech and business.",
    },
    {
      question: "How do you ensure creator quality?",
      answer:
        "All creators go through a thorough verification process. We check their audience authenticity, engagement rates, and content quality before approving them to join our platform.",
    },
    {
      question: "What's the typical campaign timeline?",
      answer:
        "Most campaigns can be launched within 24-48 hours. The actual campaign duration depends on your goals, but typically ranges from 1-4 weeks for optimal results.",
    },
    {
      question: "How is pricing determined?",
      answer:
        "Pricing is based on creator reach, engagement rates, and campaign requirements. Our platform provides transparent pricing with no hidden fees, and you only pay for successful collaborations.",
    },
    {
      question: "Can I track campaign performance?",
      answer:
        "Yes! Our analytics dashboard provides real-time insights into campaign performance, including reach, engagement, clicks, and conversions. You'll have full visibility into your ROI.",
    },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about Apna college </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
