import { Todo } from '../types';

const API_URL = "https://eli-workshop.vercel.app/api/users/stip05/todos";

class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Api Error";
    }
};

// handling the response from the API, showin an error if the response is not ok
const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        throw new ApiError(`API request failed: ${response.status} - ${response.statusText}`);
    };
    const data = await response.json();
    return data;
};

// fetching todos from the API
export const todoService = {
    async getTodo(todoId: string) {
        const response = await fetch(API_URL + "/" + todoId);
        return handleResponse<Todo>(response);
    },
    // Fetching todos from the API
    async fetchTodos() {
        const response = await fetch(API_URL);
        return handleResponse<Todo[]>(response);
    },
    // Creating a new todo item
    async createTodo(newTodo: string) {
        const body = {
            text: newTodo
        };
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        return handleResponse<Todo>(response);
    },
    async deleteTodo(todoId: string) {
        const response = await fetch(API_URL + "/" + todoId, {
            method: "DELETE",
        })
        return handleResponse<void>(response);
    },
    async toggleTodo(todoId: string) {
        const todoGet = await this.getTodo(todoId);
        let completedStatus: boolean = false;
        if (!todoGet.completed) {
            completedStatus = true;
        }
        const body = {
            completed: completedStatus
        };
        const response = await fetch(API_URL + "/" + todoId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        })
        return handleResponse<void>(response);
    },
};