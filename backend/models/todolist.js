class ToDoList {
    constructor(id, name = '') {
        this.title = name
        this.id = id
        this.todos = []
        this.isCompleted = false
    }

    // Pushes a new todo to @todos
    addToDo(todo) {
        this.todos.push(todo)
    }

    // Sets @isCompleted to true if all todos in @todos are completed, otherwise false.
    upDateIsCompleted() {
        let returnCompleted = true
        if (this.todos.length === 0) {return false}
        this.todos.map((todo) => {
            if (todo.isCompleted === false) {
                returnCompleted = false
            }
        })
        if (returnCompleted === true) {
            this.isCompleted = true
        } else {
            this.isCompleted = false
        }
    }

}

module.exports = ToDoList