import React, { useContext, useEffect } from 'react'
import { Store } from '../Provider/StoreProvider'
import { FaTimes } from 'react-icons/fa'
import AddTask from './AddTask'

const ListOfToDo = () => {

    const { state, dispatch } = useContext(Store)

    useEffect(() => {

        let listOfTodos = fetchAllTodos().then(
            (todos) => {
                let action = {
                    type: 'get-todos',
                    payload: todos
                }
                dispatch(action)
            })
    }, [])


    const fetchAllTodos = async () => {
        let response = await fetch(`http://localhost:8081/api/get/todos`)
        let data = await response.json()
        return data
    }


    //delete to-do
    const onDelete = async (todo) => {

        let response = await fetch(`http://localhost:8081/api/delete/todo`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(todo)
            })

        let todoDeleted = await response

        if (todoDeleted.status === 200) {

            dispatch({
                type: 'remove-todo',
                payload: todo
            })
        } else {
            console.log("We couldn't delete the to-do")
        }
    }

    const onDeleteTask = async (task)=>{
        let response = await fetch(`http://localhost:8081/api/delete/task`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })

        let taskDeleted = await response
   
        if (taskDeleted.status === 200) {            
            dispatch({
                type: 'remove-task',
                payload: task
            })
        } else {
            console.log("We couldn't delete the to-do")
        }
    }


    const onCheckBox = async(event, task)=>{
        const checked = event.currentTarget.checked;
        let noteWithCheckBoxInfo = {...task, completed: checked}

        let taskUpdatedPromise = await fetch(`http://localhost:8081/api/update/task`,
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(noteWithCheckBoxInfo)
        })

        let taskUpdated = await taskUpdatedPromise.json()

        dispatch({
            type: 'update-task',
            payload: taskUpdated
        })
    }

    return (
        <div >
            <h1>To-Do List Track</h1>
            <table className="justTable">
                {
                    state.listOfTodos.map(todo => {

                        return <tbody className="justBody" key={todo.id} >
                            <tr >
                                <td> <h3>{todo.name}</h3></td>
                                <td> <h3>{todo.id}</h3></td>
                                <AddTask todo={todo} key={todo.id}/>
                                <td> <button className="btn" onClick={() => onDelete(todo)}> Delete TO-DO </button></td>
                            </tr>
                            <tr className="justTableHead">
                                <td>Id</td>
                                <td>Task</td>
                                <td>Completed</td>
                                <td>Delete</td>
                                <td>Edit</td>
                            </tr>
                            {
                                todo.listOfTasks.map(task => {
                                    return <tr key={task.id}>
                                        <td style={task.completed?{textDecoration:'line-through'}:{}}>{task.id}</td>
                                        <td style={task.completed?{textDecoration:'line-through'}:{}}>{task.todolistName}</td>
                                        <td className="inputStyler"><input type="checkbox" checked = {task.completed} onChange={(event) => onCheckBox(event, task)}/></td>
                                        <td><FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDeleteTask(task)}/></td>
                                        <td><button disabled = {task.completed}> Edit </button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    })
                }
            </table>
        </div>
    )
}

export default ListOfToDo
