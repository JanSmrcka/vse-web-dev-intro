import { StorageManager } from './storage/storage.ts'
import { ITodo } from './types/todo.type.ts'



const todoStorage: StorageManager<any> = new StorageManager("TODOS");

// Event handlers
const initialize = () => {
  const todo: ITodo = {
    id: 1,
    title: "Sample Todo",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // Save a todo item
  todoStorage.setItem(todo.id.toString(), todo);
  console.log(todoStorage);
};

initialize();