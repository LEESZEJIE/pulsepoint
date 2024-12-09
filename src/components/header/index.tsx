import { RxHamburgerMenu } from "react-icons/rx";                
import { Link, useLocation } from 'react-router-dom';
import './index.css';
import { Avatar, Flex, Text } from '@radix-ui/themes';
import { useRecoilState } from "recoil";
import { isSidebarOpenState, loggedInUserState } from "../../state";

const links = [
  {
    label: 'Home',
    path: '/home',
  },
  {
    label: 'Our Doctors',
    path: '/doctors',
  },
  {
    label: 'Appointment',
    path: '/appointment',
  },
]

const Header = () => {
  const [, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const [loggedInUser] = useRecoilState(loggedInUserState);
  const location = useLocation();

  const PulsepointLogo = () => (
    <Link to={loggedInUser == null ? '#' : '/home'}>
      <img style={{ height: '100px' }} src={'/images/pulsepoint-logo.png'} alt='pulsepoint-logo' />
    </Link>
  )

  const showLogoOnly = ['login', 'register', 'confirm-appointment'].includes(location.pathname.substring(1));

  if (showLogoOnly) {
    return (
      <Flex id='header' align={'center'} justify={'between'}>
        <PulsepointLogo />
      </Flex>
    )
  }

  return (
    <Flex id='header' align={'center'} justify={'between'} py='5'>
      <Flex align={'center'} gap={'5'}>
        <PulsepointLogo />
        <div className='links'>
          {
            links.map(link => {
              return <Link key={link.path} to={link.path}>{link.label}</Link>
            })
          }
        </div>
      </Flex>
      <Flex align={'center'} gap={'5'}>
        <Link to={loggedInUser == null ? '/login' : '/user-details'} style={{ textDecoration: 'none', color: 'unset' }}>
          <Flex align={'center'} gap='1'>
            <Avatar fallback={loggedInUser?.fullname[0].toUpperCase() ?? ''} radius='full' src={loggedInUser == null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREh8TIFWYXVR4v4TeSVn20PTQ5WNaF5IteeQ&s' : ''} />
            <Text as="p" m="0" style={{ userSelect: 'none' }}>{loggedInUser?.fullname ?? 'Guest'}</Text>
          </Flex>
        </Link>
        <RxHamburgerMenu size={'20'} style={{ cursor: 'pointer' }} onClick={() => setIsSidebarOpen(true)} />
      </Flex>
    </Flex>
  )
}

export default Header
