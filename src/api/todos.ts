import { Todo } from '../types';

const API_URL = "https://eli-workshop.vercel.app/api/users/stip05/todos";

// handling the response from the API, showin an error if the response is not ok
const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        throw new Error(`API failed!: ${response.status}`);
    };
    const data = await response.json();
    return data;
};

// fetching todos from the API
export const todoService = {
    async fetchTodos() {
        const response = await fetch(API_URL);
        return handleResponse<Todo[]>(response);
    }
};