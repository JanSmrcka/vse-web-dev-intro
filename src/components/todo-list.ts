import { Todo } from '../types';
import { todoService } from '../api/todos';

class TodoList {
    todos: Todo[] = [];
    todoListElement: HTMLUListElement;

    //constructor to initialize the todo list element - works with different HTML form elements
    constructor(elementId: string) {
        this.todoListElement = document.getElementById(elementId) as HTMLUListElement;
        this.loadTodos();
    };

    // Method to fetch todos from the API
    async loadTodos() {
        const newTodos = await todoService.fetchTodos();
        this.todos = newTodos;
        this.render();
        //console.log("Todos loaded:", this.todos);
    };

    // Method to add a new todo item
    async addTodo(todoValue: string) {
        await todoService.createTodo(todoValue);
        this.loadTodos();
        this.render();
    };

    // Method to remove a todo item by its ID
    async removeTodo(todoId: string) {
        await todoService.deleteTodo(todoId);
        this.loadTodos();
        this.render();
    };

    // Method to toggle the completion status of a todo item
    async toggle(todoId: string) {
        await todoService.toggleTodo(todoId);
        this.loadTodos();
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
            deleteButton.addEventListener("click", (e: Event) => {
                e.stopPropagation();
                this.removeTodo(item.id);
            });

            todoItemElement.appendChild(todoSpanElement);
            todoItemElement.appendChild(deleteButton);
            this.todoListElement.appendChild(todoItemElement);
        });
    };
}

export const todoList = new TodoList("todo-list");