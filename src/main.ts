const formElement = document.getElementById('todo-form') as HTMLFormElement

type Todo = {
    id: string
    title: string
    completed: boolean
}

let todos: Todo[] = []

function handleFormSubmit(e: Event) {
  e.preventDefault()
  const formData = new FormData(formElement)
  const todoValue = formData.get('todo-text') as string

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: todoValue,
    completed: false
  }

  todos.push(newTodo)
  renderTodos()
  formElement.reset()
}

formElement?.addEventListener("submit", handleFormSubmit) // Otaznik - pokud je element NULL, tak to projde a nespadne

function renderTodos() {
  const todoListElement = document.getElementById('todo-list') as HTMLUListElement
  todoListElement.innerHTML = ''

  todos.forEach((item) => {
    const todoItemElement = document.createElement('li')
    const todoSpanElement = document.createElement('span')
    todoSpanElement.innerHTML = item.title

    if (item.completed) {
        todoItemElement.classList.add("completed")
    }

    todoItemElement.addEventListener("click", () => {
        todos = todos.map((todo) => {
            if (todo.id === item.id) {
                return {...todo, completed: !todo.completed} //spread operator - kopie objektu a zmenin v tomto pripade completed
            }
            return todo
        })
        console.log(todos)
        renderTodos()
    })


    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "Delete"

    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation()
        todos = todos.filter((todo ) => todo.id !== item.id )
        renderTodos()
    })





    todoItemElement.appendChild(todoSpanElement)
    todoItemElement.appendChild(deleteButton)

    todoListElement?.appendChild(todoItemElement)
  })
}
