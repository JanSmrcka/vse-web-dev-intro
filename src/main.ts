const formElement = document.getElementById('todo-form')! as HTMLFormElement

const todos : string[] = []

function handleFormSubmit(event: Event): void {
  event.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string
  todos.push(todoValue)
  renderTodos()
  console.log(todos)
}

formElement?.addEventListener('submit', handleFormSubmit)


function renderTodos() {

  const todoListElement = document.getElementById('todo-list')!
  todoListElement.innerHTML = '';

  todos.forEach((value) => {
    const todoItemElement = document.createElement('li')

    const todoSpanElement = document.createElement('span')
    todoSpanElement.innerHTML = value;

    const todoButtonElement = document.createElement('button')
    todoButtonElement.innerHTML = 'Delete'

    todoItemElement.appendChild(todoSpanElement)
    todoItemElement.appendChild(todoButtonElement)

    todoListElement.appendChild(todoItemElement)
  })
}


