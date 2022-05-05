import React, { useContext, useEffect } from 'react'
import { Store } from '../Provider/StoreProvider'
import { FaTimes } from 'react-icons/fa'

const ListOfToDo = () => {

    const { state, dispatch } = useContext(Store)

    useEffect(() => {

        let listOfTodos = fetchAllNotes().then(
            (todos) => {
                let action = {
                    type: 'get-todos',
                    payload: todos
                }
                dispatch(action)
            })
    }, [])


    const fetchAllNotes = async () => {
        let response = await fetch(`http://localhost:8081/api/get/todos`)
        let data = await response.json()
        return data
    }


    //delete to-do
    const onDelete = async (todo) =>{

        let response = await fetch(`http://localhost:8081/api/delete/todo`,
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(todo)
        })

        let todoDeleted = await response
        
        if(todoDeleted.status===200){
 
            dispatch({
                type: 'remove-todo',
                payload: todo
            })
        }else{
            console.log("We couldn't delete the to-do")
        }
        
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
                                <td> <input className='filtergames' type='text' placeholder='Add task' /></td>
                                <td> <button className="btn"> Add Task </button></td>
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
                                        <td>{task.id}</td>
                                        <td>{task.todolistName}</td>
                                        <td className="inputStyler"><input type="checkbox" /></td>
                                        <td><FaTimes style={{ color: 'red', cursor: 'pointer' }} /></td>
                                        <td><button className="btn"> Edit </button></td>
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
