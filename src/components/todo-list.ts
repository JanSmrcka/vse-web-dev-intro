import { Todo } from '../types';

class TodoList {
    todos: Todo[] = [];
    todoListElement: HTMLUListElement;

    //constructor to initialize the todo list element - works with different HTML form elements
    constructor(elementId: string) {
        this.todoListElement = document.getElementById(elementId) as HTMLUListElement;
    };

    // Method to add a new todo item
    addTodo(todoValue: string) {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: todoValue,
            completed: false
        };
        this.todos.push(newTodo);
        this.render();
    };

    // Method to remove a todo item by its ID
    removeTodo(todoId: string) {
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
        this.render();
    };

    // Method to toggle the completion status of a todo item
    toggle(todoId: string) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            };
            return todo;
        });
        this.render();
    }

    // Method to render the todo list
    render() {
        this.todoListElement.innerHTML = "";

        // when there are no todos, display a message
        if (this.todos.length === 0) {
            this.todoListElement.innerHTML = "No todos yet!";
        }

        this.todos.forEach((item) => {
            const todoItemElement = document.createElement("li");
            const todoSpanElement = document.createElement("span");
            const deleteButton = document.createElement("button");

            //set completed class
            if (item.completed) {
                todoItemElement.classList.add("completed");
                this.todoListElement.classList.add("completed");
            };

            //item element event listener
            todoItemElement.addEventListener("click", () => {
                this.toggle(item.id);
            });

            todoSpanElement.innerHTML = item.text;
            deleteButton.innerHTML = "Delete";

            //delete button event listener
            deleteButton.addEventListener("click", () => {
                this.removeTodo(item.id);
            });

            todoItemElement.appendChild(todoSpanElement);
            todoItemElement.appendChild(deleteButton);
            this.todoListElement.appendChild(todoItemElement);
        });
    };
}

export const todoList = new TodoList("todo-list");