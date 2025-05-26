import { Todo } from '../types/todo.type.ts'

export class TodoListRenderer {
  
  public setLoadingState(isLoading: boolean = false) {
    // Iterate over all todo items and set the loading state
   const items = document.getElementsByClassName('todo-item')

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i] as HTMLElement;
      
      if (isLoading)
        item.classList.add('isLoading');
      else
        item.classList.remove('isLoading');
    }
  }
  
  public renderTodoList(todos: Todo[], deleteCallback: (id: number) => void, editCallback: (id: number) => void): void {
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
      
      renderedTodo.getElementsByClassName("delete-todo")[0].addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteCallback(t.id as number)
      });

      renderedTodo.getElementsByClassName("edit-todo")[0].addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        editCallback(t.id as number)
      });
      
      todoContainerElement?.appendChild(renderedTodo);
    });
    
  }
  
  private decorateTodoItem(todo: Todo): HTMLElement {
    const completedClass = todo.completed ? 'completed' : '';
    const element = document.createElement('li');
    element.innerHTML =  `<li class="${completedClass} todo-item" data-id="${todo.id}">
                            <span>${todo.text}</span>
                            <button class="delete-todo">Delete</button>
                             <button class="edit-todo">Edit</button>
                          </li>`
    
    
    
    return element;
  }
}