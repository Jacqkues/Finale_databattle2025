"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Check, X, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CreateEvaluatorPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [openQuestion, setOpenQuestion] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState("Intermediate")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Advanced section
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [evaluationCriteria, setEvaluationCriteria] = useState("if it's a multiple choice question the user need to specify the exact answer letter no justification is required. Else the user need to make reference to the right legal basis and show a good understanding of it in order to have a good grade.")
  const [scoring, setScoring] = useState("if it's a multiple choice question the score is : 0 if wrong and 1 if right. Else it's a grade between 0 and 10.")

  // Sample categories and subcategories
  const categories = [
    {
      name: "Filing requirements and formalities",
      subcategories: ["Minimum requirements for a filing date", "Filing methods and locations", "Formality examination"],
    },
    {
      name: "Priority claims and right of priority",
      subcategories: ["Substantive requirements for priority", "Time limits and restoration", "Multiple priorities and partial priority"],
    },
    {
      name: "Divisional applications",
      subcategories: ["Filing requirements", "Subject-matter and scope", "Fees for divisionals"],
    },
    {
      name: "Fees, payment methods, and time limits",
      subcategories: ["Types and calculation of fees", "Payment mechanisms", "Fee deadlines and late payment consequences"],
    },
    {
      name: "Languages and translations",
      subcategories: ["Language of filing and procedural language", "Translation requirements on grant or other stages", "Effects of language on costs and procedural rights"],
    },
    {
      name: "Procedural remedies and legal effect",
      subcategories: ["Further processing (rule 135 epc)", "Re-establishment of rights (article 122 epc)", "Loss of rights and remedies"],
    },
    {
      name: "Pct procedure and entry into the european phase",
      subcategories: ["International filing and search", "Preliminary examination and amendments", "European phase entry and requirements"],
    },
    {
      name: "Examination, amendments, and grant",
      subcategories: ["Examination procedure and communications", "Claim amendments and article 123 epc", "Grant stage (rule 71(3) epc) and post-grant publication"],
    },
    {
      name: "Opposition and appeals",
      subcategories: ["Grounds for opposition (article 100 epc)", "Opposition procedure and admissibility", "Appeal proceedings"],
    },
    {
      name: "Substantive patent law: novelty and inventive step",
      subcategories: ["Novelty analysis", "Inventive step analysis", "Special forms of claims (e.g., medical use)"],
    },
    {
      name: "Entitlement and transfers",
      subcategories: ["Entitlement disputes (article 61 EPC)", " Transfers and assignments", "Procedural consequences"],
    },
    {
      name: "Biotech and sequence listings",
      subcategories: ["Sequence listing filing and format", "Added subject-matter in biotech claims", "Specific patentability exceptions in biotech"],
    },
    {
      name: "Unity of invention",
      subcategories: ["Unity in european applications", "Unity in pct applications", "Strategies for overcoming lack of unity"],
    },
  ]

  // Get subcategories for the selected category
  const getSubcategories = () => {
    const category = categories.find((cat) => cat.name === selectedCategory)
    return category ? category.subcategories : []
  }

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
    setSelectedSubcategories([]) // Reset subcategories when category changes
  }

  // Handle subcategory selection
  const handleSubcategoryToggle = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory))
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory])
    }
  }

  // Remove a selected subcategory
  const removeSubcategory = (subcategory: string) => {
    setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory))
  }

  // Form validation
  const validateForm = () => {
    if (!name.trim()) {
      setError("Evaluator name is required")
      return false
    }
    if (!selectedCategory) {
      setError("Please select a category")
      return false
    }
    if (selectedSubcategories.length === 0) {
      setError("Please select at least one subcategory")
      return false
    }
    setError(null)
    return true
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("http://backend:8000/create_evaluator_v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category: selectedCategory,
          subcategories: selectedSubcategories,
          isOpenQuestion: openQuestion,
          difficulty,
          evaluationCriteria: evaluationCriteria.trim() || null,
          scoring: scoring.trim() || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create evaluator")
      }

      // Redirect to evaluators page on success
      router.push("/evaluators")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsSubmitting(false)
    }
  }

  // Toggle advanced section
  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced)
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

      {/* Create Evaluator Interface */}
      <main className="container mx-auto px-4 py-12">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-900/10 blur-[120px]"></div>
        </div>

        <div className="w-full max-w-3xl mx-auto">
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

          {/* Page Title */}
          <div className="mb-10">
            <h2 className="text-3xl font-light tracking-tight">
              Create <span className="text-emerald-400">Evaluator</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Design a custom evaluator to test knowledge on specific patent law topics.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg">{error}</div>
          )}

          {/* Form */}
          <div className="bg-gray-900/40 rounded-xl p-6 border border-gray-800/30 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Evaluator Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900/70 border border-gray-800/50 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                  placeholder="e.g., Patent Examination Basics"
                />
              </div>

              {/* Category Field */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full bg-gray-900/70 border border-gray-800/50 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2310b981' strokeWidth='2'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1rem",
                  }}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategories Multi-Select */}
              {selectedCategory && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">Subcategories (Select Multiple)</label>

                  {/* Selected subcategories display */}
                  {selectedSubcategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedSubcategories.map((subcategory) => (
                        <div
                          key={subcategory}
                          className="bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-md text-sm border border-emerald-800/50 flex items-center gap-1"
                        >
                          {subcategory}
                          <button
                            type="button"
                            onClick={() => removeSubcategory(subcategory)}
                            className="text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subcategory checkboxes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {getSubcategories().map((subcategory) => (
                      <div
                        key={subcategory}
                        className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                          selectedSubcategories.includes(subcategory)
                            ? "bg-gray-900/80 border-emerald-800/50 text-white"
                            : "bg-gray-900/40 border-gray-800/30 text-gray-300 hover:bg-gray-900/60 hover:border-gray-700/50"
                        }`}
                        onClick={() => handleSubcategoryToggle(subcategory)}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center ${
                            selectedSubcategories.includes(subcategory) ? "bg-emerald-600" : "bg-gray-800"
                          }`}
                        >
                          {selectedSubcategories.includes(subcategory) && <Check className="h-3.5 w-3.5 text-white" />}
                        </div>
                        <span>{subcategory}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Open Question Toggle */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Open Question</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setOpenQuestion(!openQuestion)}
                    className="flex items-center gap-2 bg-gray-900/40 hover:bg-gray-900/60 border border-gray-800/30 rounded-lg py-2 px-4 text-sm transition-all duration-300 group"
                  >
                    <span
                      className={`relative inline-block w-10 h-5 rounded-full ${
                        openQuestion ? "bg-emerald-900/50 border-emerald-800/50" : "bg-gray-800 border-gray-700/50"
                      } transition-all duration-300 border`}
                    >
                      <span
                        className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                          openQuestion ? "left-6 bg-emerald-400" : "left-1 bg-gray-500"
                        }`}
                      ></span>
                    </span>
                    <span
                      className={`transition-colors duration-300 flex items-center gap-1 ${
                        openQuestion ? "text-emerald-400" : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      {openQuestion ? "Yes" : "No"}
                    </span>
                  </button>
                  <span className="ml-3 text-sm text-gray-400">
                    {openQuestion
                      ? "Students will provide free-form answers"
                      : "Students will select from multiple choice options"}
                  </span>
                </div>
              </div>

              {/* Difficulty Level */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Difficulty Level</label>
                <div className="flex flex-wrap gap-4">
                  {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
                    <div key={level} className="flex items-center">
                      <input
                        type="radio"
                        id={`difficulty-${level}`}
                        name="difficulty"
                        className="sr-only"
                        checked={difficulty === level}
                        onChange={() => setDifficulty(level)}
                      />
                      <label
                        htmlFor={`difficulty-${level}`}
                        onClick={() => setDifficulty(level)}
                        className={`cursor-pointer px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                          difficulty === level
                            ? "bg-emerald-900/30 text-emerald-400 border border-emerald-800/50"
                            : "bg-gray-900/50 text-gray-400 border border-gray-800/30 hover:border-gray-700/50"
                        }`}
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced Section Toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={toggleAdvanced}
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-300 group"
                >
                  {showAdvanced ? (
                    <ChevronUp className="h-5 w-5 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                  )}
                  <span>Advanced Options</span>
                </button>
              </div>

              {/* Advanced Section */}
              {showAdvanced && (
                <div className="space-y-6 pt-2 pb-2 border-t border-gray-800/30 animate-in fade-in duration-300">
                  {/* Evaluation Criteria */}
                  <div className="space-y-2 mt-4">
                    <label htmlFor="criteria" className="block text-sm font-medium text-gray-300">
                      Criteria of Evaluation
                    </label>
                    <textarea
                      id="criteria"
                      value={evaluationCriteria}
                      onChange={(e) => setEvaluationCriteria(e.target.value)}
                      rows={4}
                      className="w-full bg-gray-900/70 border border-gray-800/50 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                      placeholder="Describe the criteria used to evaluate responses..."
                    ></textarea>
                    <p className="text-xs text-gray-500">
                      Specify how responses will be evaluated. This helps ensure consistent assessment.
                    </p>
                  </div>

                  {/* Scoring */}
                  <div className="space-y-2">
                    <label htmlFor="scoring" className="block text-sm font-medium text-gray-300">
                      Scoring
                    </label>
                    <textarea
                      id="scoring"
                      value={scoring}
                      onChange={(e) => setScoring(e.target.value)}
                      rows={4}
                      className="w-full bg-gray-900/70 border border-gray-800/50 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                      placeholder="Describe how responses will be scored..."
                    ></textarea>
                    <p className="text-xs text-gray-500">
                      Define the scoring system (e.g., point allocation, grading scale, passing threshold).
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white w-full py-6 rounded-md transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Create Evaluator
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

