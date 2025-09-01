import Image from "next/image"
import { Star, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Person {
  name: string
  title: string
  image: string
  rating: number
}

const people: Person[] = [
  {
    name: "Blake Star",
    title: "COO, blackstar.com",
    image: "/placeholder.svg?height=400&width=300",
    rating: 5,
  },
  {
    name: "David Gilmore",
    title: "CTO, darkside.ai",
    image: "/placeholder.svg?height=400&width=300",
    rating: 5,
  },
  {
    name: "Gerard White",
    title: "COO, exo4emo.ai",
    image: "/placeholder.svg?height=400&width=300",
    rating: 5,
  },
  {
    name: "Alice Johnson",
    title: "Lead Designer, creative.co",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4,
  },
  {
    name: "Bob Williams",
    title: "Software Engineer, techsolutions.dev",
    image: "/placeholder.svg?height=400&width=300",
    rating: 5,
  },
]

export function ProfileCarousel() {
  return (
    <div className="flex justify-center py-8">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl px-4"
      >
        <CarouselContent className="-ml-4">
          {people.map((person, index) => (
            <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden rounded-3xl shadow-lg relative">
                  <CardContent className="p-0 relative">
                    <Image
                      src={person.image || "/placeholder.svg"}
                      alt={`Portrait of ${person.name}`}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover aspect-[3/4]"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 rounded-full bg-white/80 p-2 text-black backdrop-blur-sm hover:bg-white/90"
                      aria-label="Open profile"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </Button>
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm p-4 flex flex-col justify-end text-white">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < person.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400",
                            )}
                          />
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold">{person.name}</h3>
                      <p className="text-sm text-gray-300">{person.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
      </Carousel>
    </div>
  )
}
