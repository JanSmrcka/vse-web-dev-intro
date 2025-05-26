import { todoService } from '../api/todos'
import { Todo } from '../types'

class TodoList {
  todos: Todo[] = []

  todoListElement

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
    } catch (error) {
      console.log(error)
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
      console.log(error)
    }
  }

  async removeTodo(id: number) {
    try {
      await todoService.deleteTodo(id)
      this.todos = this.todos.filter((todo) => todo.id !== id)
      this.render()
    } catch (error) {
      console.log(error)
    }
  }

  async toggle(id: number) {
    const todo = this.todos.find((todo) => id === todo.id)
    const newTodo = await todoService.toggleTodo(id, !todo?.completed)

    try {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return newTodo
        }
        return todo
      })
      this.render()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    this.todoListElement.innerHTML = ''

    if (this.isLoading) {
      this.todoListElement.appendChild(createLoadingSpinner())
      {
        return
      }
    }

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

      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation()
        this.removeTodo(item.id)
      })

      todoItemElement.appendChild(todoSpanElement)
      todoItemElement.appendChild(deleteButton)
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

export const todoList = new TodoList('todo-list')
