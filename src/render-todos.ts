import todoStore from './store/todo-store';

function createLoadingSpinner(): HTMLElement {
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  return spinner;
}

export function renderTodoList() {
  const todoList = todoStore.getTodos();
  const isLoading = todoStore.isLoading;
  const todoListElement = document.getElementById('todo-list') as HTMLUListElement;

  // Clear the list
  todoListElement.innerHTML = '';

  // Handle loading state
  if (isLoading && todoList.length !== 0) {
    todoListElement.classList.add('isLoading');
  } else {
    todoListElement.classList.remove('isLoading');
  }

  if (isLoading && todoList.length === 0) {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loading-container';
    loadingContainer.appendChild(createLoadingSpinner());
    todoListElement.appendChild(loadingContainer);
    return;
  }

  // Show empty state if needed
  if (todoList.length === 0 && !isLoading) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = 'No todos yet. Add one!';
    emptyMessage.className = 'empty-message';
    todoListElement.appendChild(emptyMessage);
    return;
  }

  // Render todos
  todoList.forEach((todo) => {
    const li = document.createElement('li');

    li.addEventListener('click', async () => {
      await todoStore.toggleTodo(todo.id);
    });

    if (todo.completed) {
      li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.textContent = todo.text;
    li.appendChild(span);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      todoStore.deleteTodo(todo.id);
    });

    li.appendChild(deleteButton);
    todoListElement.appendChild(li);
  });
}
