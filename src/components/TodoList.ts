import { todoService } from '../api/todos'
import { Todo } from '../types'

class TodoList {
  todos: Todo[] = []
  todoListElement: HTMLElement
  isLoading: boolean = false

  constructor(elementId: string) {
    this.todoListElement = document.getElementById(elementId)!
    this.loadTodos()
  }

  async loadTodos() {
    try {
      this.isLoading = true
      this.render()
      const newTodos = await todoService.fetchTodos()
      this.isLoading = false
      this.todos = newTodos
      this.render()
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  async addTodo(value: string) {
    try {
      const newTodo = await todoService.createTodos(value)
      this.todos.push(newTodo)
      this.render()
    } catch (e) {
      console.error(e)
    }
  }

  toggle(id: string) {
    try {
      this.todos = this.todos.map((todo) => {
        if (todo.id == id) {
          todoService.toggleTodo(todo.id, !todo.completed)
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
      this.render()
    } catch (e) {
      console.error(e)
    }
  }

  remove(id: string) {
    try {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
      todoService.deleteTodo(id)
      this.render()
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    this.todoListElement.innerHTML = ''

    if (this.isLoading) {
      this.todoListElement.appendChild(createLoadingSpinner())
      return
    }

    this.todos.forEach((item) => {
      const itemElement = document.createElement('li')
      const itemSpanElement = document.createElement('span')
      itemSpanElement.innerHTML = item.text

      if (item.completed) {
        itemElement.classList.add('completed')
      }

      itemElement.addEventListener('click', () => {
        this.toggle(item.id)
      })

      const itemDeleteButton = document.createElement('button')
      itemDeleteButton.innerHTML = 'delete'

      itemDeleteButton.addEventListener('click', (e) => {
        e.stopPropagation()
        this.remove(item.id)
      })

      itemElement.appendChild(itemSpanElement)
      itemElement.appendChild(itemDeleteButton)
      this.todoListElement.appendChild(itemElement)
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
