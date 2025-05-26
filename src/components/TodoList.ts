import { Todo } from '../types.ts'
import { todoService } from '../api/todos.ts'

class TodoList {
  todos: Todo[]=[]
  todoListElement
  isLoading = false

  constructor(elementId:string){
    this.todoListElement= document.getElementById(elementId) as HTMLUListElement
    this.loadTodos()
  }

  async loadTodos(){
    try {
      this.isLoading = true
      this.render()
      this.todos = await todoService.fetchTodos()
      this.isLoading = false
      this.render()
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  async addTodo(todoValue:string){
    try {
      this.isLoading = true
      this.render()
      const newTodo = await todoService.createTodo(todoValue)
      this.todos.push(newTodo)
      this.render()
    }catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  async removeTodo(id:number){
    try {
      this.isLoading = true
      this.render()
      await todoService.deleteTodo(id)
      this.todos = this.todos.filter((todo) => todo.id !== id)
      this.render()
    } catch (error) {
     console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  async toggle(id:number){
    try {
      const todo = this.todos.find((todo)=>todo.id === id)
      this.isLoading = true
      this.render()
      const newTodo = await todoService.toggleTodo(id, !todo?.completed)
      this.todos = this.todos.map((todo)=>{
        if(todo.id === id){
          return newTodo
        }
        return todo
      })
      this.render()
    } catch (error) {
     console.error(error)
    } finally {
      this.isLoading = false
      this.render()
    }
  }

  render() {
    this.todoListElement.innerHTML = ''

    if(this.isLoading && !this.todos.length){
      this.todoListElement.appendChild(createLoadingSpinner())
      return
    }

    if(this.isLoading){
      this.todoListElement.classList.add('isLoading')
    }

    if(!this.isLoading){
      this.todoListElement.classList.remove('isLoading')
    }

    this.todos.forEach((item) => {
      const todoItemElement = document.createElement('li')
      const todoSpanElement = document.createElement('span')
      todoSpanElement.innerHTML = item.text

      if(item.completed){
        todoItemElement.classList.add('completed')
      }

      const deleteButtonElement = document.createElement('button')
      deleteButtonElement.innerHTML = 'Delete'

      deleteButtonElement.addEventListener('click', (ev)=>{
        ev.stopPropagation()
        this.removeTodo(item.id)
      })

      todoItemElement.addEventListener('click', () => {
        this.toggle(item.id)
      })

      todoItemElement.appendChild(todoSpanElement)
      todoItemElement.appendChild(deleteButtonElement)

      this.todoListElement?.appendChild(todoItemElement)
    })
  }
}

function createLoadingSpinner() {
  const container = document.createElement('div')
  container.classList.add('loading-container')
  const spinner = document.createElement('div')
  spinner.classList.add('loading-spinner')
  container.appendChild(spinner)
  return container
}

export const todoList = new TodoList("todo-list")