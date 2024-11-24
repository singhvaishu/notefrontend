







import React, { useState, useEffect } from "react";
import TodoCard from "../components/todocard";
import AddTodoModal from "../components/addtodo";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../utils/apiClient";
const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const loadTodos = async () => {
            try {
                setLoading(true);
                const fetchedTodos = await fetchTodos();
                setTodos(fetchedTodos);
            } catch (err) {
                setError('Error fetching todos');
            } finally {
                setLoading(false);
            }
        };

        loadTodos();
    }, []);

    const handleCreateOrUpdate = async (todoData) => {
        try {
            let newOrUpdatedTodo;
            if (todoData._id) {

                newOrUpdatedTodo = await updateTodo(todoData._id, todoData);
            } else {

                newOrUpdatedTodo = await createTodo(todoData);
            }


            setTodos((prevTodos) => {
                if (todoData._id) {

                    return prevTodos.map((todo) =>
                        todo._id === todoData._id ? newOrUpdatedTodo : todo
                    );
                } else {

                    return [...prevTodos, newOrUpdatedTodo];
                }
            });
        } catch (err) {
            setError('Error saving todo');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            // Remove the deleted todo from the list
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } catch (err) {
            setError('Error deleting todo');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Filter Todos based on search query
    const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="hidden lg:block bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Add or Edit Task</h2>
                    <AddTodoModal
                        onClose={() => setEditingTodo(null)}
                        onSave={handleCreateOrUpdate}
                    // initialData={editingTodo}
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">To-Do Dashboard</h1>
                    <div className="lg:hidden flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="Search tasks by title"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
                        />
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                        >
                            +
                        </button>
                    </div>
                    {/* Search Bar - Large Screens Only */}
                    <div className="hidden lg:flex mb-6">
                        <input
                            type="text"
                            placeholder="Search tasks by title"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full lg:w-[100%] border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:mr-4"
                        />
                    </div>

                    <div className="grid gap-4 grid-cols-1">
                        {filteredTodos.map((todo) => (
                            <TodoCard
                                key={todo._id}
                                todo={todo}
                                onDelete={handleDelete}
                                onEdit={(todo) => {
                                    setEditingTodo(todo);
                                    setShowModal(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={() => setTodos([])}
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 w-full lg:hidden"
            >
                Clear All
            </button>
        </div>
    );
}

export default Dashboard;

