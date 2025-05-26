import { Todo } from '../types'
import { todoService } from '../api/todos'

class TodoList {
  todos: Todo[] = []
  todoListElement = document.getElementById('todo-list') as HTMLUListElement
  isLoading: boolean = false

  constructor(elementId: string) {
    this.todoListElement = document.getElementById(elementId) as HTMLUListElement
    this.loadTodos()
  }

  async loadTodos() {
    try {
      this.isLoading = true
      this.render()
      const newTodos = await todoService.fetchTodos()
      this.todos = newTodos
      this.isLoading = false
      this.render()
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  async addTodo(todoValue: string) {
    try {
      const newTodo = await todoService.createTodo(todoValue)
      this.todos.push(newTodo)
      this.render()
    } catch (error) {
      console.error(error)
    }
  }

  async removeTodo(id: number) {
    try {
      await todoService.deleteTodo(id)
      this.todos = this.todos.filter((todo) => todo.id !== id)
      this.render()
    } catch (error) {}
  }

  async toggle(id: number) {
    const todo = this.todos.find((todo) => id === todo.id)
    const newTodo = await todoService.toggleTodo(id, !todo?.completed)

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return newTodo
      }
      return todo
    })
    console.log(this.todos)
    this.render()
  }

  render() {
    this.todoListElement.innerHTML = ''

    if (this.isLoading) {
      this.todoListElement.appendChild(createLoadingSpinner())
      return
    }

    this.todos.forEach((item) => {
      const todoItemElement = document.createElement('li')
      const todoSpanElement = document.createElement('span')
      todoSpanElement.innerHTML = item.text

      if (item.completed) {
        todoItemElement.classList.add('completed')
      }

      todoSpanElement.addEventListener('click', () => {
        this.toggle(item.id)
      })

      const deleteButtonElement = document.createElement('button')
      deleteButtonElement.innerHTML = 'Delete'

      deleteButtonElement.addEventListener('click', () => {
        this.removeTodo(item.id)
      })

      todoItemElement.appendChild(todoSpanElement)
      todoItemElement.appendChild(deleteButtonElement)

      this.todoListElement?.appendChild(todoItemElement)
    })
  }
}

function createLoadingSpinner() {
  const container = document.createElement('div')
  const spinner = document.createElement('div')
  container.className = 'loading-container'
  spinner.className = 'loading-spinner'

  container.appendChild(spinner)
  return container
}

export const todoList = new TodoList(`todo-list`)
