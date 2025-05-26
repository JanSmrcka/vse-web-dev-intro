import { todoService } from '../api/todos'
import { Todo } from '../types'

class TodoList {
  todos: Todo[] = []
  todoListElement

  constructor(elementId: string) {
    this.todoListElement = document.getElementById(elementId) as HTMLUListElement
    this.loadTodos()
  }

  async loadTodos() {
    const newTodos = await todoService.fetchTodos()
    this.todos = newTodos
    this.render()
  }

  async addTodo(todoValue: string) {
    const newTodo = await todoService.createTodo(todoValue)
    this.todos.push(newTodo)
    this.render()
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
    this.render()
  }

  toggle(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    console.log(this.todos)
    this.render()
  }

  render() {
    this.todoListElement.innerHTML = ''
    this.todos.forEach((item) => {
      const todoItemElement = document.createElement('li')
      const todoSpanElement = document.createElement('span')
      todoSpanElement.innerHTML = item.text

      if (item.completed) {
        todoItemElement.classList.add('completed')
      }

      todoItemElement.addEventListener('click', () => {
        this.toggle(item.id)
      })

      const deleteButton = document.createElement('button')
      deleteButton.innerHTML = 'Delete'

      deleteButton.addEventListener('click', () => {
        this.removeTodo(item.id)
      })

      todoItemElement.appendChild(todoSpanElement)
      todoItemElement.appendChild(deleteButton)

      this.todoListElement?.appendChild(todoItemElement)
    })
  }
}

export const todoList = new TodoList('todo-list')
