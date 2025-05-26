import { Todo } from '../types/todo.type.ts'
import { axios } from '../helpers/axios.ts'

export const useTodoService = () => {
  
  async function getAllTodos(): Todo[] {
    return axios.get('');
  }
  
};