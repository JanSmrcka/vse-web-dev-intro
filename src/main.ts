import { createTodoStore } from "./store/todoStore";
import { TodoList } from "./components/TodoList";

// Initialize components
const todoList = new TodoList(null);
const todoStore = createTodoStore(() => todoList.render());
todoList.setStore(todoStore);

// Initialize form handling
const todoForm = document.getElementById("todo-form") as HTMLFormElement;

function handleTodoFormSubmit(e: Event) {
  e.preventDefault();
  const formData = new FormData(todoForm);
  const todoText = formData.get("todo-text") as string;

  todoStore
    .add(todoText)
    .then(() => {
      todoForm.reset();
    })
    .catch((error) => {
      console.error("Failed to add todo:", error);
      // Here you could add error handling UI feedback
    });
}

todoForm.addEventListener("submit", handleTodoFormSubmit);
