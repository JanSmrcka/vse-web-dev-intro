import { Todo } from "../types"
import { todoService} from "../api/todos"
class TodoList {
    todos: Todo[] = []
    
    todoListElement

    isLoading: boolean = false

    constructor(elementID: string){
        this.todoListElement = document.getElementById(elementID) as HTMLUListElement
        this.loadTodos()
    }
    
    private async loadTodos(){
        try {
            this.isLoading = true
            this.render()
            const newTodos = await todoService.fetchTodos()
            this.isLoading = false
            this.todos = newTodos
            this.render()
        }
        catch(error){
            console.error(error)
        } finally {
            this.isLoading = false
            this.render()
        }

    }

    async addTodo(todoValue: string){
        try {
            this.isLoading = true
            this.render()
            const newTodo = await todoService.createTodo(todoValue)
            this.isLoading = false
            this.todos.push(newTodo)
            this.render()
        }
        catch(error){
            console.error(error) 
        } finally {
            this.isLoading = false
            this.render()
        }
    }

    async removeTodo(id: string){
        try {
            this.isLoading = true
            this.render()
            const deleteTodo = await todoService.removeTodo(id)
            console.log(deleteTodo)
            this.todos =  this.todos.filter((todo)=>(todo.id !== id))
            //this.loadTodos()
            this.isLoading = false
            this.render()
        } catch (error) {
            console.error(error)
        } finally {
            this.isLoading = false
            this.render()
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
    } finally {
        this.isLoading = false
        this.render()
    }
    }

    render(){
        this.todoListElement.innerHTML = ''

        if(this.isLoading === true && this.todos.length === 0){
            this.todoListElement.appendChild(createLoadingSpinner())
        }

        if (this.isLoading){
            this.todoListElement.classList.add('isLoading')
        }
        if (!this.isLoading){
            this.todoListElement.classList.remove('isLoading')
        }
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

function createLoadingSpinner() {
    const container = document.createElement("div")
    const spinner = document.createElement("div")
    container.className = "loading-container"
    spinner.className = "loading-spinner"
    container.appendChild(spinner)
    return container
}

export const todoList = new TodoList("todo-list")