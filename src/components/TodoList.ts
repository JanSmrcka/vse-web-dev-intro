import { todoService } from '../api/todos'
import { Todo } from '../types'

class TodoList {
  todos: Todo[] = []
  todoListElement: HTMLElement

  constructor(elementId: string) {
    this.todoListElement = document.getElementById(elementId)!
    this.loadTodos()
  }

  async loadTodos() {
    const newTodos = await todoService.fetchTodos()
    this.todos = newTodos
    this.render()
  }

  async addTodo(value: string) {
    const newTodo = await todoService.createTodos(value)
    this.todos.push(newTodo)
    this.render()
  }

  toggle(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id == id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    this.render()
  }

  remove(id: string) {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id
    })
    this.render()
  }

  render() {
    this.todoListElement.innerHTML = ''

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

      itemDeleteButton.addEventListener('click', () => {
        this.remove(item.id)
      })

      itemElement.appendChild(itemSpanElement)
      itemElement.appendChild(itemDeleteButton)
      this.todoListElement.appendChild(itemElement)
    })
  }
}

export const todoList = new TodoList('todo-list')
