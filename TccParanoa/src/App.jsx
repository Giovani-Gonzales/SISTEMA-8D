import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dashboard/>
    </>
  )
}

export default App
