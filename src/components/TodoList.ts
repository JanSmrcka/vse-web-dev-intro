import { Todo } from "../types";

class TodoList {
  private todos: Array<Todo> = [];
  private todoListElem: HTMLUListElement;

  constructor(elemId: string) {
    this.todoListElem = (document.getElementById(elemId) as HTMLUListElement);
  }

  public addTodo(todoText: string) {
    this.todos.push({
      id: crypto.randomUUID(),
      text: todoText,
      isCompleted: false,
    })

    this.render();
  }

  public removeTodo(id: Todo['id']) {
    this.todos = this.todos.filter((savedTodo) => savedTodo.id !== id)

    this.render();
  }

  public toggle(id: Todo['id']) {
    this.todos = this.todos.map((savedTodo): Todo =>
      savedTodo.id === id
        ? { ...savedTodo, isCompleted: !savedTodo.isCompleted }
        : savedTodo
    )

    this.render();
  }

  public render(): void {
    this.todoListElem.innerHTML = '';

    this.todos.forEach((value, index) => {
      const todoItemElem = document.createElement('li')
      const todoSpanElem = document.createElement('span')
      todoSpanElem.innerHTML = value.text

      if (value.isCompleted) todoItemElem.classList.add('completed')

      // Click to change isCompleted
      todoItemElem.addEventListener('click', () => {
        this.toggle(value.id)
      })

      // Delete Button
      const deleteBtn = document.createElement('button')
      deleteBtn.innerHTML = 'delete'
      deleteBtn.addEventListener('click', () => {
        this.removeTodo(value.id)
      })

      todoItemElem.appendChild(todoSpanElem)
      todoItemElem.appendChild(deleteBtn)
      this.todoListElem?.appendChild(todoItemElem)
    });
  }
}

export const todoList = new TodoList('todo-list');