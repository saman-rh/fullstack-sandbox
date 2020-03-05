const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const publicPath = path.join(__dirname, '..', '..', 'client', 'dist')
app.use(cors())
app.use(express.static(publicPath))

const PORT = 3001

const todolist = require('./controllers/todolist.controller.js')
app.use('/api', todolist.router)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))