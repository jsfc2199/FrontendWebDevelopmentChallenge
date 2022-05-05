import React, { useContext, useEffect } from 'react'
import { Store } from '../Provider/StoreProvider'

const ListOfToDo = () => {

    const { state, dispatch } = useContext(Store)

    useEffect(() => {

        let listOfTodos = fetchAllNotes().then(
            (notes) => {
                console.log(notes)

                let action = {
                    type: 'get-todos', 
                    payload: notes 
                }
                dispatch(action) 
            })
    }, [])


    const fetchAllNotes = async()=>{
        let response = await fetch(`http://localhost:8081/api/get/todos`) 
        let data = await response.json() 
        return data
    }

    return (
        <div>
            <h1>Actions pending to be done</h1>
            <ul>
                {
                    state.listOfTodos.map(todo => {

                        return <li key={todo.id}>
                            {todo.name} <br />

                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default ListOfToDo
