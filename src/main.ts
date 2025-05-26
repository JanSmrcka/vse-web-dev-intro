import { ITodo } from './types/todo.type.ts'
import { TodoRepository } from './repositories/todo.repository.ts'


const todoHelper: TodoRepository = new TodoRepository();

// Event handlers
const initialize = () => {
  // Initialize the application
  console.log('Application initialized');

  // Example of creating a new todo item
  const newTodo: ITodo = {
    id: null,
    title: 'Learn TypeScript',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Here you would typically call a method to add the todo to your state management system
  // For example: todoHelper.upsertTodo(newTodo);
  todoHelper.upsertTodo(newTodo);
  todoHelper.getAllTodos();
};

initialize();