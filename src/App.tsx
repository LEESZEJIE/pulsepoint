import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import { useRecoilState } from 'recoil';
import { loggedInUserState } from './state';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const [loggedInUser] = useRecoilState(loggedInUserState);

  useEffect(() => {
    if (loggedInUser == null) {
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
