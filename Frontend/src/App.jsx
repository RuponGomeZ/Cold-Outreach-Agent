
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import InputForm from './forms/InputForm'
import Status from './pages/Status'

function App() {

  const [page, setPage] = useState('inputForm')

  return (
    <>
      <Navbar setPage={setPage} />
      {page === 'inputForm' ?
        <InputForm /> : <Status />
      }

    </>
  )
}

export default App
