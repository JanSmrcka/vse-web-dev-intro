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

  private async loadTodos() {
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
      this.isLoading = true
      this.render()
      const newTodo = await todoService.createTodo(todoValue)
      this.todos.push(newTodo)
      this.isLoading = false
      this.render()
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  async removeTodo(id: number) {
    try {
      this.isLoading = true
      this.render()
      await todoService.deleteTodo(id)
      this.todos = this.todos.filter((todo) => todo.id !== id)
      this.isLoading = false
      this.render()
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  async toggle(id: number) {
    try {
      this.isLoading = true
      this.render()
      const todo = this.todos.find((todo) => id === todo.id)
      const newTodo = await todoService.toggleTodo(id, !todo?.completed)
      this.isLoading = false
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return newTodo
        }
        return todo
      })
      console.log(this.todos)
      this.render()
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  private render() {
    this.todoListElement.innerHTML = ''

    if (this.isLoading === true && this.todos.length === 0) {
      this.todoListElement.appendChild(createLoadingSpinner())
      return
    }

    if (this.isLoading) {
      this.todoListElement.classList.add('isLoading')
    }
    if (!this.isLoading) {
      this.todoListElement.classList.remove('isLoading')
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
