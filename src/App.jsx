import { useState } from 'react'
import StoreProvider from './Provider/StoreProvider'
import './App.css'
import ListOfTodos from './components/ListOfTodos'

function App() {


  return (
    <div>
    <StoreProvider>
      <ListOfTodos/>
    </StoreProvider>
    </div>
  )
}

export default App
