type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

class TodoState {
  todos: Todo[] = [];

  add(todoText: string) {
    const id = crypto.randomUUID();
    const todo = { id, text: todoText, completed: false };
    this.todos.push(todo);
  }
  remove(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  complete(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
  }
  get() {
    return this.todos;
  }
}

const todoState = new TodoState();

export default todoState;
