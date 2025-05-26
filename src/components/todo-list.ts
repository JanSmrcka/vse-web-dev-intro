import { Todo } from "../types"
import { todoService} from "../api/todos"
class TodoList {
    todos: Todo[] = []
    
    todoListElement

    constructor(elementID: string){
        this.todoListElement = document.getElementById(elementID) as HTMLUListElement
        this.loadTodos()
    }
    
    async loadTodos(){
        try {
            const newTodos = await todoService.fetchTodos()
            this.todos = newTodos
            this.render()
        }
        catch(error){
            console.error(error)
        }

    }

    async addTodo(todoValue: string){
        try {
            const newTodo = await todoService.createTodo(todoValue)
            this.todos.push(newTodo)
            this.render()
        }
        catch(error){
            console.error(error) 
        }
    }

    async removeTodo(id: string){
        try {
        const deleteTodo = await todoService.removeTodo(id)
        console.log(deleteTodo)
        this.todos =  this.todos.filter((todo)=>(todo.id !== id))
        this.loadTodos()
        } catch (error) {
            console.error(error)
        }
    }

    async toggle(id:string, completed: boolean){
        try {
        const toggleTodo = await todoService.toggle(id, completed)
        this.todos = this.todos.map((todo)=>{
            if (todo.id === id){
                return {...todo, completed: !todo.completed}
            }
            return todo
        })
        console.log(toggleTodo)
        this.loadTodos()
    } catch (error){
        console.error(error)
    }
    }

    render(){
        this.todoListElement.innerHTML = ''

        this.todos.forEach((item)=>{
            const todoItemElement = document.createElement("li")
            const todoSpanElement = document.createElement("span")
            todoSpanElement.innerHTML = item.text
            
            if (item.completed) {
                todoItemElement.classList.add("completed")
            }
    
            todoItemElement.addEventListener("click", ()=>{
                this.toggle(item.id, item.completed)
            })
            
            const deleteButton = document.createElement("button")
            deleteButton.innerHTML = "Delete"
    
            deleteButton.addEventListener("click", ()=>{
                this.removeTodo(item.id)
            })
    
            todoItemElement.appendChild(todoSpanElement)
            todoItemElement.appendChild(deleteButton)
            this.todoListElement?.appendChild(todoItemElement)
        })
    }
}

export const todoList = new TodoList("todo-list")