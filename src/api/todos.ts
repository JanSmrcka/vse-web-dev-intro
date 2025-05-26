import { Todo } from "../types";

const API_URL = 'https://eli-workshop.vercel.app/api/users/nerv01/todos';

class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIError';
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) throw new APIError(`API failed ${response.status}`)

  return await response.json();
}

export const todoService = {
  async fetchTodos(): Promise<Array<Todo>> {
    const response = await fetch(API_URL);
    return handleResponse<Array<Todo>>(response);
  },
  async createTodo(newTodo: string) {
    const body = {
      text: newTodo
    }
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })

    return handleResponse<Todo>(response);
  },
  async deleteTodo(todoId: Todo['id']) {
    const response = await fetch(`${API_URL}/${todoId}`, {
      method: 'DELETE'
    });

    return handleResponse(response);
  },
  async toggleTodo(todoId: Todo['id'], isCompleted: Todo['completed']) {
    const body = {
      completed: isCompleted
    }

    console.log(body)
    const response = await fetch(`${API_URL}/${todoId}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return handleResponse(response);
  }
}