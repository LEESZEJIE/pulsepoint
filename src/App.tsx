import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/header'

function App() {
  return (
    <div id='app'>
      <div className='bg'></div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App