function reducer(state, action) {

    switch (action.type) {
        case 'get-todos':
            const stateWithAllTheTodos = {
                ...state,
                listOfTodos: action.payload
            }
            return stateWithAllTheTodos

        case 'add-category':
            const newCategory = action.payload
            const listStateWithNewCategory = [...state.listOfTodos, newCategory]
            const stateWithNewCategoryAdded = {
                ...state, listOfTodos: listStateWithNewCategory
            }
            return stateWithNewCategoryAdded

        case 'remove-todo':
            const newListOfCategoriesWithoutTODO =
                state.listOfTodos.filter(todo => todo.id !== action.payload.id)
            const newStateWithoutCategoryDeleted = { ...state, listOfTodos: newListOfCategoriesWithoutTODO }
            return newStateWithoutCategoryDeleted

        case 'remove-task':
            const taskToBeDeleted = action.payload
            const newTasks = state

            return state

        case 'update-note':
            return state

        case 'add-task':
            const newCategoryWithTask = action.payload   
            
            const newListOfCategoriesWithTasks = state.listOfTodos.map(todo =>todo.id !== action.payload.id ? todo : newCategoryWithTask)
            
            const stateWithNewTaskAddedInCategory = {
                ...state, listOfTodos: newListOfCategoriesWithTasks
            }

            return stateWithNewTaskAddedInCategory
    }
}

export default reducer;