const formElement = document.getElementById('todo-form')! as HTMLFormElement;

type Todo = {
    id: string
    text: string
    completed: boolean
}

const todos: Todo[] = []

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
    console.log(todos)
}

formElement.addEventListener('submit',handleFormSubmit)

function renderTodos() {
    const todoListElement = document.getElementById('todo-list') as HTMLUListElement
    todoListElement.innerHTML = ''

    todos.forEach((todo) => {
        const todoItemElement = document.createElement('li')
        const todoSpanElement = document.createElement("span")
        todoSpanElement.innerHTML = todo.text
        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = 'delet'

        todoItemElement.appendChild(todoSpanElement)
        todoItemElement.appendChild(deleteButton)

        todoListElement?.appendChild(todoItemElement)

    })
}
