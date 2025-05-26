const formElement = document.getElementById('todo-form')! as HTMLFormElement

const todos: string[] = []

function handleFormSubmit(e: Event) {
  e.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string
  todos.push(todoValue)
  renderTodos()
  console.log(todos)
}

formElement.addEventListener('submit', handleFormSubmit)

function renderTodos() {
  const todoListElement = document.getElementById('todo-list')!
  todoListElement.innerHTML = ''

  todos.forEach((value, index) => {
    const todoItemElement = document.createElement('li')
    const todoSpanElement = document.createElement('span')
    todoSpanElement.innerHTML = value
    const todoDeleteButton = document.createElement('button')

    todoDeleteButton.innerHTML = 'delete'

    todoItemElement.appendChild(todoSpanElement)
    todoItemElement.appendChild(todoDeleteButton)
    todoListElement.appendChild(todoItemElement)
  })
}
