import { Todo } from '../types.ts'
import { todoService } from '../api/todos.ts'

class TodoList {
  todos: Todo[] = [];
  todoListElement = document.getElementById('todo-list')!
  isLoading:boolean = false;

  constructor (elementId: string) {
    this.todoListElement = document.getElementById(elementId)!;
    this.loadTodos();
  }

  async loadTodos(){
    try {
      this.isLoading = true;
      this.render();
      const newTodos = await todoService.fetchTodos()
      this.todos = newTodos;
      this.isLoading = false;
      this.render();
      console.log(newTodos);
    }
    catch (error) {
      console.error('Error loading todos:', error);
    }
    finally {
      this.isLoading = false;
      this.render();
    }
  }

  async addTodo(todoValue: string) {
    try {
      this.isLoading = true;
      this.render();
      await todoService.createTodo(todoValue)
      await this.loadTodos()
      this.isLoading = false;
      this.render();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
      this.render();
    }
  }

  private async removeTodo(todoId: number) {
    try {
      this.isLoading = true;
      this.render();
      await todoService.deleteTodo(todoId);
      this.todos = this.todos.filter(todo => todo.id !== todoId);
      await this.loadTodos();
      this.isLoading = false;
      this.render();
    }
    catch (error) {
      console.error(error);
    }
  }

  private async toggleTodoCompletion(todoId: number) {
    try {
      this.todos = await Promise.all(this.todos.map(async (todo) => {
        if (todo.id === todoId) {
          await todoService.toggleCompletion(todoId, !todo.completed);
          return { ...todo, completed: !todo.completed }
        }
        return todo
      }))
      await this.loadTodos();
      this.render();
    }
    catch (error) {
      console.error(error);
    }
  }

  private render() {
    this.todoListElement.innerHTML = '';

    if (this.isLoading && this.todos.length === 0) {
      this.todoListElement.appendChild(createLoadingSpinner())
      return
    }


    this.todos.forEach((todo) => {

      const todoItemElement = document.createElement('li')
      todoItemElement.addEventListener('click', async () => {
        await this.toggleTodoCompletion(todo.id)
      })
      if (todo.completed) {
        todoItemElement.classList.add('completed')
      }

      if (this.isLoading && this.todos.length !== 0) {
        todoItemElement.classList.add('isLoading')
      }

      const todoSpanElement = document.createElement('span')
      todoSpanElement.innerHTML = todo.text;

      const todoButtonElement = document.createElement('button')
      todoButtonElement.innerHTML = 'Delete'
      todoButtonElement.addEventListener('click', async (e) => {
        e.stopPropagation()
        await this.removeTodo(todo.id)}
      )

      todoItemElement.appendChild(todoSpanElement)
      todoItemElement.appendChild(todoButtonElement)
      this.todoListElement.appendChild(todoItemElement)
    })
  }
}

function createLoadingSpinner(){
  const container = document.createElement('div');
  const spinner = document.createElement('div');
  container.appendChild(spinner);
  container.className = 'loading-container';
  spinner.classList.add('loading-spinner');
  return container;
}

export const todoList = new TodoList('todo-list');
