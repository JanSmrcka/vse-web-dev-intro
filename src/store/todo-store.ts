import { renderTodoList } from '../render-todos';
import { todoApi } from '../service/todo-api';
import { TodoItem } from '../types';

class TodoStore {
  private todoList: TodoItem[] = [];
  public isLoading: boolean = false;
  private render: () => void;

  constructor(render: () => void) {
    this.todoList = [];
    this.isLoading = false;
    this.render = render;
  }

  async initialize() {
    await this.loadTodos();
  }

  private async withLoading(fn: () => Promise<void>) {
    try {
      this.isLoading = true;
      this.render();
      await fn();
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  async addTodo(text: string) {
    await this.withLoading(async () => {
      const newTodo = await todoApi.addTodo(text);
      this.todoList = [...this.todoList, newTodo];
    });
  }

  async deleteTodo(id: string) {
    await this.withLoading(async () => {
      await todoApi.deleteTodo(id);
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
    });
  }

  async toggleTodo(id: string) {
    await this.withLoading(async () => {
      const todoToToggle = this.todoList.find((todo) => todo.id === id);
      if (!todoToToggle) return;

      const updatedTodo = await todoApi.toggleTodo(id, !todoToToggle.completed);
      this.todoList = this.todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    });
  }

  getTodos() {
    return this.todoList;
  }

  private async loadTodos() {
    await this.withLoading(async () => {
      this.todoList = await todoApi.fetchTodos();
    });
  }
}

const todoStore = new TodoStore(renderTodoList);

export default todoStore;
