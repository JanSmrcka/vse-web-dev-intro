const formElement = document.getElementById("todo-form") as HTMLFormElement;

const todos: Array<string> = [];

function handleFormSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(formElement);
    const todoValue = formData.get("todo-text") as string;
    //console.log(todoValue);
    todos.push(todoValue);
    //console.log(todos);
    renderTodos();
    formElement.reset();
};

formElement.addEventListener("submit", handleFormSubmit);

function renderTodos() {
    const todoListElement = document.getElementById("todo-list") as HTMLUListElement;
    todoListElement.innerHTML = "";
    todos.forEach((value) => {
        const todoItemElement = document.createElement("li");
        const todoSpanElement = document.createElement("span");
        const deleteButton = document.createElement("button");

        todoSpanElement.innerHTML = value;
        deleteButton.innerHTML = "Delete";

        todoItemElement.appendChild(todoSpanElement);
        todoItemElement.appendChild(deleteButton);

        todoListElement.appendChild(todoItemElement);
    });
};