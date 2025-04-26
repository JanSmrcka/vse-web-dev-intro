import { TodoItem } from '../types';

const API_URL = 'https://eli-workshop.vercel.app/api/todos';

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(`API request failed: ${response.statusText}`);
  }
  return response.json();
};

const fetchTodos = async (): Promise<TodoItem[]> => {
  const response = await fetch(API_URL);
  return handleResponse<TodoItem[]>(response);
};

const addTodo = async (text: string): Promise<TodoItem> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  return handleResponse<TodoItem>(response);
};

const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

const toggleTodo = async (id: string, completed: boolean): Promise<TodoItem> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
  return handleResponse<TodoItem>(response);
};

export const todoApi = {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
};
