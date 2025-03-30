// app/evaluators/EvaluatorItem.jsx
"use client";
import { Pencil, Trash2, Package , Eye} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EvaluatorItem({ evaluator }) {
    const router = useRouter();

    async function handleDelete() {
        // Show a confirmation dialog before deleting
        const confirmed = window.confirm("Are you sure you want to delete this evaluator?");
        if (!confirmed) return;

        // Call your FastAPI delete route with a POST method.
        const res = await fetch(`http://localhost:8000/delete_evaluator/${evaluator.id}`, {
            method: "POST",
        });
        if (res.ok) {
            // Refresh the current route to update the list of evaluators
            router.refresh();
        } else {
            console.error("Failed to delete evaluator");
        }
    }

    return (
        <div className="cursor-pointer bg-gray-900/70 rounded-xl p-4 border border-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:border-emerald-800/30 hover:bg-gray-900/80 group">
            <Link href={`/quizz?id=${evaluator.id}`}>
                <div className="flex items-center gap-4">
                    <div className="bg-gray-800/80 p-3 rounded-lg group-hover:bg-emerald-900/20 transition-all duration-300">
                        <Package className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                        <p className="font-light text-gray-200 group-hover:text-white transition-colors duration-300">
                            {evaluator.name}
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                            {evaluator.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/evaluators/${evaluator.id}`}>
                            <button className="p-2 text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                                <Eye className="h-4 w-4"/>
                            </button>
                        </Link>

                        <button
                            onClick={(e) => {
                                e.preventDefault(); // Empêche le comportement par défaut du lien
                                e.stopPropagation(); // Empêche la propagation de l'événement
                                handleDelete(); // Votre fonction de suppression
                            }}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
