import { Todo } from '../types'

class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

const API_URL = 'https://eli-workshop.vercel.app/api/users/xsmrj00/todos'

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(`API request failed ${response.status}`)
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
  async deleteTodo(id: string) {
    const url = `${API_URL}/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
    })
    return handleResponse(response)
  },
  async toggleTodo(todo: Todo) {
    const url = `${API_URL}/${todo.id}`
    const body = {
      completed: !todo.completed,
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return handleResponse<Todo>(response)
  },
}
