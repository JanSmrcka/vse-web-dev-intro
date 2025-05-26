import { Todo } from '../types';

class TodoList {
    todos: Todo[] = [];
    todoListElement = document.getElementById("todo-list") as HTMLUListElement;

    addTodo(todoValue: string) {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: todoValue,
            completed: false
        };
        this.todos.push(newTodo);
        this.render();
    };

    render() {
        this.todoListElement.innerHTML = "";
        this.todos.forEach((item) => {
            const todoItemElement = document.createElement("li");
            const todoSpanElement = document.createElement("span");
            const deleteButton = document.createElement("button");

            //set completed class
            if (item.completed) {
                todoItemElement.classList.add("completed");
            };

            //item element event listener
            todoItemElement.addEventListener("click", () => {
                this.todos = this.todos.map((todo) => {
                    if (todo.id === item.id) {
                        return {
                            ...todo,
                            completed: !todo.completed
                        }
                    };
                    return todo;
                });
                this.render();
            });

            todoSpanElement.innerHTML = item.text;
            deleteButton.innerHTML = "Delete";

            //delete button event listener
            deleteButton.addEventListener("click", () => {
                this.todos = this.todos.filter((todo) => todo.id !== item.id);
                this.render();
            });

            todoItemElement.appendChild(todoSpanElement);
            todoItemElement.appendChild(deleteButton);
            this.todoListElement.appendChild(todoItemElement);
        });
    };
}

export const todoList = new TodoList();