export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  add: (text: string) => Promise<Todo>;
  remove: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  getAll: () => Todo[];
}

export interface TodoService {
  fetchTodos: () => Promise<Todo[]>;
  createTodo: (text: string) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, completed: boolean) => Promise<Todo>;
}
