import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/header'

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/') {
    navigate('/login');
    return;
  }

  return (
    <div id='app'>
      <div className='bg'></div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
