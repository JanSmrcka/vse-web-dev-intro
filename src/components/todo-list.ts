import { Todo } from '../types';
import { todoService } from '../api/todos';

class TodoList {
    todos: Todo[] = [];
    todoListElement: HTMLUListElement;
    private isLoading: boolean = false;
    private updatingList: boolean = false;

    //constructor to initialize the todo list element - works with different HTML form elements
    constructor(elementId: string) {
        this.todoListElement = document.getElementById(elementId) as HTMLUListElement;
        this.loadTodos();
    };

    // Method to fetch todos from the API
    private async loadTodos() {
        try {
            if (!this.updatingList) {
                this.isLoading = true;
                this.render();
            }
            this.todos = await todoService.fetchTodos();
            //console.log("Todos loaded:", this.todos);
        } catch (error) {
            console.error("Error loading todos:", error);
        } finally {
            if (!this.updatingList) {
                this.isLoading = false;
            }
            this.render();
        }
    };

    // Method to add a new todo item
    public async addTodo(todoValue: string) {
        try {
            this.updatingList = true;
            this.render();
            await todoService.createTodo(todoValue);
            await this.loadTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        } finally {
            this.updatingList = false;
            this.render();
        }
    };

    // Method to remove a todo item by its ID
    private async removeTodo(todoId: string) {
        try {
            this.updatingList = true;
            this.render();
            await todoService.deleteTodo(todoId);
            await this.loadTodos();
        } catch (error) {
            console.error("Error removing todo:", error);
        } finally {
            this.updatingList = false;
            this.render();
        }
    };

    // Method to toggle the completion status of a todo item
    private async toggle(todoId: string) {
        try {
            this.updatingList = true;
            this.render();
            await todoService.toggleTodo(todoId);
            await this.loadTodos();
        } catch (error) {
            console.error("Error toggling todo:", error);
        } finally {
            this.updatingList = false;
            this.render();
        }
    };

    // Method to render the todo list
    public render() {
        this.todoListElement.innerHTML = "";

        // when there are no todos, display a message
        if (this.todos.length === 0) {
            this.todoListElement.innerHTML = "No todos yet!";
            return;
        }

        // if loading, show loading spinner
        if (this.isLoading) {
            this.todoListElement.appendChild(createLoadingSpinner());
            return;
        }

        // if updating the list of todos, show pulse loading
        if (this.updatingList) {
            this.todoListElement.classList.add("isLoading");
        } else {
            this.todoListElement.classList.remove("isLoading");
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

function createLoadingSpinner() {
    const container = document.createElement("div");
    const spinner = document.createElement("div");

    container.className = "loading-container";
    spinner.className = "loading-spinner";

    container.appendChild(spinner);
    return container;
};

export const todoList = new TodoList("todo-list");