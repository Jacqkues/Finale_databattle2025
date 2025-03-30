import Link from "next/link";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import EvaluatorItem from '@/components/evaluatorItem'

export default async function EvaluatorsPage() {
  // Fetch evaluator data from your FastAPI backend
  const res = await fetch("http://backend:8000/evaluator", { cache: "no-store" });
  const evaluators = await res.json();

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

      {/* Evaluators Interface */}
      <main className="container mx-auto px-4 py-12">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-900/10 blur-[120px]"></div>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 tracking-tight">
              My <span className="text-emerald-400">Evaluators</span>
            </h2>
          </div>

          {/* Create Evaluator Button */}
          <div className="mb-8">
          <Link  href="/evaluators/create" >
            <button className="w-full bg-gray-900/70 hover:bg-gray-900 border border-gray-800/50 hover:border-emerald-800/30 rounded-xl p-4 transition-all duration-300 group flex items-center gap-4">
              <div className="bg-gray-800/80 p-3 rounded-lg group-hover:bg-emerald-900/20 transition-all duration-300 flex items-center justify-center">
                <Plus className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="font-light text-gray-200 group-hover:text-white transition-colors duration-300">
                  Create Evaluator
                </p>
                <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                  Customize an evaluator for a specific purpose
                </p>
              </div>
            </button>
          </Link>
          </div>

          {/* Evaluator List */}
          <div className="space-y-4">
            {evaluators.map((evaluator) => (
              <EvaluatorItem key={evaluator.id} evaluator={evaluator} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}