import Image from "next/image"
import { cn } from "@/lib/utils"

interface FeaturesProps {
  type: "text" | "image"
  quote: string
  author: string
  title: string
  avatar?: string
  image?: string
  bgColor?: string
  textColor?: string
}

export const Features = ({
  type,
  quote,
  author,
  title,
  avatar,
  image,
  bgColor = "bg-white",
  textColor = "text-gray-800",
}: FeaturesProps) => {
  return (
    <div
      className={cn(
        "relative sm:w-full w-9/12 h-full rounded-xl shadow-lg overflow-hidden flex flex-col justify-between p-6",
        bgColor,
        textColor,
      )}
    >
      {type === "image" && image && (
        <div className="absolute inset-0">
          <Image
            src={image || "/placeholder.svg"}
            alt="Testimonial background"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      )}
      <div className={cn("relative z-10 flex flex-col h-full", type === "image" && "text-white")}>
        <p className="md:text-lg text-sm font-semibold mb-4 flex-grow">{quote}</p>
        <div className="flex items-center">
          {type === "text" && avatar && (
            <Image
              src={avatar || "/placeholder.svg"}
              alt={author}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
          )}
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm opacity-80">{title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
