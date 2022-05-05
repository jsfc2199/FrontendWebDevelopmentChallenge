function reducer(state, action) {

    switch (action.type) { 
        case 'get-todos':
            const stateWithAllTheTodos = {
                ...state, 
                listOfTodos: action.payload
            }
            return stateWithAllTheTodos

        case 'add-category':
            const newGame = action.payload
            const listStateWithNewGame=[...state.listOfTodos, newGame]
            const stateWithNewGameAdded={
                ...state, listOfTodos: listStateWithNewGame
            }
            return stateWithNewGameAdded

        case 'remove-todo':
            const newlistOfNotesWithOutPayloadGame =
                state.listOfTodos.filter(todo => todo.id !== action.payload.id)
            const newStateWithoutNoteDeleted = { ...state, listOfTodos: newlistOfNotesWithOutPayloadGame }
            return newStateWithoutNoteDeleted

        case 'update-note':
            return state
    }
}

export default reducer;