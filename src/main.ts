const formElement = document.getElementById('todo-form')! as HTMLFormElement;

type Todo = {
    id: string
    text: string
    completed: boolean
}

let todos: Todo[] = []

function handleFormSubmit(e: Event){
    e.preventDefault()
    const formData = new FormData(formElement)
    const todoValue = formData.get("todo-text") as string

    const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: todoValue,
        completed: false
    }
    todos.push(newTodo)
    renderTodos()
    formElement.reset()
    console.log(todos)
}

formElement.addEventListener('submit',handleFormSubmit)

function renderTodos() {
    const todoListElement = document.getElementById('todo-list') as HTMLUListElement
    todoListElement.innerHTML = ''

    todos.forEach((item) => {
        const todoItemElement = document.createElement('li')
        const todoSpanElement = document.createElement("span")
        todoSpanElement.innerHTML = item.text

        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = 'delet'

        deleteButton.addEventListener('click', () => {
            todos = todos.filter((todo) => todo.id !== item.id)
            renderTodos
        })

        todoItemElement.appendChild(todoSpanElement)
        todoItemElement.appendChild(deleteButton)

        todoListElement?.appendChild(todoItemElement)

    })
}
