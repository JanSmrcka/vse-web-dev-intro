const formElement = document.getElementById('todo-form')! as HTMLFormElement;

const todos: string[] = []

function handleFormSubmit(e: Event){
    e.preventDefault()
    const formData = new FormData(formElement)
    const todoValue = formData.get("todo-text") as string
    todos.push(todoValue)
    renderTodos()
    console.log(todos)
}

formElement.addEventListener('submit',handleFormSubmit)

function renderTodos() {
    const todoListElement = document.getElementById('todo-list') as HTMLUListElement
    todoListElement.innerHTML = ''
    todos.forEach((value, index) => {
        const todoItemElement = document.createElement('li')
        todoItemElement.innerHTML = value
        todoListElement?.appendChild(todoItemElement)

    })
}
