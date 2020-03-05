// Controller for todolist. Handles requests to routes relevant for todolist
const express = require('express')
const model = require('../model.js')

const router = express.Router()

// Returns all todolists
router.get('/todolists', (req, res) => {

    console.log(model.getLists)
    res.status(200).json(model.getLists)
})
// Sets the status of a todo to true or false
router.post('/setToDoStatus', (req, res) => {
    const {listId} = req.body
    const {todoId} = req.body
    const {status} = req.body
    model.setToDoCompletedStatus(listId, todoId, status)
    res.status(200).json({'status':model.getLists[listId].isCompleted})
})
// Adds a new todo to the todo with the todo id specified in the body
router.post('/addToDo', (req, res) => {
    const {listId} = req.body
    const newToDoId = model.addToDo(listId)
    res.status(200).json(newToDoId)
})

// Removes a todo with the todo id specified in the body
router.post('/removeToDo', (req, res) => {
    const {listId} = req.body
    const {todoId} = req.body
    model.removeToDo(listId, todoId)
    res.status(200)
})

// Updates the name of a todo. id, name and listid in the body.
router.post('/setToDoName', (req, res) => {
    console.log('UPDATING NAME')
    const {listId} = req.body
    const {todoId} = req.body
    const {name} = req.body
    model.setToDoName(listId, todoId, name)
    res.status(200)
})

module.exports = {router}