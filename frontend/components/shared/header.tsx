import Link from "next/link"
import { MessageSquare, Users } from "lucide-react"

interface HeaderProps {
  currentPage?: "chat" | "evaluators" | "home"
}

export default function Header({ currentPage = "home" }: HeaderProps) {
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center border-b border-gray-900/50">
      <Link href="/" className="flex items-center">
        <h1 className="text-2xl font-light text-emerald-400 tracking-wider">
          <span className="font-medium">Vigne</span>male
        </h1>
      </Link>
      <nav className="flex items-center gap-4">
        {currentPage !== "chat" && (
          <Link
            href="/chat"
            className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 bg-gray-900/50 hover:bg-gray-900 px-4 py-2 rounded-md border border-gray-800/50 hover:border-emerald-800/30"
          >
            <MessageSquare className="h-5 w-5" />
            Chat
          </Link>
        )}

        {currentPage !== "evaluators" && (
          <Link
            href="/evaluators"
            className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 bg-gray-900/50 hover:bg-gray-900 px-4 py-2 rounded-md border border-gray-800/50 hover:border-emerald-800/30"
          >
            <Users className="h-5 w-5" />
            My Evaluators
          </Link>
        )}
      </nav>
    </header>
  )
}

