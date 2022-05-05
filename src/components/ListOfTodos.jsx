import React, { useContext, useEffect } from 'react'
import { Store } from '../Provider/StoreProvider'

const ListOfToDo = () => {

    const { state, dispatch } = useContext(Store)

    useEffect(() => {

        let listOfTodos = fetchAllNotes().then(
            (todos) => {
                //console.log(todos)
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

    return (
        <div>
            <h1>To-Do List Track</h1>
            <table className="justTable">
                {
                    state.listOfTodos.map(todo => {

                        return <tbody className="justBody" key={todo.id} >
                            <tr >
                                <td>{todo.name}</td>
                            </tr>
                            <tr >
                                <td>Id</td>
                                <td>Task</td>
                                <td>Completed</td>
                            </tr>
                            {
                                todo.listOfTasks.map(task => {
                                    return <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.todolistName}</td>
                                        <td className="inputStyler"><input type="checkbox"/></td>
                                        <td><button className="btn"> Delete </button></td>
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
