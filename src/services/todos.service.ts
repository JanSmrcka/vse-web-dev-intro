import { axios } from '../helpers/axios.ts'
import { Todo } from '../types/todo.type.ts'

export const TodosService  = {

  /**
   * Get all todos from the server.
   */
  async fetchTodos() {
    return axios.get('');
  },
  
  async createTodo(todo: Todo) {
    await axios.post('', JSON.stringify(todo));
  },
  
  async getById(id: number) {
    return axios.get('', { params: { id } });
  },
};