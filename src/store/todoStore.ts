import { Todo, TodoState } from "../types";
import { todoService } from "../services/api";

class TodoStore implements TodoState {
  public todos: Todo[] = [];
  private onTodosLoaded: () => void;

  constructor(onTodosLoaded: () => void) {
    this.onTodosLoaded = onTodosLoaded;
    this.loadTodos();
  }

  private async loadTodos(): Promise<void> {
    try {
      this.todos = await todoService.fetchTodos();
      this.onTodosLoaded();
    } catch (error) {
      console.error("Error loading todos:", error);
      // Here you could add error handling UI feedback
    }
  }

  async add(todoText: string): Promise<Todo> {
    const optimisticTodo: Todo = {
      id: crypto.randomUUID(),
      text: todoText,
      completed: false,
    };

    try {
      this.todos.push(optimisticTodo);
      this.onTodosLoaded();

      const newTodo = await todoService.createTodo(todoText);
      await this.loadTodos();
      return newTodo;
    } catch (error) {
      // Rollback optimistic update
      this.todos = this.todos.filter((todo) => todo.id !== optimisticTodo.id);
      this.onTodosLoaded();
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const originalTodos = [...this.todos];

    try {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.onTodosLoaded();

      await todoService.deleteTodo(id);
    } catch (error) {
      // Rollback on error
      this.todos = originalTodos;
      this.onTodosLoaded();
      throw error;
    }
  }

  async toggleComplete(id: string): Promise<void> {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return;

    const originalTodos = [...this.todos];

    try {
      this.todos = this.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      this.onTodosLoaded();

      await todoService.updateTodo(id, !todo.completed);
      await this.loadTodos();
    } catch (error) {
      // Rollback on error
      this.todos = originalTodos;
      this.onTodosLoaded();
      throw error;
    }
  }

  getAll(): Todo[] {
    return this.todos;
  }
}

export const createTodoStore = (onTodosLoaded: () => void): TodoState => {
  return new TodoStore(onTodosLoaded);
};
