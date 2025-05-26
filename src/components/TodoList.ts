import { Todo } from '../types.ts'

class TodoList {
  todos: Todo[] = [];
  todoListElement = document.getElementById('todo-list')!

  constructor (elementId: string) {
    this.todoListElement = document.getElementById(elementId)!;
  }

  addTodo(todoValue: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: todoValue,
      completed: false
    }

    this.todos.push(newTodo)
    this.render();
  }

  private removeTodo(todoId: string) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId)
    this.render();
  }

  private toggleTodoCompletion(todoId: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    this.render();
  }

  private render() {
    this.todoListElement.innerHTML = '';

    this.todos.forEach((todo) => {

      const todoItemElement = document.createElement('li')
      todoItemElement.addEventListener('click', () => {
        this.toggleTodoCompletion(todo.id)
      })
      if (todo.completed) {
        todoItemElement.classList.add('completed')
      }

      const todoSpanElement = document.createElement('span')
      todoSpanElement.innerHTML = todo.text;

      const todoButtonElement = document.createElement('button')
      todoButtonElement.innerHTML = 'Delete'
      todoButtonElement.addEventListener('click', () => {this.removeTodo(todo.id)})

      todoItemElement.appendChild(todoSpanElement)
      todoItemElement.appendChild(todoButtonElement)
      this.todoListElement.appendChild(todoItemElement)
    })
  }
}

export const todoList = new TodoList('todo-list');
