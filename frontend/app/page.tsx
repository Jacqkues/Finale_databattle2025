"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, CheckCircle, ChevronRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-900/40 selection:text-emerald-50">
      {/* Navigation */}
      <header className="container mx-auto py-8 px-4 flex justify-between items-center border-b border-gray-900/50">
        <div className="flex items-center">
          <h1 className="text-2xl font-light text-emerald-400 tracking-wider">
            <span className="font-medium">Vigne</span>male
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-12">
          <Link
            href="#features"
            className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm uppercase tracking-wider"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm uppercase tracking-wider"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm uppercase tracking-wider"
          >
            Testimonials
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300"
          >
            Log In
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 rounded-md">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-[70vh] overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-900/10 via-black/50 to-black"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-900/10 blur-[120px]"></div>
        </div>

        <div className="space-y-2 mb-6">
          <span className="inline-block py-1 px-3 bg-emerald-900/20 text-emerald-400 text-xs uppercase tracking-wider rounded-full border border-emerald-800/30">
            Patent Law Mastery
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">
          Master Patent Law with <span className="text-emerald-400 font-normal">AI-Powered</span> Learning
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed font-light">
          Enhance your understanding of patent law through intelligent conversations and personalized evaluations
          designed for law students and professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-7 text-lg rounded-md transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:translate-y-[-2px]">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="text-white border-gray-800 hover:bg-gray-900 hover:border-gray-700 px-10 py-7 text-lg rounded-md transition-all duration-300"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* App Preview */}
      <section className="container mx-auto px-4 py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 to-transparent opacity-30 rounded-3xl" />
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800/50 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-gray-700/50">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <div className="space-y-2 mb-6">
                <span className="inline-block py-1 px-3 bg-emerald-900/20 text-emerald-400 text-xs uppercase tracking-wider rounded-full border border-emerald-800/30">
                  Feature 01
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-tight">
                Intelligent <span className="text-emerald-400">Chat</span> Interface
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Ask questions about patent law and receive accurate answers with cited sources. Our AI assistant helps
                you understand complex legal concepts with ease.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-emerald-900/20 flex items-center justify-center border border-emerald-800/30 group-hover:bg-emerald-900/40 transition-all duration-300">
                    <CheckCircle className="text-emerald-400 h-4 w-4" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Source-backed responses
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-emerald-900/20 flex items-center justify-center border border-emerald-800/30 group-hover:bg-emerald-900/40 transition-all duration-300">
                    <CheckCircle className="text-emerald-400 h-4 w-4" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    24/7 availability
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-emerald-900/20 flex items-center justify-center border border-emerald-800/30 group-hover:bg-emerald-900/40 transition-all duration-300">
                    <CheckCircle className="text-emerald-400 h-4 w-4" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Natural conversation flow
                  </span>
                </div>
              </div>
              <Link href='/chat'>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white w-fit rounded-md transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:translate-y-[-2px] group">
                  Try the Chat
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]"></div>
              <div className="bg-gray-950 rounded-xl p-6 shadow-2xl border border-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-gray-700/50 hover:shadow-emerald-900/5">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-emerald-400 font-light tracking-wider">
                    <span className="font-medium">Vigne</span>male
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Chat Assistant</span>
                </div>
                <div className="mb-10">
                  <h3 className="text-2xl font-light text-center mb-10 text-gray-200">How can I help you today?</h3>
                  <div className="bg-gray-900/70 rounded-lg p-4 mb-6 border border-gray-800/30 backdrop-blur-sm">
                    <p className="text-gray-300">What are the requirements for patent novelty?</p>
                  </div>
                  <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-800/30 backdrop-blur-sm">
                    <p className="text-gray-300 leading-relaxed">
                      For an invention to be considered novel, it must not be part of the "prior art." This means the
                      invention cannot have been disclosed to the public before the filing date of the patent
                      application...
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-800/30">
                      <p className="text-xs text-emerald-400/70">Sources: 35 U.S.C. § 102, EPO Guidelines G-IV, 1</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask anything"
                    className="w-full bg-gray-900/40 border border-gray-800/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Feature */}
      <section className="container mx-auto px-4 py-24 relative" id="features">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 to-transparent opacity-30 rounded-3xl" />
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800/50 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-gray-700/50">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="relative order-2 md:order-1">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]"></div>
              <div className="bg-gray-950 rounded-xl p-6 shadow-2xl border border-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-gray-700/50 hover:shadow-emerald-900/5">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-emerald-400 font-light tracking-wider">
                    <span className="font-medium">Vigne</span>male
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">My Evaluators</span>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-light mb-8 text-gray-200">My Evaluators</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-900/70 rounded-lg p-4 border border-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:border-emerald-800/30 hover:bg-gray-900/80 group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-800/80 p-3 rounded-lg group-hover:bg-emerald-900/20 transition-all duration-300">
                          <BookOpen className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-light text-gray-200 group-hover:text-white transition-colors duration-300">
                            Patent Examination Basics
                          </p>
                          <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                            Fundamentals & Procedures
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-900/70 rounded-lg p-4 border border-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:border-emerald-800/30 hover:bg-gray-900/80 group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-800/80 p-3 rounded-lg group-hover:bg-emerald-900/20 transition-all duration-300">
                          <BookOpen className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-light text-gray-200 group-hover:text-white transition-colors duration-300">
                            Opposition & Appeals
                          </p>
                          <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                            Advanced Procedures
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:border-emerald-800/30 hover:bg-gray-900/60 group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg group-hover:bg-emerald-900/20 transition-all duration-300 flex items-center justify-center">
                          <span className="text-xl font-light text-emerald-400">+</span>
                        </div>
                        <div>
                          <p className="font-light text-gray-200 group-hover:text-white transition-colors duration-300">
                            Create Evaluator
                          </p>
                          <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                            Customize an evaluator for a specific purpose
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center order-1 md:order-2">
              <div className="space-y-2 mb-6">
                <span className="inline-block py-1 px-3 bg-emerald-900/20 text-emerald-400 text-xs uppercase tracking-wider rounded-full border border-emerald-800/30">
                  Feature 02
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-tight">
                Personalized <span className="text-emerald-400">Evaluations</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Create custom evaluators to test your knowledge on specific patent law topics. Receive detailed feedback
                and scores to track your progress and identify areas for improvement.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-emerald-900/20 flex items-center justify-center border border-emerald-800/30 group-hover:bg-emerald-900/40 transition-all duration-300">
                    <CheckCircle className="text-emerald-400 h-4 w-4" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Customizable evaluation criteria
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-emerald-900/20 flex items-center justify-center border border-emerald-800/30 group-hover:bg-emerald-900/40 transition-all duration-300">
                    <CheckCircle className="text-emerald-400 h-4 w-4" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Detailed performance feedback
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-emerald-900/20 flex items-center justify-center border border-emerald-800/30 group-hover:bg-emerald-900/40 transition-all duration-300">
                    <CheckCircle className="text-emerald-400 h-4 w-4" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Progress tracking over time
                  </span>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white w-fit rounded-md transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:translate-y-[-2px] group">
                Create Evaluator
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-24" id="how-it-works">
        <div className="text-center mb-20">
          <div className="space-y-2 mb-6 inline-block">
            <span className="inline-block py-1 px-3 bg-emerald-900/20 text-emerald-400 text-xs uppercase tracking-wider rounded-full border border-emerald-800/30">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            How It <span className="text-emerald-400">Works</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-8 text-center border border-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-emerald-800/30 hover:translate-y-[-5px] group">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[30px] group-hover:bg-emerald-500/20 transition-all duration-300"></div>
              <div className="bg-gray-900/80 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-gray-800/50 group-hover:border-emerald-800/30 transition-all duration-300 relative">
                <span className="text-2xl font-light text-emerald-400">01</span>
              </div>
            </div>
            <h3 className="text-xl font-light mb-4 group-hover:text-emerald-400 transition-colors duration-300">
              Ask Questions
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Use the chat interface to ask any question related to patent law. Our AI will provide accurate,
              source-backed answers.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-8 text-center border border-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-emerald-800/30 hover:translate-y-[-5px] group">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[30px] group-hover:bg-emerald-500/20 transition-all duration-300"></div>
              <div className="bg-gray-900/80 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-gray-800/50 group-hover:border-emerald-800/30 transition-all duration-300 relative">
                <span className="text-2xl font-light text-emerald-400">02</span>
              </div>
            </div>
            <h3 className="text-xl font-light mb-4 group-hover:text-emerald-400 transition-colors duration-300">
              Create Evaluators
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Design custom evaluators for specific patent law topics that you want to master or areas where you need
              improvement.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-8 text-center border border-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-emerald-800/30 hover:translate-y-[-5px] group">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[30px] group-hover:bg-emerald-500/20 transition-all duration-300"></div>
              <div className="bg-gray-900/80 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-gray-800/50 group-hover:border-emerald-800/30 transition-all duration-300 relative">
                <span className="text-2xl font-light text-emerald-400">03</span>
              </div>
            </div>
            <h3 className="text-xl font-light mb-4 group-hover:text-emerald-400 transition-colors duration-300">
              Track Progress
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Receive detailed feedback and scores from your evaluations to track your progress and identify areas for
              improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-24" id="testimonials">
        <div className="text-center mb-20">
          <div className="space-y-2 mb-6 inline-block">
            <span className="inline-block py-1 px-3 bg-emerald-900/20 text-emerald-400 text-xs uppercase tracking-wider rounded-full border border-emerald-800/30">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            What Our <span className="text-emerald-400">Users</span> Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-8 border border-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-emerald-800/30 hover:translate-y-[-5px] group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-emerald-900/20 rounded-full mr-4 flex items-center justify-center border border-emerald-800/30">
                <span className="text-emerald-400 font-light text-xl">S</span>
              </div>
              <div>
                <h4 className="font-light text-lg group-hover:text-emerald-400 transition-colors duration-300">
                  Sarah J.
                </h4>
                <p className="text-sm text-gray-500">Patent Attorney</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed italic">
              "Vignemale has been an invaluable tool for staying updated on patent law. The evaluators help me ensure my
              knowledge is current and comprehensive."
            </p>
            <div className="mt-6 pt-6 border-t border-gray-800/30 flex">
              <div className="flex text-emerald-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-8 border border-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-emerald-800/30 hover:translate-y-[-5px] group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-emerald-900/20 rounded-full mr-4 flex items-center justify-center border border-emerald-800/30">
                <span className="text-emerald-400 font-light text-xl">M</span>
              </div>
              <div>
                <h4 className="font-light text-lg group-hover:text-emerald-400 transition-colors duration-300">
                  Michael T.
                </h4>
                <p className="text-sm text-gray-500">Law Student</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed italic">
              "As a student, Vignemale has made learning patent law much more accessible. The chat feature answers my
              questions clearly, and the evaluators help me prepare for exams."
            </p>
            <div className="mt-6 pt-6 border-t border-gray-800/30 flex">
              <div className="flex text-emerald-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-8 border border-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-emerald-800/30 hover:translate-y-[-5px] group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-emerald-900/20 rounded-full mr-4 flex items-center justify-center border border-emerald-800/30">
                <span className="text-emerald-400 font-light text-xl">D</span>
              </div>
              <div>
                <h4 className="font-light text-lg group-hover:text-emerald-400 transition-colors duration-300">
                  David L.
                </h4>
                <p className="text-sm text-gray-500">Patent Examiner</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed italic">
              "The depth of knowledge in Vignemale is impressive. It's helped me refine my understanding of complex
              patent concepts and stay sharp in my role."
            </p>
            <div className="mt-6 pt-6 border-t border-gray-800/30 flex">
              <div className="flex text-emerald-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-emerald-900/20 to-emerald-700/10 rounded-3xl p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-900/20 blur-[120px]"></div>
          </div>
          <div className="relative z-10">
            <div className="space-y-2 mb-6 inline-block">
              <span className="inline-block py-1 px-3 bg-emerald-900/30 text-emerald-400 text-xs uppercase tracking-wider rounded-full border border-emerald-800/30">
                Get Started Today
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">
              Ready to <span className="text-emerald-400">Master</span> Patent Law?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Join Vignemale today and transform your patent law studies with AI-powered learning and evaluation.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-7 text-lg rounded-md transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:translate-y-[-2px] group">
              Get Started Now
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-16 mt-16 border-t border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-2xl font-light text-emerald-400 tracking-wider mb-8 md:mb-0">
              <span className="font-medium">Vigne</span>male
            </h2>
            <div className="flex gap-10">
              <Link
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-900/50 pt-8 text-center text-gray-500">
            <p className="text-sm">© {new Date().getFullYear()} Vignemale. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

