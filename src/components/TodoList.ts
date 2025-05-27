import { todoService } from '../api/todos';
import { Todo } from '../types';

class TodoList {
    private todos: Array<Todo> = [];
    private todoListElem: HTMLUListElement;
    private isLoading = false;

    constructor(elemId: string) {
        this.todoListElem = document.getElementById(elemId) as HTMLUListElement;
        this.loadTodos();
    }

    public async loadTodos() {
        try {
            this.isLoading = true;
            this.render();
            this.todos = await todoService.fetchTodos();
        } catch (err) {
            console.error(err);
        } finally {
            this.isLoading = false;
            this.render();
        }
    }

    public async addTodo(todoText: string) {
        try {
            this.isLoading = true;
            this.render();
            const newTodo = await todoService.createTodo(todoText);
            this.todos = [...this.todos, newTodo];
        } catch (err) {
            console.error(err);
        } finally {
            this.isLoading = false;
            this.render();
        }
    }

    public async removeTodo(id: Todo['id']) {
        try {
            this.isLoading = true;
            this.render();
            await todoService.deleteTodo(id);
        } catch (err) {
            console.error(err);
        } finally {
            this.isLoading = false;
            this.loadTodos();
        }
    }

    public async toggle(todo: Todo) {
        try {
            this.isLoading = true;
            this.render();
            await todoService.toggleTodo(todo.id, !todo.completed);
        } catch (err) {
            console.error(err);
        } finally {
            this.isLoading = false;
            this.loadTodos();
        }
    }

    public render(): void {
        this.todoListElem.innerHTML = '';

        if (this.isLoading) {
            if (this.todos.length > 0) {
                this.todoListElem.classList.add('isLoading');
            } else {
                this.todoListElem.appendChild(createLoadingSpinner());
            }
        } else {
            this.todoListElem.classList.remove('isLoading');
        }

        this.todos.forEach((value, index) => {
            const todoItemElem = document.createElement('li');
            const todoSpanElem = document.createElement('span');
            todoSpanElem.innerHTML = value.text;

            if (value.completed) todoItemElem.classList.add('completed');

            // Click to change isCompleted
            todoItemElem.addEventListener('click', () => {
                this.toggle(value);
            });

            // Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'delete';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeTodo(value.id);
            });

            todoItemElem.appendChild(todoSpanElem);
            todoItemElem.appendChild(deleteBtn);
            this.todoListElem?.appendChild(todoItemElem);
        });
    }
}

function createLoadingSpinner() {
    const container = document.createElement('div');
    const spinner = document.createElement('div');
    container.className = 'loading-container';
    spinner.className = 'loading-spinner';

    container.appendChild(spinner);

    return container;
}

export const todoList = new TodoList('todo-list');