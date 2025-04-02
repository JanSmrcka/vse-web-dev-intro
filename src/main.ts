import todoState from "./state";

// Získání elementů ze stránky
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

// Funkce pro přidání nového úkolu
function handleTodoFormSubmit(e: Event) {
  e.preventDefault();

  // Získání textu z formuláře
  const formData = new FormData(todoForm);
  const todoText = formData.get("todo-text") as string;

  // Přidání úkolu do seznamu
  todoState.add(todoText);

  // Vyčištění formuláře
  todoForm.reset();

  // Aktualizace seznamu úkolů
  renderTodos();
}

// Přidání posluchače události na formulář
todoForm.addEventListener("submit", handleTodoFormSubmit);

// Funkce pro zobrazení všech úkolů
function renderTodos() {
  // Získání všech úkolů
  const todos = todoState.get();

  // Vyčištění seznamu
  todoList.innerHTML = "";

  // Vytvoření elementu pro každý úkol
  todos.forEach((todo) => {
    // Vytvoření položky seznamu
    const todoItem = document.createElement("li");
    todoItem.setAttribute("data-id", todo.id);

    // Přidání třídy pro dokončené úkoly
    if (todo.completed) {
      todoItem.classList.add("completed");
    }

    // Přidání události pro označení úkolu jako dokončeného
    todoItem.addEventListener("click", () => {
      todoState.complete(todo.id);
      renderTodos();
    });

    // Vytvoření textu úkolu
    const span = document.createElement("span");
    span.textContent = todo.text;

    // Vytvoření tlačítka pro smazání
    const button = document.createElement("button");
    button.textContent = "Smazat";

    // Přidání události pro smazání úkolu
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      todoState.remove(todo.id);
      renderTodos();
    });

    // Přidání textu a tlačítka do položky seznamu
    todoItem.appendChild(span);
    todoItem.appendChild(button);

    // Přidání položky do seznamu
    todoList.appendChild(todoItem);
  });
}

// Zobrazení úkolů při načtení stránky
renderTodos();
