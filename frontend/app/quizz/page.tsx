"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Send } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChatPage() {
    const [messages, setMessages] = useState([]); // messages for chat interface
    const [generatedData, setGeneratedData] = useState(null); // store generated data from /generate
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const router = useRouter();

    // Guard to ensure fetchGeneratedMessage is only called once.
    const hasFetched = useRef(false);

    // On mount, fetch generated data from /generate/{id}
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchGeneratedMessage = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://backend:8000/generate/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Generated Data:", data);
                // Store the generated data for later use in analysis
                setGeneratedData(data);
                // Add the generated question to the chat messages
                const generatedMessage = {
                    role: "assistant",
                    content: data.question || "",
                    sources: data.sources || [],
                };
                setMessages((prev) => [...prev, generatedMessage]);
            } catch (error) {
                console.error("Error generating message:", error);
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "Error generating message" },
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchGeneratedMessage();
        } else {
            // If no id is provided, ensure loading is set to false
            setIsLoading(false);
        }
    }, [id]);

    // Send message and then send data to /analyse_answer
    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Append the user's message to the chat
        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        const userAnswer = input;
        setInput("");
        setIsLoading(true);

        if (!generatedData) {
            console.error("No generated data to analyse");
            setIsLoading(false);
            return;
        }

        // Build the post parameters with generated data and the user's answer
        const params = new URLSearchParams();
        params.append("question", generatedData.question || "");
        params.append("image_url", generatedData.image_url || "");
        params.append("real_answer", generatedData.answer || "");
        params.append("legal_doc", generatedData.legal_basis || "");
        params.append("user_answer", userAnswer);

        try {
            const response = await fetch(`http://127.0.0.1:8000/analyse_answer/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params.toString(),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Analysis Response:", data);
            // Assuming the analysis endpoint returns a reply in data.reply and optionally sources
            const assistantMessage = {
                role: "assistant",
                content: `**Feedback:** ${data.feedback}\n\n\n\n**Score:** ${data.score}`,
                sources: [{ url: data.image_url, formatted_string: data.image_name }],
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error analysing answer:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Error analysing response" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // Send on Enter (without Shift)
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

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
                <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-73px)] relative">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-900/10 blur-[120px]"></div>
                    </div>

                    <div className="w-full max-w-3xl mx-auto">
                        {/* Chat Messages */}
                        <div className="min-h-[400px] flex flex-col justify-end space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`p-4 max-w-[80%] rounded-2xl backdrop-blur-sm border ${
                                            msg.role === "user"
                                                ? "bg-emerald-900/20 border-emerald-800/30 text-gray-200 rounded-tr-sm"
                                                : "bg-gray-900/40 border-gray-800/30 text-gray-300 leading-relaxed rounded-tl-sm"
                                        }`}
                                    >
                                        <ReactMarkdown
                                            components={{
                                                p: ({ node, ...props }) => (
                                                    <p style={{ whiteSpace: "pre-wrap" }} {...props} />
                                                ),
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                        {msg.role !== "user" && msg.sources && (
                                            <div className="mt-4 pt-4 border-t border-gray-800/30 flex justify-between">
                                                {msg.sources.map((item, index) => (
                                                    <div key={index}>
                                                        <Link
                                                            className="text-xs text-emerald-400/70"
                                                            href={"http://backend:8000" + item.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {item.formatted_string}
                                                        </Link>
                                                    </div>
                                                ))}
                                                <button
                                                    className="text-xs font-bold text-black rounded-sm p-2 bg-emerald-400/70"
                                                    onClick={() => window.location.reload()}
                                                >
                                                    Generate new question
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-900/40 rounded-2xl rounded-tl-sm p-4 max-w-[80%] border border-gray-800/30 backdrop-blur-sm flex items-center">
                                        <div className="flex space-x-2">
                                            <div
                                                className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                                                style={{ animationDelay: "0ms" }}
                                            ></div>
                                            <div
                                                className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                                                style={{ animationDelay: "300ms" }}
                                            ></div>
                                            <div
                                                className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                                                style={{ animationDelay: "600ms" }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="relative mt-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask anything"
                                    className="w-full bg-gray-900/40 border border-gray-800/30 rounded-lg py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 pr-12"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="absolute bottom-[-70px] text-xs text-gray-500 w-full text-center">
                                Vignemale can make mistakes. Always check the sources.
                            </div>
                        </div>
                    </div>
                </main>
            </div>
    );
}
