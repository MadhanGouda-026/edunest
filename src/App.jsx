import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Calculator from './pages/Calculator'
import Admin from './pages/Admin'

function App() {
  const [tab, setTab] = useState('home')

  return (
    <div>
      <Navbar tab={tab} setTab={setTab} />
      {tab === 'home' && <Home setTab={setTab} />}
      {tab === 'notes' && <Notes />}
      {tab === 'calc' && <Calculator />}
      {tab === 'admin' && <Admin />}
    </div>
  )
}

export default App