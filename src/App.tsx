import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import { useRecoilState } from 'recoil';
import { isSidebarOpenState, loggedInUserState } from './state';
import { useEffect } from 'react';
import Sidebar from './components/sidebar';

const excludedPaths = ['login', 'register'];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedInUser] = useRecoilState(loggedInUserState);
  const [isSidebarOpen] = useRecoilState(isSidebarOpenState);

  useEffect(() => {
    if (loggedInUser == null && !excludedPaths.includes(location.pathname.substring(1))) {
      navigate('/login');
    }
  }, [])

  return (
    <div id='app'>
      <div className='bg'></div>
      { isSidebarOpen && <Sidebar /> }
      <Header />
      <Outlet />
    </div>
  )
}

export default App
