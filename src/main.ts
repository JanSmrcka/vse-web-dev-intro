import { todoList } from './components/TodoList.ts'

const formElement = document.getElementById('todo-form')! as HTMLFormElement



function handleFormSubmit(event: Event): void {
  event.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string

  todoList.addTodo(todoValue);

  formElement.reset();
}

formElement?.addEventListener('submit', handleFormSubmit)

