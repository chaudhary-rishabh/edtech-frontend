"use client"

import { Button } from "@/components/ui/button"
import { FaGoogle, FaMicrosoft, FaAmazon, FaYoutube } from 'react-icons/fa';
import {
  ArrowRight,
  Brain,
  Code,
  Database,
  Cpu,
  Zap,
  Bot,
  Terminal,
  Smartphone,
  Cloud,
  GitBranch,
  Layers,
  Send,
} from "lucide-react"
import { motion, Variants } from "framer-motion"
import { AvatarGroupDemo } from "../ui/avatar-group"
import FloatingCard from "./FloatingCard"

// Animation variants for main content
const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

// Animation variants for laptop
const laptopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut", delay: 0.2 } },
}

export default function HeroSection() {
  return (
    <section className="relative bg-grid-lines min-h-screen flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden pt-24 md:pt-0">
      {/* Floating Tech Icons */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none rounded-3xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='8' stitchTiles='stitch' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "color-burn",
          borderRadius: "inherit",
        }}
      />

      {/* Finer secondary texture (adds subtle crispness) */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none rounded-3xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineNoise'%3E%3CfeTurbulence type='turbulence' baseFrequency='3.5' numOctaves='6' stitchTiles='stitch' seed='11'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.85 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineNoise)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          borderRadius: "inherit",
        }}
      />

      {/* Shimmer highlight with more intensity */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shimmer pointer-events-none rounded-3xl" />

      {/* Moving shimmer with richer angle and bounce */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none rounded-3xl"
        style={{
          background: "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.9) 50%, transparent 65%)",
          animation: "shimmer 5s ease-in-out infinite alternate",
          borderRadius: "inherit",
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Icons */}
        <div className="absolute top-[30%] md:top-[20%] left-4 md:left-20 animate-float-delayed">
            <FloatingCard imgSrc="/student apnacollege.png" name="Rishabh" ctaText="Placed at Google Hyderabad" />
        </div>

        <div className="absolute top-32 md:top-56 left-60 md:left-80 animate-float-delayed">
          <div className="absolute top-20 md:top-20 left-4 md:left-20 animate-float">
            {/* <FloatingCard imgSrc="/student apnacollege.png" name="Rishabh" ctaText="Placed at Google Hyderabad" /> */}
          </div>
        </div>

        {/* Top Right Icons */}
        <div className="absolute top-20 md:top-20 right-4 md:right-20 animate-float">
          <FloatingCard imgSrc="/student1 apnacollege.png" name="Vikram" ctaText="Placed at Techit Bangaluru" />
        </div>

        <div className="absolute top-40 md:top-[35%] right-24 md:right-32 animate-float-delayed">
          <FloatingCard imgSrc="/studentimage apnacollege.png" name="Nikhil" ctaText="Placed at Ather Tech Pune" />
        </div>

        {/* Left Side Icons */}
        <div className="absolute left-8 md:left-20 top-1/2 animate-float">
          <FloatingCard imgSrc="/student3 apnacollege.png" name="Vaibhavi" ctaText="Placed at Microsoft Bangaluru" />
        </div>

        <div className="absolute left-4 md:left-20 bottom-40 animate-float-delayed">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-2xl shadow-purple-700 flex items-center justify-center transform rotate-12 hover:shadow-gray-300/50 transition-shadow">
            <Cloud className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="absolute right-8 md:right-16 top-[60%] animate-float">
          <FloatingCard imgSrc="/student2 apnacollege.png" name="Niyati" ctaText="Placed at Zomato Bangaluru" />
        </div>

        <div className="absolute right-4 top-[70%] md:right-20 bottom-40 animate-float-delayed">
          {/* <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-2xl shadow-yellow-500 flex items-center justify-center transform rotate-6 hover:shadow-teal-300/50 transition-shadow">
            <FaMicrosoft className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </div> */}
        </div>

        {/* Bottom Icons */}
        <div className="absolute bottom-20 left-1/4 animate-float">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-2xl shadow-purple-700 flex items-center justify-center transform rotate-12 hover:shadow-gray-300/50 transition-shadow">
            <FaAmazon className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
        </div>

        <div className="absolute bottom-32 right-1/4 animate-float-delayed">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-2xl shadow-yellow-700 flex items-center justify-center transform -rotate-6 hover:shadow-yellow-300/50 transition-shadow">
            <FaGoogle className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-2xl shadow-purple-700 flex items-center justify-center transform rotate-3 hover:shadow-emerald-300/50 transition-shadow">
            <Layers className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center sm:mt-12 max-w-4xl mx-auto relative z-10 flex-1 flex flex-col justify-center"
        initial="visible"
        animate="visible"
        // variants={contentVariants}
      >
        <div className="mb-6 md:mb-2">
          <div className="inline-flex items-center px-3 md:px-4 py-2 bg-white text-white rounded-full text-xs md:text-sm font-medium mb-6 md:mb-8">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          </div>
        </div>

        <h1
          className="text-3xl md:text-5xl mt-10 lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
          style={{ fontFamily: "Domine, serif" }}
        >
          Learn & become the
          Top 1% software developer
        </h1>

        <p className="text-lg md:w-92 px-1 mx-auto md:text-xl rounded-2xl bg-yellow-200 text-yellow-800 mb-5 md:mb-2">signup now and get placed in top MNC</p>
        <Button className="w-32 mx-auto bg-gradient-to-br from-indigo-500 via-gray-300 hover:via-gray-100 to-purple-600 hover:to-purple-500 text-gray-900 font-bold hover:shadow-xl rounded-xl hover:bg-white">
          <span>Get Started</span>
          <ArrowRight className="h-4 w-4 font-bold" />
        </Button>
      </motion.div>

      {/* Glowing Laptop at Bottom */}
      <motion.div
        className="relative z-10 mb-8 md:mb-16 md:mt-10"
        initial="visible"
        animate="visible"
        // variants={laptopVariants}
      >
        <div className="relative">
          {/* Laptop Base */}
          <div className="relative mx-auto w-80 md:w-96 rounded-3xl lg:w-[660px]">
            {/* Laptop Screen */}
            <div className="bg-gray-900 rounded-t-3xl p-2 animate-glow-laptop">
              <div className="bg-gray-100 rounded-3xl aspect-[16/10] overflow-hidden relative">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/xWSpo2lFfUw?autoplay=1&rel=0&showinfo=0&modestbranding=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>


            {/* Laptop Base */}
            <div className="bg-gray-800 h-4 rounded-b-2xl shadow-lg relative">
              <div className="absolute inset-x-0 top-1 h-1 bg-gray-700 rounded-full mx-auto w-16"></div>
            </div>

            {/* Laptop Stand */}
            <div className="bg-gray-700 h-2 w-24 mx-auto rounded-b-lg shadow-md"></div>
          </div>

          {/* Glowing Effect */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur-xl animate-pulse-glow"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}