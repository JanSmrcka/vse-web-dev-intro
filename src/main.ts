const formElement = document.getElementById('todo-form')! as HTMLFormElement

type Todo = {
  id: string
  text: string
  completed: boolean
}

let todos: Todo[] = []

function handleFormSubmit(e: Event) {
  e.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: todoValue,
    completed: false,
  }

  todos.push(newTodo)
  renderTodos()
  formElement.reset()
}

formElement.addEventListener('submit', handleFormSubmit)

function renderTodos() {
  const todoListElement = document.getElementById('todo-list')!
  todoListElement.innerHTML = ''

  todos.forEach((item) => {
    const itemElement = document.createElement('li')
    const itemSpanElement = document.createElement('span')
    itemSpanElement.innerHTML = item.text

    if (item.completed) {
      itemElement.classList.add('completed')
    }

    itemElement.addEventListener('click', () => {
      todos = todos.map((todo) => {
        if (todo.id == item.id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
      renderTodos()
    })

    const itemDeleteButton = document.createElement('button')
    itemDeleteButton.innerHTML = 'delete'

    itemDeleteButton.addEventListener('click', () => {
      todos = todos.filter((todo) => {
        return todo.id !== item.id
      })
      renderTodos()
    })

    itemElement.appendChild(itemSpanElement)
    itemElement.appendChild(itemDeleteButton)
    todoListElement.appendChild(itemElement)
  })
}
