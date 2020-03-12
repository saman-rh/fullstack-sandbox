import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import { TextField } from '../../shared/FormFields'

var timeoutId

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

async function updateToDoStatus(listId, todoId, status) {
  try {
     await fetch('http://localhost:3001/api/setToDoStatus', {
      headers: {'Content-Type':'application/json'},
      method: 'POST',
      body: JSON.stringify({
        'status': status,
        'listId': listId,
        'todoId': todoId
      })
    })
  } catch (err) {
    console.log(err)
  }
}

async function addToDo(listId) {
  try {
    var resp = await fetch('http://localhost:3001/api/addToDo', {
      headers: {'Content-Type':'application/json'},
      method: 'POST',
      body: JSON.stringify({
        'listId': listId
      })
    })
    var data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

async function deleteToDo(listId, todoId) {
  try {
    var resp = await fetch('http://localhost:3001/api/removeToDo', {
      headers: {'Content-Type':'application/json'},
      method: 'POST',
      body: JSON.stringify({
        'listId': listId,
        'todoId': todoId
      })
    })
    var data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}


async function updateToDoName(listId, todoId, name) {
  try {
    var resp = await fetch('http://localhost:3001/api/setToDoName', {
      headers: {'Content-Type':'application/json'},
      method: 'POST',
      body: JSON.stringify({
        'listId': listId,
        'todoId': todoId,
        'name': name
      })
    })
    var data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}


export const ToDoListForm = ({ toDoList, saveToDoList, updateListStatus }) => {
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)
  const handleSubmit = event => {
    event.preventDefault()
    saveToDoList(toDoList.id, { todos })
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6' color = {todo.isCompleted === true ? 'secondary' : 'primary'}>
                {index + 1}
              </Typography>
              <TextField
                label= {`What to do?`}
                value={todo.name}
                onChange={event => {
                  if (timeoutId) {
                    clearTimeout(timeoutId)
                  }
                  todo.name = event.target.value
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    todo,
                    ...todos.slice(index + 1)
                  ])
                  timeoutId = setTimeout(() => {
                    updateToDoName(toDoList.id, todo.id, todo.name)
                  }, 300)
                }}
                className={classes.textField}
              />
              <Button
                size='small'
                color='primary'
                className={classes.standardSpace}
                onClick={() => {
                  todo.isCompleted = !todo.isCompleted
                  updateToDoStatus(toDoList.id, todo.id, todo.isCompleted).then(updateListStatus())
                  setTodos([...todos.slice(0, todos.length)])
                }
              }
              >
                <DoneIcon />
              </Button>
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  deleteToDo(toDoList.id, todo.id)
                  setTodos([ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                (async () => {
                  const newTodo = await addToDo(toDoList.id)
                  setTodos([...todos, newTodo])
                })()
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
