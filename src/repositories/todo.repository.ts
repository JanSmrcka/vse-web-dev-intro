import { ITodo } from '../types/todo.type.ts'
import { StateManager } from '../state/state.ts'

/**
 * Class used for handling todo operations.
 * @author Adam Mrózek
 */
export class TodoRepository {
  private readonly todoStateKey: string = 'TODOS';
  private readonly state: StateManager<ITodo>;
  
  constructor() {
    this.state = new StateManager<ITodo>(this.todoStateKey);
  }
  
  /**
   * Adds a new todo item to the state.
   * @param todo The todo item to add.
   */
  upsertTodo(todo: ITodo): void {
    if (!todo.id) {
      // If the todo does not have an ID, we generate one.
      todo.id = crypto.randomUUID();
      
      // Save
      this.state.setItem(todo.id, todo);
    } else {
      // If the todo has an ID, we update it.
      const existingTodo = this.state.getItem(todo.id);
      if (existingTodo) {
        // Update the existing todo
        existingTodo.title = todo.title;
        existingTodo.completed = todo.completed;
        existingTodo.updatedAt = new Date();
        
        // Save the updated todo
        this.state.setItem(todo.id, existingTodo);
      } else {
        throw new Error(`Todo with ID "${todo.id}" does not exist.`);
      }
    }
  }
  
  /**
   * Retrieves a todo item by its ID.
   * @param id The ID of the todo item to retrieve.
   * @returns The todo item if found, otherwise undefined.
   */
  getTodoById(id: string): ITodo | undefined {
    return this.state.getItem(id);
  }

  /**
   * Get all todos.
   * @returns An array of all todo items.
   */
  getAllTodos(): ITodo[] {
    const todos: ITodo[] = [];
    console.log('All todos:');

    for (const todo of this.state) {
      todos.push(todo);
    }

    console.log(todos);
    return todos;
  }
}