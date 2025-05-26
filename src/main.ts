const formElement = document.getElementById('todo-form')

const todos: string[] = []

function handleFormSubmit(e: Event) {
  e.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string
  todos.push(todoValue)
  renderTodos()
}

formElement?.addEventListener("submit", handleFormSubmit) // Otaznik - pokud je element NULL, tak to projde a nespadne

function renderTodos() {
  const todoListElement = document.getElementById('todo-list') as HTMLUListElement
  todoListElement.innerHTML = ''

  todos.forEach((value) => {
    const todoItemElement = document.createElement('li')
    const todoSpanElement = document.createElement('span')
    todoSpanElement.innerHTML = value
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "Delete"

    todoItemElement.appendChild(todoSpanElement)
    todoItemElement.appendChild(deleteButton)

    todoListElement?.appendChild(todoItemElement)
  })
}
