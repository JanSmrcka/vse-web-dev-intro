import { todoService } from '../api/todos'
import { Todo } from '../Types'

class TodoList {
  todos: Todo[] = []

  todoListElement

  constructor(elementId: string = 'todo-list') {
    this.todoListElement = document.getElementById(elementId)! as HTMLUListElement
    this.loadTodos()
  }

  async loadTodos() {
    const newTodos = await todoService.fetchTodos()
    this.todos = newTodos
    this.render()
  }

  async addTodo(todoValue: string) {
    const newTodo = await todoService.createTodo(todoValue)
    this.todos.push(newTodo)
    this.render()
  }

  async removeTodo(id: number) {
    await todoService.deleteTodo(id)
    this.todos = this.todos.filter((todo) => todo.id !== id)
    this.render()
  }

  toggle(id: number) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
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

export const todoList = new TodoList('todo-list')
