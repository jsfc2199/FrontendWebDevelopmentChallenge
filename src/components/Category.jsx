import React, { useContext, useState } from 'react'
import { Store } from '../Provider/StoreProvider'


const Category = () => {

  const [newCategory, setCategory] = useState('')

  const addCategory = (e) => {
    setCategory(e.target.value)    
  }

  const onAdd = async (event) => {
    event.preventDefault();
    if (newCategory) {
      const categoryForm = {
        name: newCategory,
        listOfTasks: [],
      }

      let categoryInPromise = await fetch(`http://localhost:8081/api/create/post`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(categoryForm)
        })

      let categoryToSave = await categoryInPromise.json()

      dispatch({
        type: 'add-category',
        payload: categoryToSave
      })

      form.reset()
    } else {
      alert('Please fill the add category camp for create new categories')
    }
  }



  const { state, dispatch } = useContext(Store)

  return (
    <form className='add-form' onSubmit={onAdd} id="form">
      <div>
        <h2>Add new categories</h2>
        <input className='filtergames' type='text' placeholder='Add category' onChange={addCategory} />
        <button className="btn"> Add Category </button>
      </div>
    </form>

  )
}

export default Category
