import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import { useRecoilState } from 'recoil';
import { loggedInUserState } from './state';
import { useEffect } from 'react';

const excludedPaths = ['login', 'register'];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedInUser] = useRecoilState(loggedInUserState);

  useEffect(() => {
    if (loggedInUser == null && !excludedPaths.includes(location.pathname.substring(1))) {
      navigate('/login');
    }
  }, [])

  return (
    <div id='app'>
      <div className='bg'></div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
