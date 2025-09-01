import type { Chapter } from "./types"

// Demo dataset — replace or extend freely.
export const chapters: Chapter[] = [
    {
        id: "ch-1",
        title: "Step 1: Learn the Basics",
        topics: [
            {
                id: "t-1",
                title: "Lec 1: Language Foundations",
                problems: [
                    {
                        id: "p-lang-stl",
                        title: "C++ STL Essentials",
                        youtube: "https://www.youtube.com/watch?v=R5B6s6xZz2k",
                        practice: [{ label: "LeetCode", url: "https://leetcode.com/problemset/all/" }],
                        article: "https://cp-algorithms.com/",
                        difficulty: "Medium",
                    },
                    {
                        id: "p-lang-collections",
                        title: "Java Collections Overview",
                        youtube: "https://www.youtube.com/watch?v=rWv8QwQkC8Q",
                        practice: [{ label: "LeetCode", url: "https://leetcode.com/tag/hash-table/" }],
                        article: "https://docs.oracle.com/javase/tutorial/collections/intro/index.html",
                        difficulty: "Easy",
                    },
                ],
            },
            {
                id: "t-2",
                title: "Lec 2: Build Logical Thinking",
                problems: [
                    {
                        id: "p-patterns",
                        title: "Patterns and Dry Runs",
                        youtube: "https://www.youtube.com/watch?v=lsOOs5J8ycw",
                        practice: [
                            {
                                label: "Codeforces",
                                url: "https://codeforces.com/problemset?order=BY_RATING_ASC",
                            },
                        ],
                        article: "https://cp-algorithms.com/algebra/fundamentals.html",
                        difficulty: "Easy",
                    },
                ],
            },
        ],
    },
    {
        id: "ch-2",
        title: "Step 2: Arrays & Hashing",
        topics: [
            {
                id: "t-3",
                title: "Core Array Problems",
                problems: [
                    {
                        id: "p-two-sum",
                        title: "Two Sum",
                        youtube: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
                        practice: [
                            {
                                label: "LeetCode",
                                url: "https://leetcode.com/problems/two-sum/",
                            },
                        ],
                        article: "https://neetcode.io/solutions/two-sum",
                        difficulty: "Easy",
                    },
                    {
                        id: "p-long-substr",
                        title: "Longest Substring Without Repeating Characters",
                        youtube: "https://www.youtube.com/watch?v=wiGpQwVHdE0",
                        practice: [
                            {
                                label: "LeetCode",
                                url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                            },
                        ],
                        article: "https://neetcode.io/solutions/longest-substring-without-repeating-characters",
                        difficulty: "Medium",
                    },
                    {
                        id: "p-subarray-sum-k",
                        title: "Subarray Sum Equals K",
                        youtube: "https://www.youtube.com/watch?v=fFVZt-6sgyo",
                        practice: [
                            {
                                label: "LeetCode",
                                url: "https://leetcode.com/problems/subarray-sum-equals-k/",
                            },
                        ],
                        article: "https://neetcode.io/solutions/subarray-sum-equals-k",
                        difficulty: "Hard",
                    },
                ],
            },
        ],
    },
]
