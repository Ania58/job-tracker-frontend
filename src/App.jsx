import { useState } from 'react'
import Footer from './components/layout/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
        </p>
      </div>
      <p className="read-the-docs">
      </p>
      <Footer />
    </>
  )
}

export default App
