import React, { useContext, useState, useRef } from 'react'
import { Store } from '../Provider/StoreProvider'

const AddTask = ({ todo, update, setUpdated, taskObject }) => {
  const fkId = todo.id

  const [newTask, setTask] = useState('')  

  const addTask = (e) => {
    setTask(e.target.value)
  }

  const onAddTask = async (event) => {
    event.preventDefault();
    if (newTask) {
      const taskForm = {
        todolistName: newTask,
        isCompleted: false,
        fkTodoId: fkId,
      }

      let taskInPromise = await fetch(`http://localhost:8081/api/create/task`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(taskForm)
        })


      let taskToSave = await taskInPromise.json()

      dispatch({
        type: 'add-task',
        payload: taskToSave
      })
      formRef.current.reset()
      setTask('')

    } else {
      alert('Please fill the add task field for create a new task')
    }
  }

  const [newUpdatedTask, setUptatedstaks] = useState(taskObject.todolistName)

  const addUpdateTask = (e) => {  
    setUptatedstaks(e.target.value)
  }

  const onUpdateTask = async (event) => {
    event.preventDefault();

    const taskFormUpdated = {
      id: taskObject.id,
      todolistName: newUpdatedTask,
      isCompleted: taskObject.completed,
      fkTodoId: taskObject.fkTodoId,
    }
      
    let taskInPromiseUpdated = await fetch(`http://localhost:8081/api/update/task`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(taskFormUpdated)        
      })

    let taskToSaveUpdated = await taskInPromiseUpdated.json()

    dispatch({
      type: 'taskNameUpdated',
      payload: taskToSaveUpdated
    })
    formRef.current.reset()
    setUpdated(false)
  }

  const formRef = useRef(null)
  const { state, dispatch } = useContext(Store)

  return (
    <td>
      <form ref={formRef} onSubmit={update && taskObject.fkTodoId == todo.id ? onUpdateTask : onAddTask}>
        <input id="textChanged" onChange={update&& taskObject.fkTodoId == todo.id ? addUpdateTask : addTask} className='filtergames' type='text' placeholder='Add task' />
        <button className="btn" style={update && taskObject.fkTodoId == todo.id?{backgroundColor:'red'}:{}}> {update && taskObject.fkTodoId == todo.id ? 'Update' : 'Add task'}</button>
      </form>
    </td>

  )
}

export default AddTask

