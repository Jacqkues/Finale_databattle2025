"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, FileText, Award, Clock, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"


interface Source {
    id: string
    reference: string
    url?: string
}

interface Attempt {
    id: string
    date: string
    score: number
    totalQuestions: number
    timeSpent: string
}

interface EvaluatorData {
    id: string
    name: string
    description: string
    category: string
    subcategory: string
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    sources: Source[]
    bestScore: number
    attempts: Attempt[]
}

export default function EvaluatorDetailPage({ params }: { params: { id: string } }) {
    const [evaluator, setEvaluator] = useState<EvaluatorData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // This would normally fetch data from an API
        // For now, we'll simulate with mock data

        const fetchEvaluator = async () => {
            try {
                const response = await fetch(`http://backend:8000/evaluator/${params.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                //setEvaluator(data);
                setEvaluator({
                    id: params.id,
                    name: data.name,
                    description:
                        "",
                    category: data.category,
                    subcategory: "Fundamentals & Procedures",
                    difficulty: data.difficulty,
                    sources: data.sources,
                    bestScore: data.score,
                    attempts: [
                        { id: "1", date: "2025-03-28", score: 85, totalQuestions: 20, timeSpent: "18:45" },
                        { id: "2", date: "2023-10-28", score: 75, totalQuestions: 20, timeSpent: "22:10" },
                        { id: "3", date: "2023-10-10", score: 70, totalQuestions: 20, timeSpent: "25:30" },
                    ],
                })
            } catch (error) {
                console.error("Error fetching evaluator data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluator();

        /*setTimeout(() => {
            setEvaluator({
                id: params.id,
                name: "Patent Examination Basics",
                description:
                    "",
                category: "Patent Examination",
                subcategory: "Fundamentals & Procedures",
                difficulty: "Intermediate",
                sources: [
                    { id: "1", reference: "3-en-epc-guidelines-2024-hyperlinked page 781", url: "#" },
                    { id: "2", reference: "3-en-epc-guidelines-2024-hyperlinked page 53", url: "#" },
                    { id: "3", reference: "3-en-epc-guidelines-2024-hyperlinked page 44", url: "#" },
                    { id: "4", reference: "3-en-epc-guidelines-2024-hyperlinked page 547", url: "#" },
                    { id: "5", reference: "1-EPC_17th_edition_2020_en page 432", url: "#" },
                ],
                bestScore: 85,
                attempts: [
                    { id: "1", date: "2023-11-15", score: 85, totalQuestions: 20, timeSpent: "18:45" },
                    { id: "2", date: "2023-10-28", score: 75, totalQuestions: 20, timeSpent: "22:10" },
                    { id: "3", date: "2023-10-10", score: 70, totalQuestions: 20, timeSpent: "25:30" },
                ],
            })
            setLoading(false)
        }, 1000)*/
    }, [params.id])

    // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(date)
    }

    // Function to get color based on score
    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-emerald-400"
        if (score >= 75) return "text-emerald-500"
        if (score >= 60) return "text-yellow-500"
        return "text-red-500"
    }

    // Function to get background color based on score
    const getScoreBgColor = (score: number) => {
        if (score >= 90) return "bg-emerald-400/20"
        if (score >= 75) return "bg-emerald-500/20"
        if (score >= 60) return "bg-yellow-500/20"
        return "bg-red-500/20"
    }

    // Function to get difficulty badge color
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-emerald-900/30 text-emerald-400 border-emerald-800/30"
            case "Intermediate":
                return "bg-blue-900/30 text-blue-400 border-blue-800/30"
            case "Advanced":
                return "bg-purple-900/30 text-purple-400 border-purple-800/30"
            case "Expert":
                return "bg-red-900/30 text-red-400 border-red-800/30"
            default:
                return "bg-gray-900/30 text-gray-400 border-gray-800/30"
        }
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-900/40 selection:text-emerald-50">
            {/* Header */}
            <header className="container mx-auto py-6 px-4 flex justify-between items-center border-b border-gray-900/50">
                <Link href="/" className="flex items-center">
                    <h1 className="text-2xl font-light text-emerald-400 tracking-wider">
                        <span className="font-medium">Vigne</span>male
                    </h1>
                </Link>
                <div className="flex items-center gap-4">
                    <Link
                        href="/chat"
                        className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 bg-gray-900/50 hover:bg-gray-900 px-4 py-2 rounded-md border border-gray-800/50 hover:border-emerald-800/30"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Chat
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-900/10 blur-[120px]"></div>
                </div>

                <div className="w-full max-w-4xl mx-auto">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Link
                            href="/evaluators"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Evaluators</span>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-400">Loading evaluator data...</p>
                        </div>
                    ) : evaluator ? (
                        <>
                            {/* Evaluator Header */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800/50 backdrop-blur-sm mb-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span
                                                className={`inline-block py-1 px-3 text-xs uppercase tracking-wider rounded-full border ${getDifficultyColor(evaluator.difficulty)}`}
                                            >
                                                {evaluator.difficulty}
                                            </span>
                                            <span className="inline-block py-1 px-3 bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider rounded-full border border-gray-800/30">
                                                {evaluator.category}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl font-light mb-2">{evaluator.name}</h1>
                                        <p className="text-gray-400">{evaluator.description}</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center bg-gray-900/50 p-6 rounded-xl border border-gray-800/30 min-w-[140px]">
                                        <div className={`text-4xl font-light mb-1 ${getScoreColor(evaluator.bestScore)}`}>
                                            {evaluator.bestScore}%
                                        </div>
                                        <div className="text-sm text-gray-400">Best Score</div>
                                    </div>
                                </div>
                            </div>

                            

                            {/* Sources */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800/50 backdrop-blur-sm mb-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <FileText className="h-5 w-5 text-emerald-400" />
                                    <h2 className="text-xl font-light">Sources</h2>
                                </div>

                                <div className="space-y-3">
                                    {evaluator.sources.map((source) => (
                                        <div
                                            key={source.id}
                                            className="flex items-center justify-between bg-gray-900/50 border border-gray-800/30 rounded-lg p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="bg-gray-800/80 p-2 rounded-lg">
                                                    <BookOpen className="h-4 w-4 text-emerald-400" />
                                                </div>
                                                <span className="text-gray-300 text-sm">{source.reference}</span>
                                            </div>
                                            {source.url && (
                                                <Link
                                                    href={`http://backend:8000${source.url}`}
                                                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                                                    target="_blank"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={`/quizz?id=${params.id}`}>

                                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white py-6 px-8 rounded-md transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:translate-y-[-2px]">
                                        Start New Attempt
                                    </Button>
                                </Link>

                            </div>
                        </>
                    ) : (
                        <div className="bg-gray-900/40 rounded-xl p-8 text-center border border-gray-800/30 backdrop-blur-sm">
                            <h2 className="text-2xl font-light mb-4">Evaluator Not Found</h2>
                            <p className="text-gray-400 mb-6">The evaluator you're looking for doesn't exist or has been removed.</p>
                            <Link href="/evaluators">
                                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition-all duration-300">
                                    Back to Evaluators
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

