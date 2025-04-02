import { Todo, TodoService } from "../types";

const API_URL = "https://eli-workshop.vercel.app/api/todos";

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(`API request failed: ${response.statusText}`);
  }
  return response.json();
};

export const todoService: TodoService = {
  async fetchTodos(): Promise<Todo[]> {
    const response = await fetch(API_URL);
    return handleResponse<Todo[]>(response);
  },

  async createTodo(text: string): Promise<Todo> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    return handleResponse<Todo>(response);
  },

  async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await handleResponse(response);
  },

  async updateTodo(id: string, completed: boolean): Promise<Todo> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    return handleResponse<Todo>(response);
  },
};
