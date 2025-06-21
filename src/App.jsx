import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuestionForm from './components/QuestionForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1 className='text-7xl'>Vite + React</h1>
      <div className='min-h-screen bg-gray-100 p-4'>
        <QuestionForm></QuestionForm>
      </div>
     
    </>
  )
}

export default App
