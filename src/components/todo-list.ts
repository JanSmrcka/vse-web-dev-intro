import { todoService } from '../api/todos'
import { Todo } from '../types'

class TodoList {
  private todos: Todo[] = []
  private readonly todoListElement: HTMLUListElement
  private isLoading = false;

  constructor(elementId: string) {
    this.todoListElement = document.getElementById(elementId) as HTMLUListElement
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
    } catch (err) {
      console.error(err)
    } finally {
      this.isLoading = false
      this.render()
    }
  
  }

  async addTodo(todoValue: string) {
    const newTodo = await todoService.createTodo(todoValue)
    this.todos.push(newTodo)
    this.render()
  }

  async toggleTodo(todo: Todo) {
    todoService.toggleTodo(todo)
    this.todos = this.todos.map((it) => (it.id === todo.id ? { ...it, completed: !it.completed } : it))
    this.render()
  }

  async removeTodo(id: string) {
    todoService.deleteTodo(id)
    this.todos = this.todos.filter(it => it.id !== id)
    this.render()
  }

  render() {
    this.todoListElement.innerHTML = ''

    if(this.isLoading) {
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

      todoItemElement.appendChild(todoSpanElement)

      const deleteButton = document.createElement('button')
      todoItemElement.appendChild(deleteButton).innerText = 'Delete'
      deleteButton.addEventListener('click', async (e: Event) => {
        e.stopPropagation()
        this.removeTodo(item.id)
      })

      todoItemElement.addEventListener('click', () => {
       this.toggleTodo(item)
      })

      this.todoListElement?.appendChild(todoItemElement)
    })
  }
}

function createLoadingSpinner() {
  const container = document.createElement("div")
  const spinner = document.createElement("div")
  container.className = "loading-container"
  spinner.className = "loading-spinner"
  container.appendChild(spinner)
  return container
}

export const todoList = new TodoList('todo-list')
