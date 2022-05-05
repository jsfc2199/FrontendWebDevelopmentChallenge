import { useState } from 'react'
import StoreProvider from './Provider/StoreProvider'
import './App.css'
import ListOfTodos from './components/ListOfTodos'

function App() {


  return (
    <StoreProvider>
      <h1>Store</h1>

      <ListOfTodos/>
    </StoreProvider>
  )
}

export default App
