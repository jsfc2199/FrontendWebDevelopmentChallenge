import React, { useContext, useState, useRef } from 'react'
import { Store } from '../Provider/StoreProvider'

const AddTask = ({todo}) => {
  const fkId = todo.id

  const [newTask, setTask] = useState('')  

  const addTask = (e) => {
    setTask(e.target.value)
  }

  const onAddTask = async (event) =>{
    event.preventDefault();
    if(newTask){
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

    }else {
      alert('Please fill the add task field for create a new task')
    }
  }


  const formRef = useRef(null) 
  const { state, dispatch } = useContext(Store)

  return (
    <td>
      <form ref = {formRef} onSubmit={onAddTask}>
      <input className='filtergames' type='text' placeholder='Add task' onChange={addTask} />
      <button className="btn" > Add Task </button>      
      </form>
    </td>

  )
}

export default AddTask
