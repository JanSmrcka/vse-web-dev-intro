import { TodoRepository } from '../repositories/todo.repository.ts'

export class TodoListRenderer {
  // @ts-ignore
  private readonly todoRepository: TodoRepository;
  
  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }
  
  renderTodoList(): void {
    console.log('Rendering todo list...')
    console.log(this.todoRepository.getAllTodos());
  }
}