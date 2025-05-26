import { Todo } from '../Types'

const API_URL = 'https://eli-workshop.vercel.app/api/users/hosm10/todos'

class APIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'APIError'
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new APIError(`API request failed with status ${response.status}: ${response.statusText}`)
  }
  const data = await response.json()
  return data
}

export const todoService = {
  async fetchTodos() {
    const response = await fetch(API_URL)
    return handleResponse<Todo[]>(response)
  },
  async createTodo(newTodo: string) {
    const body = {
      text: newTodo,
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return handleResponse<Todo>(response)
  },

  async deleteTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    return handleResponse<Todo>(response)
  },

  async toggleTodo(id: number, completed: boolean) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completed ? { completed: true } : { completed: false }),
    })
    return handleResponse<Todo>(response)
  },
}
