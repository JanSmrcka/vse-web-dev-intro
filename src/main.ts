const formElement = document.getElementById('todo-form')! as HTMLFormElement;



function handleFormSubmit(e: Event){
    e.preventDefault()
    const formData = new FormData(formElement)
    const todoValue = formData.get("todo-text") as string
    console.log(todoValue)
}

formElement.addEventListener('submit',handleFormSubmit)

