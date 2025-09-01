import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { ArrowRightIcon } from 'lucide-react'
const FloatingCard = ({ name, ctaText, imgSrc }:any) => {
    return (
        <div className="p-1 h-full rounded-3xl">
            <Card className="relative overflow-hidden rounded-3xl cursor-pointer hover:shadow-2xl hover:shadow-gray-500 shadow-lg flex flex-col h-full bg-gradient-to-br from-blue-300 via-gray-100 to-purple-400">
                {/* Grainy Texture */}
                <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='8' stitchTiles='stitch' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        mixBlendMode: "color-burn",
                    }}
                />

                {/* Shimmer Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shimmer pointer-events-none" />

                <CardContent className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                        <p className="leading-relaxed font-bold text-gray-700 mb-4">
                            {ctaText}
                           
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-auto p-3 rounded-2xl shadow-xl bg-white">
                        <Image
                            src={imgSrc}
                            alt={`apna college`}
                            width={50}
                            height={50}
                            className="rounded-2xl object-cover"
                        />
                        <span className="font-semibold text-gray-900">{name}  <ArrowRightIcon className="inline-block ml-2 h-4 w-4 text-gray-700" /></span>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default FloatingCard