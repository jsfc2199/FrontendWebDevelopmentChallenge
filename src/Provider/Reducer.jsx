function reducer(state, action) {

    switch (action.type) {
        //create the escenario get-notes
        case 'get-todos':
            //we grab the payload c
            const stateWithAllTheTodos = {
                ...state, //we get the previous state the we had
                listOfTodos: action.payload //replacing the listOfNotes for the one in the payload
                //which mean it is going to use the list the we get from the http request
            }
            return stateWithAllTheTodos

        case 'add-note':
            
            return state

        case 'remove-note':
            return state

        case 'update-note':
            return state
    }
}

export default reducer;