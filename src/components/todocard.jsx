


import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"; // Heroicons

function TodoCard({ todo, onDelete, onEdit }) {
    if (!todo) return null;

    const statusColors = {
        "In Progress": "bg-yellow-100 text-yellow-600",
        Completed: "bg-green-100 text-green-600",
        Pending: "bg-red-100 text-red-600",
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow relative">
            <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
            <p className="text-gray-600 mt-2">{todo.description}</p>
            <span
                className={`mt-4 inline-block px-3 py-1 text-sm font-medium rounded ${statusColors[todo.status]}`}
            >
                {todo.status}
            </span>

            <div className="absolute top-2 right-2 flex gap-2">
                <button
                    className="p-1 rounded-full text-blue-500 hover:bg-blue-100"
                    onClick={() => onEdit(todo)}
                    title="Edit"
                >
                    <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button
                    className="p-1 rounded-full text-red-500 hover:bg-red-100"
                    onClick={() => onDelete(todo._id)}
                    title="Delete"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default TodoCard;
