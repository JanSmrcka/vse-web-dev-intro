const form = document.getElementById('todo-form')! as HTMLFormElement;

let todos: Array<string> = [];

const handleFormSubmit = (e: Event) => {
  e.preventDefault()
  const formData = new FormData(form);
  const todoValue = formData.get('todo-text') as string;
  todos = [...todos, todoValue]
  renderTodos()
}

form?.addEventListener('submit', handleFormSubmit)

const renderTodos = () => {
  const todoListElem = document.getElementById('todo-list') as HTMLUListElement;
  todoListElem.innerHTML = '';

  todos.forEach((value, index) => {
    const todoItemElem = document.createElement('li')
    const todoSpanElem = document.createElement('span')
    todoSpanElem.innerHTML = value
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'delete'

    todoItemElem.appendChild(todoSpanElem)
    todoItemElem.appendChild(deleteBtn)
    todoListElem?.appendChild(todoItemElem)
  });
}