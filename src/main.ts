import { todoList } from "./components/TodoList";

const form = document.getElementById('todo-form')! as HTMLFormElement;

const handleFormSubmit = (e: Event) => {
    e.preventDefault()

    const formData = new FormData(form);
    todoList.addTodo(formData.get('todo-text') as string)

    form.reset();
}

form?.addEventListener('submit', handleFormSubmit)