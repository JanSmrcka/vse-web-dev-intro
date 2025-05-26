import { Todo } from '../types/todo.type.ts'
import { CacheManager } from '../cache/cache.ts'
import { CacheEnum, getCacheKey } from '../helpers/cacheHelpers.ts'
import { TodosService } from '../services/todos.service.ts'

/**
 * Class used for handling todo operations.
 * @author Adam Mrózek
 */
export class TodoRepository {
  private readonly cache: CacheManager;
  
  constructor() {
    this.cache = new CacheManager();
  }
  
  /**
   * Adds a new todo item to the state.
   * @param todo The todo item to add.
   */
  public async upsertTodo(todo: Todo): Promise<void> {
    if (!todo.id) {
      await TodosService.createTodo(todo);
      this.cache.invalidate(getCacheKey(CacheEnum.Todo));
    } else {
      
      // If the todo has an ID, we update it.
      const existingTodo = await this.cache.get(
        getCacheKey(CacheEnum.Todo, todo.id),
        async () => await this.getTodoById(todo.id as number)
      );
      
      if (existingTodo) {
        // Update the existing todo
        existingTodo.title = todo.text;
        existingTodo.completed = todo.completed;
        existingTodo.updatedAt = new Date();

        // Not sure if I should invalidate the entire cache or just the specific todo item.. since it will result in partial source of truth.
        this.cache.invalidate(getCacheKey(CacheEnum.Todo, todo.id));
      } else {
        throw new Error(`Todo with ID "${todo.id}" does not exist.`);
      }
    }
    
    console.log(`Todo with ID "${todo.id ?? 'NEW'}" has been upserted.`);
  }
  
  /**
   * Retrieves a todo item by its ID.
   * @param id The ID of the todo item to retrieve.
   * @returns The todo item if found, otherwise undefined.
   */
  public async getTodoByIdCached(id: number): Promise<Todo | null> {
    return await this.cache.get(
      getCacheKey(CacheEnum.Todo, id),
      async () => await this.getTodoById(id)
    );
  }

  /**
   * Get all todos.
   * @returns An array of all todo items.
   */
   public async getAllTodosCached(): Promise<Todo[]> {
      return await this.cache.get(
        getCacheKey(CacheEnum.Todo), 
        async () => await this.getAllTodos()
      );
   }
  
  private async getTodoById(id: number): Promise<Todo | null> {
     const response = await TodosService.getById(id);
     return response.data;
  }
   
  private async getAllTodos(): Promise<Todo[] | null> {
    const response = await TodosService.fetchTodos();
    return response.data as Todo[];
  }
}