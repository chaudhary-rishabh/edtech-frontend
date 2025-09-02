import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import NextAuthProvider from "@/providers/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ApnaCollege",
  description: " Learn & become the Top 1% software developer",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <style>{`
            html {
              font-family: ${GeistSans.style.fontFamily};
              --font-sans: ${GeistSans.variable};
              --font-mono: ${GeistMono.variable};
            }
        `}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
          <NextAuthProvider>
              <main className="">
                <Header/>
                {children}
                <Footer/>
              </main>
          </NextAuthProvider>
        </body>
    </html>
  )
}
