const formElement = document.getElementById("todo-form") as HTMLFormElement;

const todos: string[] = [];

function handleFormSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(formElement);
    const todoValue = formData.get("todo-text") as string;
    todos.push(todoValue);
    renderTodos();
    console.log(todos)
}

formElement.addEventListener("submit", handleFormSubmit);

function renderTodos() {
    const todoListElement = document.getElementById("todo-list");
    if (!todoListElement) return;
    todoListElement.innerHTML = ""; // Clear the existing list
    
    todos.forEach((value) => {
        const todoItemElement = document.createElement("li");
        const todooSpanElement = document.createElement("span");
        todooSpanElement.textContent = value;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";


        todoItemElement.appendChild(todooSpanElement);
        todoItemElement.appendChild(deleteButton);


        todoListElement.appendChild(todoItemElement);
    })
}

