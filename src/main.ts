import { todoList } from './components/TodoList'
import { Todo } from './types'

const formElement = document.getElementById('todo-form')! as HTMLFormElement

let todos: Todo[] = []

function handleFormSubmit(e: Event) {
  e.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string

  todoList.addTodo(todoValue)
  formElement.reset()
}

formElement.addEventListener('submit', handleFormSubmit)
