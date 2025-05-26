import { TodoRepository } from '../repositories/todo.repository.ts'
import { ITodo } from '../types/todo.type.ts'

export class TodoListRenderer {
  // @ts-ignore
  private readonly todoRepository: TodoRepository;
  
  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }
  
  renderTodoList(): void {
    const todoContainerElement = document.getElementById('todo-list');
    const todos = this.todoRepository.getAllTodos();
    
    if (todos.length === 0) {
      console.log('No todos found.');
      return;
    }
    
    // @ts-ignore
    todoContainerElement.innerHTML = '';
    
    todos.forEach(t => {
      const renderedTodo = this.decorateTodoItem(t);
      todoContainerElement?.appendChild(renderedTodo);
    });
    
  }
  
  private decorateTodoItem(todo: ITodo): HTMLElement {
    const completedClass = todo.completed ? 'completed' : '';
    const element = document.createElement('li');
    element.innerHTML =  `<li class="${completedClass} todo-item" data-id="${todo.id}">
                            <span>${todo.title}</span>
                            <button class="delete-todo">Delete</button>
                          </li>`
    
    return element;
  }
}