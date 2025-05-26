import { todoService } from '../api/todos'
import { Todo } from '../Types'

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
    } catch (error) {
      console.log(error)
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
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return newTodo
        }
        return todo
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  render() {
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
