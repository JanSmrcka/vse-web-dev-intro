import { Todo } from '../types/todo.type.ts'

export class TodoListRenderer {
  
  renderTodoList(todos: Todo[]): void {
    const todoContainerElement = document.getElementById('todo-list');

    if (!Array.isArray(todos)) {
      console.log('Invalid todos data. Expected an array.');
      return;
    }
    
    if (todos.length === 0) {
      console.log('No todos found.');
      return;
    }
    
    // Clear the existing todo list
    if (todoContainerElement) {
      todoContainerElement.innerHTML = '';
    }
    
    todos.forEach(t => {
      const renderedTodo = this.decorateTodoItem(t);
      todoContainerElement?.appendChild(renderedTodo);
    });
    
  }
  
  private decorateTodoItem(todo: Todo): HTMLElement {
    const completedClass = todo.completed ? 'completed' : '';
    const element = document.createElement('li');
    element.innerHTML =  `<li class="${completedClass} todo-item" data-id="${todo.id}">
                            <span>${todo.text}</span>
                            <button class="delete-todo">Delete</button>
                          </li>`
    
    return element;
  }
}