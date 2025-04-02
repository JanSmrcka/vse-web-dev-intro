import { Todo, TodoState } from "../types";

export class TodoList {
  private element: HTMLUListElement;
  private store: TodoState | null = null;

  constructor(store: TodoState | null) {
    this.element = document.getElementById("todo-list") as HTMLUListElement;
    if (store) {
      this.setStore(store);
    }
  }

  setStore(store: TodoState): void {
    this.store = store;
    this.render();
  }

  private createTodoElement(todo: Todo): HTMLLIElement {
    const todoItem = document.createElement("li");
    todoItem.setAttribute("data-id", todo.id);

    if (todo.completed) {
      todoItem.classList.add("completed");
    }

    todoItem.addEventListener("click", () => {
      if (!this.store) return;
      this.store.toggleComplete(todo.id);
      this.render();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;

    const button = document.createElement("button");
    button.textContent = "Smazat";

    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!this.store) return;
      this.store.remove(todo.id);
      this.render();
    });

    todoItem.appendChild(span);
    todoItem.appendChild(button);

    return todoItem;
  }

  render(): void {
    if (!this.store) return;

    this.element.innerHTML = "";
    const todos = this.store.getAll();
    todos.forEach((todo) => {
      this.element.appendChild(this.createTodoElement(todo));
    });
  }
}
