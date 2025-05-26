import { Todo } from '../types'
import { todoService } from '../api/todos'

class TodoList {
  todos: Todo[] = []
  todoListElement = document.getElementById('todo-list') as HTMLUListElement

  constructor(elementId: string) {
    this.todoListElement = document.getElementById(elementId) as HTMLUListElement
    this.loadTodos()
  }

  async loadTodos() {
    try {
      const newTodos = await todoService.fetchTodos()
      this.todos = newTodos
      this.render()
    } catch (error) {
      console.error(error)
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

export const todoList = new TodoList(`todo-list`)
