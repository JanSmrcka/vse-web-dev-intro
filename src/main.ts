import { todoList } from './components/TodoList.ts'

const formElement = document.getElementById('todo-form')! as HTMLFormElement

function handleSubmit(e: Event) {
  e.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string

  todoList.addTodo(todoValue)
  formElement.reset()
}

formElement?.addEventListener('submit', handleSubmit)
