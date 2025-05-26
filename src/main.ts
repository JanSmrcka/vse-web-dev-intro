import { todoList } from "./components/todo-list"

const formElement = document.getElementById('todo-form') as HTMLFormElement
todoList.loadTodos

function handleFormSubmit(e: Event) {
  e.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string

  todoList.addTodo(todoValue)
  formElement.reset()
}

formElement?.addEventListener("submit", handleFormSubmit) // Otaznik - pokud je element NULL, tak to projde a nespadne
