const ToDoList = require('./models/todolist.js')
const ToDo = require('./models/todo.js')
const uuid = require('uuid')

// Todolists
const todolists = {}

// Dummy data
const list1 = new ToDoList(123, 'First To Do List')
const list2 = new ToDoList(222, 'Second To Do List')
todolists[list1.id] = list1
todolists[list2.id] = list2

todolists[123].addToDo(new ToDo(123, 'ToDo1'))
todolists[123].addToDo(new ToDo(124, 'ToDo2'))
todolists[123].addToDo(new ToDo(125, 'ToDo3'))

todolists[222].addToDo(new ToDo(223, 'ToDo23'))
todolists[222].addToDo(new ToDo(224, 'ToDo24'))
todolists[222].addToDo(new ToDo(225, 'ToDo25'))


// Adds a new todoList 
exports.addToDoList = (id, name) => {
    todolists[id] = new ToDoList(id, name)
}
// Adds a todo to a list
exports.addToDo = (toListId) => {
    const newToDoId = uuid.v4()
    const newToDo = new ToDo(newToDoId)
    todolists[toListId].addToDo(newToDo)
    console.log(`New ToDo added with id: ${newToDoId}`)
    return newToDo.toJson()
}

// Removes a todo
exports.removeToDo = (listId, todoId) => {
    const indexOfTodo = getTodoIndex(listId, todoId)
    todolists[listId].todos.splice(indexOfTodo, 1)
}

// Returns the list specified by id given in the argument
exports.getList = (id) => {
    return todolists[id]
}

// Returns all lists
exports.getLists = todolists

// Sets todo completed status
exports.setToDoCompletedStatus = (listId, id, status) => {
    const indexOfTodo = getTodoIndex(listId, id)
    console.log(`Updating TODO with status ${status}`)
    todolists[`${listId}`].todos[indexOfTodo].isCompleted = status
    todolists[`${listId}`].upDateIsCompleted()
}

// Sets todo name
exports.setToDoName = (listId, todoId, name) => {
    const indexOfTodo = getTodoIndex(listId, todoId)
    console.log(`Changing name of TODO with ID ${todoId} TO ${name}`)
    todolists[listId].todos[indexOfTodo].name = name
}

// Returns the index of a todo with id specified in the argument
function getTodoIndex(listId, todoId) {
    let returnIndex = 0
    todolists[listId].todos.map((todo, index) => {
        if (`${todo.id}` === `${todoId}`) {
            returnIndex = index
        }
    })
    return returnIndex
}