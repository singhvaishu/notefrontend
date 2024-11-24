
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://notebackend-y5w9.vercel.app/api',
});

// Attach the token to each request if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const fetchTodos = async () => {
    const response = await api.get('/todos');
    return response.data;
};

export const createTodo = async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data;
};

export const updateTodo = async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
};

export const deleteTodo = async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
};

export default api;
