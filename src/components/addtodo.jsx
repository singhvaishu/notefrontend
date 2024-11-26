

import React, { useState, useEffect } from "react";

function AddTodoModal({ onSave, initialData, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setStatus(initialData.status);
        } else {
            setTitle("");
            setDescription("");
            setStatus("Pending");
        }
    }, [initialData]);

    const handleSave = () => {
        if (title && description) {
            onSave({ ...initialData, title, description, status });
        }
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                    className="w-full p-2 border rounded"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Status</label>
                <select
                    className="w-full p-2 border rounded"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 mr-2"
            >
                Save
            </button>
            <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
            >
                Cancel
            </button>
        </div>
    );
}

export default AddTodoModal;

