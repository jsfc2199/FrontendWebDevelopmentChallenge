import { useState } from 'react'
import StoreProvider from './Provider/StoreProvider'
import './App.css'
import ListOfTodos from './components/ListOfTodos'
import Category from './components/Category'

function App() {


  return (
    <div>
    <StoreProvider>
      <Category/>
      <ListOfTodos/>
    </StoreProvider>
    </div>
  )
}

export default App
