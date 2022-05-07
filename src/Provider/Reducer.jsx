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

            //brings the category where the task belongs withpout delete it
            const newListOfCategoriesWithoutTasks = state.listOfTodos.find(todo => todo.id === action.payload.fkTodoId)

            //brings the category where the task belongs but deleting the task
            const temporalStateBetweenCategoryAndTask = {
                ...newListOfCategoriesWithoutTasks, listOfTasks: newListOfCategoriesWithoutTasks.listOfTasks.filter(
                    task => task.id !== action.payload.id)
            }

            //brings all the categories that are going to be render with the task deleted from the specific category
            const allTodosUpdatedWithoutTask = state.listOfTodos.map(todo => todo.id !== action.payload.fkTodoId ? todo : temporalStateBetweenCategoryAndTask)

            //Update the state with all categories deleting the task that we delete
            const newStateWithoutTaskDeleted = { ...state, listOfTodos: allTodosUpdatedWithoutTask }

            return newStateWithoutTaskDeleted

        case 'update-task':
            //brings the category where the checkbox belongs without update it
            const newListOfCategoriesWithTaskUpdated = state.listOfTodos.find(todo => todo.id === action.payload.fkTodoId)

            //brings the category where the checkbox belongs updating it
            const temporalStateBetweenCheckAndUncheck = {
                ...newListOfCategoriesWithTaskUpdated, listOfTasks: newListOfCategoriesWithTaskUpdated.listOfTasks.map(
                    task => {
                        if (task.id === action.payload.id) {
                            return action.payload
                        }
                        return task
                    })
            }

            //bring the whole categories with the categories where is the checkobx updated
            const todoUpdatedWithCheckbox = state.listOfTodos.map(
                todo => todo.id !== action.payload.fkTodoId ? todo : temporalStateBetweenCheckAndUncheck)

            //Updates the state with the updated information
            const stateWithCheckBoxUpdated = { ...state, listOfTodos: todoUpdatedWithCheckbox }

            return stateWithCheckBoxUpdated

        case 'add-task':

            const newCategoryWithTask = action.payload
            const newListOfCategoriesWithTasks = state.listOfTodos.map(todo => todo.id !== action.payload.id ? todo : newCategoryWithTask)
            const stateWithNewTaskAddedInCategory = {
                ...state, listOfTodos: newListOfCategoriesWithTasks
            }

            return stateWithNewTaskAddedInCategory

        case 'taskNameUpdated':
            //brings the category where the task belongs without name updated
            const newListOfCategoriesWithNewNameTask = state.listOfTodos.find(todo => todo.id === action.payload.fkTodoId)

            //brings the category where the task belongs but updating the task
            const temporalStateBetweenWithUpdatedCtASK = {
                ...newListOfCategoriesWithNewNameTask, listOfTasks: newListOfCategoriesWithNewNameTask.listOfTasks.map(
                    task => task.id !== action.payload.id ? task : action.payload)
            }

            //brings all the categories that are going to be render with the task that was updated
            const allCategoriesUpdatedTask = state.listOfTodos.map(todo => todo.id !== action.payload.fkTodoId ? todo : temporalStateBetweenWithUpdatedCtASK)

            //Update the state with all categories and with the name updated
            const newStateTaskUpdated = { ...state, listOfTodos: allCategoriesUpdatedTask }

            return newStateTaskUpdated
    }

}

export default reducer;