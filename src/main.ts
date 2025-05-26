const formElement = document.getElementById('todo-form')! as HTMLFormElement

const todos: string[] = []

formElement?.addEventListener('submit', (e: Event) => {
  e.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string
  todos.push(todoValue)
  renderTodos()
  console.log(todoValue)
})

function renderTodos() {
  const todoListElement = document.getElementById('todo-list') as HTMLUListElement
  todoListElement.innerHTML=''

  todos.forEach((value)=>{
    const todoItemElement = document.createElement('li')
    const todoSpanElement = document.createElement('span')
    const deleteButtonElement = document.createElement('button')
    deleteButtonElement.innerHTML = 'Delete'
    todoItemElement.appendChild(todoSpanElement)
    todoItemElement.appendChild(deleteButtonElement)
    todoSpanElement.innerHTML = value
    todoListElement?.appendChild(todoItemElement)
  })
}
