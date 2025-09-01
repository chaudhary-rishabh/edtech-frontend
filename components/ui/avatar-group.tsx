"use client" // This directive must be at the very top of the file

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  image: string
}

interface AvatarGroupProps {
  users: User[]
  maxVisible?: number
}

export default function AvatarGroup({ users = [], maxVisible = 4 }: AvatarGroupProps) {
  const visibleUsers = users.slice(0, maxVisible)
  const remainingCount = users.length - visibleUsers.length

  return (
    <div className="flex items-center -space-x-4">
      {visibleUsers.map((user, index) => (
        <Avatar
          key={user.id}
          className={cn(
            "w-12 h-12 border-2 border-white transition-transform duration-200 ease-in-out hover:scale-105",
            index > 0 && "relative z-10", // Ensure overlap order
          )}
          style={{ zIndex: users.length - index }} // Higher z-index for earlier avatars
        >
          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar className="w-12 h-12 border-2 border-white bg-gray-100 text-gray-700 flex items-center justify-center text-sm font-medium relative z-0">
          <AvatarFallback className="bg-transparent">{`+${remainingCount}`}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

// Example usage in a page or component
export function AvatarGroupDemo() {
  const users = [
    { id: "1", name: "John Doe", image: "/placeholder.svg?height=100&width=100&text=JD" },
    { id: "2", name: "Jane Smith", image: "/placeholder.svg?height=100&width=100&text=JS" },
    { id: "3", name: "Peter Jones", image: "/placeholder.svg?height=100&width=100&text=PJ" },
    { id: "4", name: "Alice Brown", image: "/placeholder.svg?height=100&width=100&text=AB" },
    { id: "5", name: "Bob White", image: "/placeholder.svg?height=100&width=100&text=BW" },
    { id: "6", name: "Charlie Green", image: "/placeholder.svg?height=100&width=100&text=CG" },
    { id: "7", name: "Diana Black", image: "/placeholder.svg?height=100&width=100&text=DB" },
  ]

  // Removed the outer div here to make it truly independent
  return <AvatarGroup users={users} maxVisible={4} />
}
