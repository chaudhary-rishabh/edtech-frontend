"use client"

import * as React from "react"
import { chapters } from "./data"
import type { Chapter, Difficulty, Problem } from "./types"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressBar } from "./progress-bar"
import DifficultyBadge from "./difficulty-badge"
import { BookOpen, CheckCircle2, ChevronDown, ExternalLink, Film, Layers3, Search, Shuffle } from "lucide-react"

type ProgressMap = Record<string, boolean>
type RevisionMap = Record<string, boolean>

const PROGRESS_KEY = "dsa-progress-v1"
const REVISION_KEY = "dsa-revision-v1"

// Colors used (5 total):
// - Primary: teal (buttons, progress) -> bg-teal-500
// - Neutrals: background, foreground, muted grays
// - Accent 1: emerald (Easy)
// - Accent 2: amber (Medium)
// Hard uses primary teal tone.

export default function DSASheet() {
    const [query, setQuery] = React.useState("")
    const [difficulty, setDifficulty] = React.useState<"All" | Difficulty>("All")
    const [tab, setTab] = React.useState<"all" | "revision">("all")

    const [progress, setProgress] = React.useState<ProgressMap>({})
    const [revision, setRevision] = React.useState<RevisionMap>({})

    // Load persisted state
    React.useEffect(() => {
        try {
            const p = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}")
            const r = JSON.parse(localStorage.getItem(REVISION_KEY) || "{}")
            setProgress(p)
            setRevision(r)
        } catch { }
    }, [])

    // Persist state
    React.useEffect(() => {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    }, [progress])
    React.useEffect(() => {
        localStorage.setItem(REVISION_KEY, JSON.stringify(revision))
    }, [revision])

    const allProblems = React.useMemo(() => {
        const list: Problem[] = []
        chapters.forEach((c) => c.topics.forEach((t) => t.problems.forEach((p) => list.push(p))))
        return list
    }, [])

    const filteredProblems = React.useMemo(() => {
        return allProblems.filter((p) => {
            const matchesQuery = query.trim().length === 0 || p.title.toLowerCase().includes(query.toLowerCase())
            const matchesDiff = difficulty === "All" || p.difficulty === difficulty
            const matchesTab = tab === "all" || revision[p.id]
            return matchesQuery && matchesDiff && matchesTab
        })
    }, [allProblems, query, difficulty, tab, revision])

    const totals = React.useMemo(() => {
        const total = allProblems.length
        const done = allProblems.filter((p) => progress[p.id]).length
        const byDiff: Record<Difficulty, { total: number; done: number }> = {
            Easy: { total: 0, done: 0 },
            Medium: { total: 0, done: 0 },
            Hard: { total: 0, done: 0 },
        }
        allProblems.forEach((p) => {
            byDiff[p.difficulty].total += 1
            if (progress[p.id]) byDiff[p.difficulty].done += 1
        })
        return { total, done, byDiff }
    }, [allProblems, progress])

    function toggleProblem(id: string) {
        setProgress((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    function toggleRevision(id: string) {
        setRevision((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    function pickRandom() {
        const pool = filteredProblems.filter((p) => !progress[p.id])
        if (pool.length === 0) return
        const pick = pool[Math.floor(Math.random() * pool.length)]
        const el = document.getElementById(pick.id)
        el?.scrollIntoView({ behavior: "smooth", block: "center" })
        el?.classList.add("ring-2", "ring-teal-500")
        setTimeout(() => el?.classList.remove("ring-2", "ring-teal-500"), 1500)
    }

    return (
        <div className="flex flex-col gap-6">
            <HeaderSummary totals={totals} />

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Tabs value={tab} onValueChange={(v: "all" | "revision") => setTab(v)}>
                    <TabsList>
                        <TabsTrigger value="all">All Problems</TabsTrigger>
                        <TabsTrigger value="revision">Revision</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex flex-1 items-center gap-2 md:justify-end">
                    <div className="relative w-full max-w-sm">
                        <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            aria-label="Search problems"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search problems..."
                            className="pl-8"
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 bg-transparent">
                                <Layers3 className="h-4 w-4" />
                                Difficulty
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Filter</DropdownMenuLabel>
                            {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                                <DropdownMenuItem
                                    key={d}
                                    onClick={() => setDifficulty(d)}
                                    className={d === difficulty ? "font-medium text-teal-500" : ""}
                                >
                                    {d}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button onClick={pickRandom} className="gap-2">
                        <Shuffle className="h-4 w-4" />
                        Pick Random
                    </Button>
                </div>
            </div>

            <div className="rounded-xl border bg-card">
                <div className="p-3 md:p-4">
                    <Accordion type="multiple" className="w-full">
                        {chapters.map((chapter) => {
                            const chProblems = chapter.topics.flatMap((t) => t.problems)
                            const chDone = chProblems.filter((p) => progress[p.id]).length
                            const chPct = chProblems.length ? (chDone / chProblems.length) * 100 : 0
                            return (
                                <AccordionItem key={chapter.id} value={chapter.id} className="border-none">
                                    <AccordionTrigger className="rounded-lg px-2 py-3 hover:no-underline data-[state=open]:bg-muted">
                                        <div className="flex w-full items-center justify-between gap-3">
                                            <div className="text-left">
                                                <h3 className="text-sm font-medium md:text-base">{chapter.title}</h3>
                                            </div>
                                            <div className="hidden w-64 items-center gap-2 md:flex">
                                                <ProgressBar value={chPct} aria-label="Chapter progress" />
                                                <span className="text-xs text-muted-foreground">
                                                    {chDone} / {chProblems.length}
                                                </span>
                                            </div>
                                            <span className="text-xs text-muted-foreground md:hidden">
                                                {chDone}/{chProblems.length}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-2 pb-4 md:px-4">
                                        <div className="flex flex-col gap-4">
                                            {chapter.topics.map((topic) => (
                                                <TopicTable
                                                    key={topic.id}
                                                    chapter={chapter}
                                                    topicTitle={topic.title}
                                                    problems={topic.problems}
                                                    query={query}
                                                    difficulty={difficulty}
                                                    tab={tab}
                                                    progress={progress}
                                                    revision={revision}
                                                    onToggle={toggleProblem}
                                                    onToggleRevision={toggleRevision}
                                                />
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

function HeaderSummary({
    totals,
}: {
    totals: {
        total: number
        done: number
        byDiff: Record<Difficulty, { total: number; done: number }>
    }
}) {
    const pct = totals.total ? (totals.done / totals.total) * 100 : 0
    const easyPct = totals.byDiff.Easy.total ? (totals.byDiff.Easy.done / totals.byDiff.Easy.total) * 100 : 0
    const medPct = totals.byDiff.Medium.total ? (totals.byDiff.Medium.done / totals.byDiff.Medium.total) * 100 : 0
    const hardPct = totals.byDiff.Hard.total ? (totals.byDiff.Hard.done / totals.byDiff.Hard.total) * 100 : 0

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <StatCard title="Total Progress" completed={totals.done} total={totals.total} pct={pct} />
            <StatCard
                title="Easy"
                completed={totals.byDiff.Easy.done}
                total={totals.byDiff.Easy.total}
                pct={easyPct}
                accent="emerald"
            />
            <StatCard
                title="Medium"
                completed={totals.byDiff.Medium.done}
                total={totals.byDiff.Medium.total}
                pct={medPct}
                accent="amber"
            />
            <StatCard
                title="Hard"
                completed={totals.byDiff.Hard.done}
                total={totals.byDiff.Hard.total}
                pct={hardPct}
                accent="teal"
                className="md:col-span-3"
            />
        </div>
    )
}

function StatCard({
    title,
    completed,
    total,
    pct,
    accent = "teal",
    className,
}: {
    title: string
    completed: number
    total: number
    pct: number
    accent?: "teal" | "emerald" | "amber"
    className?: string
}) {
    const barClass = accent === "emerald" ? "bg-emerald-500" : accent === "amber" ? "bg-amber-500" : "bg-teal-500"
    return (
        <Card className={className}>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm md:text-base">
                    <span>{title}</span>
                    <Badge variant="secondary">{Math.round(pct)}%</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="text-xs text-muted-foreground">
                    {completed} / {total} completed
                </div>
                <div
                    className="h-2 w-full rounded-full bg-muted"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(pct)}
                >
                    <div className={`h-2 rounded-full ${barClass}`} style={{ width: `${pct}%` }} />
                </div>
            </CardContent>
        </Card>
    )
}

function TopicTable({
    chapter,
    topicTitle,
    problems,
    query,
    difficulty,
    tab,
    progress,
    revision,
    onToggle,
    onToggleRevision,
}: {
    chapter: Chapter
    topicTitle: string
    problems: Problem[]
    query: string
    difficulty: "All" | Difficulty
    tab: "all" | "revision"
    progress: Record<string, boolean>
    revision: Record<string, boolean>
    onToggle: (id: string) => void
    onToggleRevision: (id: string) => void
}) {
    const filtered = React.useMemo(() => {
        return problems.filter((p) => {
            const matchesQuery = query.trim().length === 0 || p.title.toLowerCase().includes(query.toLowerCase())
            const matchesDiff = difficulty === "All" || p.difficulty === difficulty
            const matchesTab = tab === "all" || revision[p.id]
            return matchesQuery && matchesDiff && matchesTab
        })
    }, [problems, query, difficulty, tab, revision])

    if (filtered.length === 0) return null

    return (
        <div className="overflow-hidden rounded-xl border bg-card">
            <div className="flex items-center justify-between border-b px-3 py-3 md:px-4">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium md:text-base">{topicTitle}</h4>
                </div>
                <span className="text-xs text-muted-foreground">
                    {filtered.filter((p) => progress[p.id]).length} / {filtered.length}
                </span>
            </div>

            <div className="divide-y">
                <RowHeader />
                {filtered.map((p) => (
                    <ProblemRow
                        key={p.id}
                        problem={p}
                        checked={!!progress[p.id]}
                        starred={!!revision[p.id]}
                        onToggle={() => onToggle(p.id)}
                        onToggleRevision={() => onToggleRevision(p.id)}
                    />
                ))}
            </div>
        </div>
    )
}

function RowHeader() {
    return (
        <div className="grid grid-cols-2 items-center gap-2 px-3 py-2 text-xs text-muted-foreground md:grid-cols-7 md:px-4">
            <span className="hidden md:block">Status</span>
            <span>Problem</span>
            <span className="hidden md:block">YouTube</span>
            <span className="hidden md:block">Practice</span>
            <span className="hidden md:block">Article</span>
            <span className="hidden md:block">Revision</span>
            <span className="text-right">Difficulty</span>
        </div>
    )
}

function ProblemRow({
    problem,
    checked,
    starred,
    onToggle,
    onToggleRevision,
}: {
    problem: Problem
    checked: boolean
    starred: boolean
    onToggle: () => void
    onToggleRevision: () => void
}) {
    return (
        <div id={problem.id} className="grid grid-cols-2 items-center gap-2 px-3 py-3 md:grid-cols-7 md:px-4">
            <div className="hidden items-center gap-2 md:flex">
                <Checkbox checked={checked} onCheckedChange={onToggle} aria-label="Mark complete" />
                {checked ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" /> Done
                    </span>
                ) : (
                    <span className="text-xs text-muted-foreground">To do</span>
                )}
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm">{problem.title}</span>
            </div>

            <div className="hidden md:flex">
                {problem.youtube ? (
                    <ResourceLink href={problem.youtube} label="Watch" icon="youtube" />
                ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                )}
            </div>

            <div className="hidden md:flex flex-wrap gap-2">
                {problem.practice?.length ? (
                    problem.practice.map((pr) => (
                        <ResourceLink
                            key={pr.url}
                            href={pr.url}
                            label={pr.label}
                            icon={pr.label === "LeetCode" ? "leetcode" : "codeforces"}
                        />
                    ))
                ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                )}
            </div>

            <div className="hidden md:flex">
                {problem.article ? (
                    <ResourceLink href={problem.article} label="Read" icon="article" />
                ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                )}
            </div>

            <div className="hidden md:flex">
                <Button variant={starred ? "secondary" : "outline"} size="sm" onClick={onToggleRevision}>
                    {starred ? "Starred" : "Add"}
                </Button>
            </div>

            <div className="flex items-center justify-end">
                <DifficultyBadge level={problem.difficulty} />
            </div>

            {/* Mobile compact row controls */}
            <div className="col-span-2 mt-2 flex items-center justify-between gap-2 md:hidden">
                <div className="flex items-center gap-3">
                    <Checkbox checked={checked} onCheckedChange={onToggle} aria-label="Mark complete" />
                    <Button variant={starred ? "secondary" : "outline"} size="sm" onClick={onToggleRevision}>
                        {starred ? "Starred" : "Revision"}
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    {problem.youtube && <ResourceIcon href={problem.youtube} icon="youtube" />}
                    {problem.practice?.map((p) => (
                        <ResourceIcon key={p.url} href={p.url} icon={p.label === "LeetCode" ? "leetcode" : "codeforces"} />
                    ))}
                    {problem.article && <ResourceIcon href={problem.article} icon="article" />}
                </div>
            </div>
        </div>
    )
}

function ResourceLink({
    href,
    label,
    icon,
}: {
    href: string
    label: string
    icon: "youtube" | "leetcode" | "codeforces" | "article"
}) {
    return (
        <a
            className="inline-flex items-center gap-1 text-sm text-teal-400 hover:underline"
            href={href}
            target="_blank"
            rel="noreferrer"
        >
            <ResourceGlyph icon={icon} />
            {label}
            <ExternalLink className="ml-0.5 h-3.5 w-3.5 opacity-70" />
        </a>
    )
}

function ResourceIcon({
    href,
    icon,
}: {
    href: string
    icon: "youtube" | "leetcode" | "codeforces" | "article"
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
            aria-label={icon}
            title={icon}
        >
            <ResourceGlyph icon={icon} />
        </a>
    )
}

function ResourceGlyph({
    icon,
}: {
    icon: "youtube" | "leetcode" | "codeforces" | "article"
}) {
    switch (icon) {
        case "youtube":
            return <Film className="h-4 w-4 text-red-500" />
        case "leetcode":
            // Simple LC mark using a link icon with style
            return <ExternalLink className="h-4 w-4 text-amber-400" />
        case "codeforces":
            return <ExternalLink className="h-4 w-4 text-blue-400" />
        default:
            return <BookOpen className="h-4 w-4 text-sky-400" />
    }
}
