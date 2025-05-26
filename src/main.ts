const form = document.getElementById('todo-form')! as HTMLFormElement;

type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
}

let todos: Array<Todo> = [];

const handleFormSubmit = (e: Event) => {
  e.preventDefault()

  const formData = new FormData(form);
  const todo: Todo = {
    id: crypto.randomUUID(),
    text: formData.get('todo-text') as string,
    isCompleted: false,
  }
  todos.push(todo);
  renderTodos()
}

form?.addEventListener('submit', handleFormSubmit)

const renderTodos = () => {
  const todoListElem = document.getElementById('todo-list') as HTMLUListElement;
  todoListElem.innerHTML = '';

  todos.forEach((value, index) => {
    const todoItemElem = document.createElement('li')
    const todoSpanElem = document.createElement('span')
    todoSpanElem.innerHTML = value.text

    if (value.isCompleted) todoItemElem.classList.add('completed')

    todoItemElem.addEventListener('click', () => {
      todos = todos.map((savedTodo): Todo =>
        savedTodo.id === value.id
          ? { ...savedTodo, isCompleted: !savedTodo.isCompleted }
          : savedTodo)
      renderTodos();
    })

    // Delete Button
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'delete'
    deleteBtn.addEventListener('click', () => {
      todos = todos.filter((savedTodo) => savedTodo.id !== value.id)
      renderTodos();
    })

    todoItemElem.appendChild(todoSpanElem)
    todoItemElem.appendChild(deleteBtn)
    todoListElem?.appendChild(todoItemElem)
  });
}