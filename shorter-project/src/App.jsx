import './App.css'
import Shorter from './components/Shorter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Shorter/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
