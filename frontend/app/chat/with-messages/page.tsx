"use client"
import React, { useState } from "react";
import { Send } from "lucide-react";
import Link from "next/link";

export default function ChatWithMessagesPage() {
  // Message structure: { role: "user" | "assistant", content: string }
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        'Hello !'
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to send the message and fetch the response
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    // Append the user's message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: messageToSend })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Assuming the response contains a property called "reply"
      const assistantMessage = {
        role: "assistant",
        content: data.reply || "No response"
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: "Error fetching response"
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: send on Enter key (without shift)
  const handleKeyDown = (e: any) => {
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
      <main className="container mx-auto px-4 py-8">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-900/10 blur-[120px]"></div>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          {/* Chat Messages */}
          <div className="space-y-6 mb-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.role === "user"
                      ? "bg-emerald-900/20 rounded-2xl rounded-tr-sm text-gray-200"
                      : "bg-gray-900/40 rounded-2xl rounded-tl-sm text-gray-300 leading-relaxed"
                  } p-4 max-w-[80%] border ${
                    msg.role === "user"
                      ? "border-emerald-800/30"
                      : "border-gray-800/30"
                  } backdrop-blur-sm`}
                >
                  <p>{msg.content}</p>
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
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything"
                className="w-full bg-gray-900/40 border border-gray-800/30 rounded-lg py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 pr-12"
                rows={1}
              />
              <div className="absolute left-4 bottom-[-42px] flex items-center gap-2">
                <button className="p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
                  >
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                </button>

                <button className="flex items-center gap-1.5 bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-400 px-3 py-1 rounded-md text-sm border border-emerald-800/30 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  Sources only
                </button>

                <button
                  onClick={handleSendMessage}
                  className="flex items-center gap-1.5 bg-gray-800/50 hover:bg-gray-800/80 text-gray-400 hover:text-gray-300 px-3 py-1 rounded-md text-sm border border-gray-700/30 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  Reason
                </button>
              </div>
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