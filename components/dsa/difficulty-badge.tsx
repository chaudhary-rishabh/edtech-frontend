import { Badge } from "@/components/ui/badge"
import type { Difficulty } from "./types"

export default function DifficultyBadge({ level }: { level: Difficulty }) {
    const styles: Record<Difficulty, string> = {
        Easy: "bg-emerald-500/15 text-emerald-400",
        Medium: "bg-amber-500/15 text-amber-400",
        Hard: "bg-teal-500/15 text-teal-400",
    }
    return <Badge className={styles[level]}>{level}</Badge>
}
