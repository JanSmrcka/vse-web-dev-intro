import { Todo } from '../types/todo.type.ts'
import { axios } from '../helpers/axios.ts'

export const useTodoService = () => {

  /**
   * Get all todos from the server.
   */
  async function fetchTodos(): Promise<Todo[]> {
    return axios.get('');
  }
  
};