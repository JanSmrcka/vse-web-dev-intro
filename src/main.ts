const formElement = document.getElementById("todo-form") as HTMLFormElement;
type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

let todos: Array<Todo> = [];

function handleFormSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(formElement);
    const todoValue = formData.get("todo-text") as string;

    const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: todoValue,
        completed: false
    };

    todos.push(newTodo);
    renderTodos();
    formElement.reset();
};

formElement.addEventListener("submit", handleFormSubmit);

function renderTodos() {
    const todoListElement = document.getElementById("todo-list") as HTMLUListElement;
    todoListElement.innerHTML = "";
    todos.forEach((item) => {
        const todoItemElement = document.createElement("li");
        const todoSpanElement = document.createElement("span");
        const deleteButton = document.createElement("button");

        //set completed class
        if (item.completed) {
            todoItemElement.classList.add("completed");
        };

        //item element event listener
        todoItemElement.addEventListener("click", () => {
            todos = todos.map((todo) => {
                if (todo.id === item.id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                };
                return todo;
            });
            renderTodos();
        });

        todoSpanElement.innerHTML = item.text;
        deleteButton.innerHTML = "Delete";

        //delete button event listener
        deleteButton.addEventListener("click", () => {
            todos = todos.filter((todo) => todo.id !== item.id);
            renderTodos();
        });

        todoItemElement.appendChild(todoSpanElement);
        todoItemElement.appendChild(deleteButton);

        todoListElement.appendChild(todoItemElement);
    });
};