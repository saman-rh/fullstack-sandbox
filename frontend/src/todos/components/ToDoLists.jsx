import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import Typography from '@material-ui/core/Typography'
import { ToDoListForm } from './ToDoListForm'

async function getTodos() {
  try {
    var resp = await fetch('http://localhost:3001/api/todolists')
    var data = await resp.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}


function getColor(isCompleted) {
  if (isCompleted) {
    return {style: {color: 'green'}}
  } else {
    return {style: {color: 'black'}}
  }
}

function displayDoneIcon(isDone) {
  if (isDone) {
    return <DoneAllIcon />
  }
  return <ReceiptIcon />
}


export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
      getTodos()
      .then(setToDoLists)
  }, [])

  if (!Object.keys(toDoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              {displayDoneIcon(toDoLists[key].isCompleted)}
            </ListItemIcon>
            <ListItemText primaryTypographyProps={getColor(toDoLists[key].isCompleted)} primary={toDoLists[key].title} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      toDoCompleted = {{}}
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, { todos }) => {
        const listToUpdate = toDoLists[id]
        setToDoLists({
          ...toDoLists,
          [id]: { ...listToUpdate, todos }
        })
      }}
      updateListStatus = {() => {
        getTodos()
        .then(setToDoLists)
      }}
    />}
  </Fragment>
}
