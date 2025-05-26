import 'reflect-metadata';
import { TodoListRenderer } from './renderers/todoList.renderer.ts'
import { container } from 'tsyringe';
import { TodoRepository } from './repositories/todo.repository.ts'

class Main {
  private readonly todoListRenderer: TodoListRenderer;
  
  constructor() {
    this.registerDependencies();
    
    // Resolve the TodoListRenderer from the container
    this.todoListRenderer = container.resolve<TodoListRenderer>('TodoListRenderer');
    this.initialize();
  }
  
  private initialize(){
    console.log('Main class initialization logic');
    this.todoListRenderer.renderTodoList();
  }
  
  private registerDependencies() {
    container.register('TodoRepository', { useClass: TodoRepository });
    container.register('TodoListRenderer', {
      useFactory: (c) => new TodoListRenderer(c.resolve('TodoRepository')),
    });
  }
}


new Main();