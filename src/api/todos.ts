import { Todo } from "../types";

const API_URL = 'https://eli-workshop.vercel.app/api/users/kafj03/todos';

class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
    };
};

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        throw new ApiError(`Api request failed ${response.status}`);
    };
    const data = await response.json();
    return data;
};

export const todoService = {
    async fetchTodos() {
        const response = await fetch(API_URL);
        return handleResponse<Todo[]>(response);
    },

    async createTodo(newTodo: string) {
        const body = {
            text: newTodo,
        };
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        
        return handleResponse<Todo>(response);
    },
};