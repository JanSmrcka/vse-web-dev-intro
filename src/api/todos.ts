import { Todo } from '../types.ts'

const API_URL = 'https://eli-workshop.vercel.app/api/users/bers06/todos';

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async <T> (response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export const todoService = {
  async fetchTodos(): Promise<Todo[]> {
    const response = await fetch(API_URL);
    return handleResponse<Todo[]>(response);
  },

  async createTodo(todoValue: string){
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          text: todoValue
        }
      )
    });
    return handleResponse<Todo>(response);
  }
}
