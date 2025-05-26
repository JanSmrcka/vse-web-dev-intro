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
      this.isLoading = true
      this.render()
      const newTodo = await todoService.createTodos(value)
      this.isLoading = false
      this.render()
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
          this.isLoading = true
          this.render()
          todoService.toggleTodo(todo.id, !todo.completed)
          this.isLoading = false
          this.render()
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
      this.render()
    } catch (e) {
      console.error(e)
    }
  }

  async remove(id: string) {
    try {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
      this.isLoading = true
      this.render()
      await todoService.deleteTodo(id)
      this.isLoading = false
      this.render()
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    this.todoListElement.innerHTML = ''

    if (this.isLoading && this.todos.length == 0) {
      this.todoListElement.appendChild(createLoadingSpinner())
      return
    }
    
    if (this.isLoading) {
      this.todoListElement.classList.add('isLoading')
    } else {
      this.todoListElement.classList.remove('isLoading')
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
