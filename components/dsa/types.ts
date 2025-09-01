export type Difficulty = "Easy" | "Medium" | "Hard"

export type Problem = {
    id: string
    title: string
    youtube?: string
    practice?: { label: "LeetCode" | "Codeforces"; url: string }[]
    article?: string
    difficulty: Difficulty
}

export type Topic = {
    id: string
    title: string
    problems: Problem[]
}

export type Chapter = {
    id: string
    title: string
    topics: Topic[]
}
