import { todoService } from '../api/todos'
import { Todo } from '../Types'

class TodoList {
  todos: Todo[] = []

  todoListElement

  isLoading: boolean = false

  constructor(elementId: string = 'todo-list') {
    this.todoListElement = document.getElementById(elementId)! as HTMLUListElement
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
      console.error('Error loading todos:', error)
      this.todoListElement.innerHTML = '<li>Error loading todos. Please try again later.</li>'
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
      console.error('Error adding todo:', error)
      this.todoListElement.innerHTML = '<li>Error adding todo. Please try again later.</li>'
    }
  }

  async removeTodo(id: number) {
    try {
      await todoService.deleteTodo(id)
      this.todos = this.todos.filter((todo) => todo.id !== id)
      this.render()
    } catch (error) {
      console.error('Error removing todo:', error)
      this.todoListElement.innerHTML = '<li>Error removing todo. Please try again later.</li>'
    }
  }

  async toggle(id: number) {
    const todo = this.todos.find((todo) => todo.id === id)
    try {
      const newTodo = await todoService.toggleTodo(id, !todo?.completed)

      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return newTodo
        }
        return todo
      })
      this.render()
    } catch (error) {
      console.error('Error toggling todo:', error)
      this.todoListElement.innerHTML = '<li>Error toggling todo. Please try again later.</li>'
    }
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

      todoItemElement.addEventListener('click', () => {
        this.toggle(item.id)
      })

      const deleteBtnElement = document.createElement('button')
      deleteBtnElement.innerHTML = 'Delete'

      deleteBtnElement.addEventListener('click', () => {
        this.removeTodo(item.id)
      })

      todoItemElement.appendChild(todoSpanElement)
      todoItemElement.appendChild(deleteBtnElement)

      this.todoListElement.appendChild(todoItemElement)
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
