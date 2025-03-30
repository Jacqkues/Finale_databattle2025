"use client"

import { useState } from "react"
import { Send, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ChatWithTogglePage() {
  const [sourcesOnly, setSourcesOnly] = useState(false)

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
            href="/evaluators"
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            My Evaluator
          </Link>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="container mx-auto px-4 py-8">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-900/10 blur-[120px]"></div>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          {/* Chat Messages */}
          <div className="space-y-6 mb-6">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-emerald-900/20 rounded-2xl rounded-tr-sm p-4 max-w-[80%] border border-emerald-800/30 backdrop-blur-sm">
                <p className="text-gray-200">What are the requirements for patent novelty?</p>
              </div>
            </div>

            {/* Assistant Message */}
            <div className="flex justify-start">
              <div className="bg-gray-900/40 rounded-2xl rounded-tl-sm p-4 max-w-[80%] border border-gray-800/30 backdrop-blur-sm">
                {!sourcesOnly && (
                  <>
                    <p className="text-gray-300 leading-relaxed">
                      For an invention to be considered novel, it must not be part of the "prior art." This means the
                      invention cannot have been disclosed to the public before the filing date of the patent
                      application.
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-3">
                      The novelty requirement is assessed differently across jurisdictions:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
                      <li>In the US, there's a one-year grace period for disclosures made by the inventor</li>
                      <li>In Europe, any public disclosure before filing can destroy novelty (absolute novelty)</li>
                      <li>The invention must be new compared to the entire body of public knowledge worldwide</li>
                    </ul>
                  </>
                )}
                <div className={`${!sourcesOnly ? "mt-4 pt-4 border-t border-gray-800/30" : ""}`}>
                  <p className="text-xs text-emerald-400/70">Sources: 35 U.S.C. § 102, EPO Guidelines G-IV, 1</p>
                </div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-emerald-900/20 rounded-2xl rounded-tr-sm p-4 max-w-[80%] border border-emerald-800/30 backdrop-blur-sm">
                <p className="text-gray-200">How does this differ from the non-obviousness requirement?</p>
              </div>
            </div>

            {/* Assistant Message */}
            <div className="flex justify-start">
              <div className="bg-gray-900/40 rounded-2xl rounded-tl-sm p-4 max-w-[80%] border border-gray-800/30 backdrop-blur-sm">
                {!sourcesOnly && (
                  <>
                    <p className="text-gray-300 leading-relaxed">
                      While novelty requires that an invention is new and not previously disclosed, non-obviousness (or
                      inventive step) requires that the invention would not have been obvious to a person skilled in the
                      relevant field.
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-3">Key differences include:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
                      <li>Novelty is a binary assessment (new or not new)</li>
                      <li>Non-obviousness evaluates the inventive quality and creative leap</li>
                      <li>
                        Non-obviousness can consider combinations of prior art references, while novelty typically
                        examines each reference individually
                      </li>
                    </ul>
                  </>
                )}
                <div className={`${!sourcesOnly ? "mt-4 pt-4 border-t border-gray-800/30" : ""}`}>
                  <p className="text-xs text-emerald-400/70">
                    Sources: 35 U.S.C. § 103, EPO Guidelines G-VII, KSR Int'l Co. v. Teleflex Inc., 550 U.S. 398 (2007)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sources Only Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setSourcesOnly(!sourcesOnly)}
              className="flex items-center gap-2 bg-gray-900/40 hover:bg-gray-900/60 border border-gray-800/30 rounded-lg py-2 px-4 text-sm transition-all duration-300 group"
            >
              <span
                className={`relative inline-block w-10 h-5 rounded-full ${sourcesOnly ? "bg-emerald-900/50 border-emerald-800/50" : "bg-gray-800 border-gray-700/50"} transition-all duration-300 border`}
              >
                <span
                  className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                    sourcesOnly ? "left-6 bg-emerald-400" : "left-1 bg-gray-500"
                  }`}
                ></span>
              </span>
              <span
                className={`transition-colors duration-300 flex items-center gap-1 ${sourcesOnly ? "text-emerald-400" : "text-gray-400 group-hover:text-gray-300"}`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Sources only
              </span>
            </button>
          </div>

          {/* Input Area */}
          <div className="relative mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask anything"
                className="w-full bg-gray-900/40 border border-gray-800/30 rounded-lg py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 pr-12"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition-colors duration-300">
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute bottom-[-30px] text-xs text-gray-500 w-full text-center">
              Vignemale can make mistakes. Always check the sources.
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

