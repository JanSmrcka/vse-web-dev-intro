import { todoService } from "../api/todos"
import { Todo } from "../types"

class TodoList {
    todos: Todo[] = []
    todoListElement

    constructor(elementId: string){
        this.todoListElement = document.getElementById(elementId) as HTMLUListElement
        this.loadTodos()
    }

    async loadTodos() {
        try { //try catch clause for api error handling
        const newTodos = await todoService.fetchTodos()
        this.todos = newTodos
        this.render()
        } catch (error) {
            console.log(error)
        } 
    }
    
    async addTodo(todoValue: string) {
        try {
            const newTodo = await todoService.createTodo(todoValue)
            this.todos.push(newTodo)
            this.render()    
        } catch (error) {
            console.log(error)
        }
    }

    async removeTodo(id: number) {
        try {
            await todoService.deleteTodo(id)
            this.todos = this.todos.filter((todo) => todo.id !== id)
            this.render()
        } catch (error) {
            console.log(error)
        }
    }

    async toggle(id: number) {
        try {
            const todo = this.todos.find((todo) => id === todo.id)
            const newTodo = await todoService.toggleTodo(id, !todo?.completed)
            this. todos = this.todos.map((todo) => {
                if (todo.id === id) {
                    return newTodo
                }
                return todo
            })
            this.render()
        } catch (error) {
            console.log(error)
        }
    }
    
    render() {
        this.todoListElement.innerHTML = ''
        this.todos.forEach((item) => {
            // Generate elements
            const todoItemElement = document.createElement('li')
            const todoSpanElement = document.createElement('span')
            todoSpanElement.innerHTML = item.text

            // Complete todo
            if (item.completed) {
                todoItemElement.classList.add("completed")
            }
            todoItemElement.addEventListener("click", () => {
                this.toggle(item.id)
            })

            // Delete todo
            const deleteButton = document.createElement('button')
            deleteButton.innerHTML = "Delete"
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation()
                this.removeTodo(item.id)
            })

            // Append elements to genereated corpse
            todoItemElement.appendChild(todoSpanElement)
            todoItemElement.appendChild(deleteButton)
            this.todoListElement.appendChild(todoItemElement)
        })
    }
}

export const todoList = new TodoList("todo-list")