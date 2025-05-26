import { Todo } from '../types'

const API_URL = "https://eli-workshop.vercel.app/api/users/hana15/todos"

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        throw new Error('API failed')
    }

    const data = await response.json()
    return data
}

export const todoService = {
    async fetchTodos () {
        const response = await fetch(API_URL)
        return handleResponse<Todo[]>(response)
    }
}