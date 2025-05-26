import 'reflect-metadata';
import { TodoListRenderer } from './renderers/todoList.renderer.ts'
import { container } from 'tsyringe';
import { TodoRepository } from './repositories/todo.repository.ts'
import { Todo } from './types/todo.type.ts'

class Main {
  private readonly todoListRenderer: TodoListRenderer;
  private readonly todoRepository: TodoRepository;
  
  constructor() {
    this.registerDependencies();
    
    // Resolve the TodoListRenderer from the container
    this.todoListRenderer = container.resolve<TodoListRenderer>('TodoListRenderer');
    this.todoRepository = container.resolve<TodoRepository>('TodoRepository');
    this.initialize();
  }

  /**
   * Run the main initialization logic.
   * @private
   */
  private async initialize(){
    this.registerHandlers();
    this.todoListRenderer.renderTodoList(await this.todoRepository.getAllTodosCached());
  }

  /**
   * Registers the dependencies in the IoC container.
   * Used without the @injectable decorator as it does not work here.
   * @private
   */
  private registerDependencies() {
    container.register('TodoRepository', { useClass: TodoRepository });
    container.register('TodoListRenderer', { useClass: TodoListRenderer });
  }
  
  /**
   * Registers event handlers for the application - e.g. form submission or events for buttons
   * @private
   */
  private registerHandlers() {
    
    // Register the form submission handler
    document.getElementById('todo-form')?.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      const titleInput = (document.getElementById('new-todo-input') as HTMLInputElement).value.trim();
      
      // Create a new todo item
      const todo: Todo = {
        id: null,
        text: titleInput,
        updatedAt: new Date(),
        createdAt: new Date(),
        completed: false
      };
      
      await this.todoRepository.upsertTodo(todo);
      this.todoListRenderer.renderTodoList(await this.todoRepository.getAllTodosCached());
    });
  }
}


new Main();