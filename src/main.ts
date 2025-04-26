import todoStore from './store/todo-store';

// Initialize the application
async function initializeApp() {
  await todoStore.initialize();
}

initializeApp();

const form = document.getElementById('todo-form') as HTMLFormElement;

async function handleTodoFormSubmit(event: Event) {
  event.preventDefault();
  const formData = new FormData(form);
  const newTodoText = formData.get('todo-text') as string;
  await todoStore.addTodo(newTodoText);
  form.reset();
}

form.addEventListener('submit', handleTodoFormSubmit);
