import { RxHamburgerMenu } from "react-icons/rx";                
import { Link, useLocation } from 'react-router-dom';
import './index.css';
import { Avatar, Flex } from '@radix-ui/themes';

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
    const location = useLocation();
    
    const PulsepointLogo = () => (
        <img src={''} alt='pulsepoint-logo' />
    )

    const showLogoOnly = ['login', 'register', 'confirmappt', 'checkappt'].includes(location.pathname.substring(1));
    
    if (showLogoOnly) {
        return (
            <Flex id='header' align={'center'} justify={'between'}>
                <PulsepointLogo />
            </Flex>
        )
    }

    return (
        <Flex id='header' align={'center'} justify={'between'}>
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
                <Flex align={'center'} gap='1'>
                    <Avatar fallback={'L'} radius='full' />
                    Lee Xiao Ming
                </Flex>
                <RxHamburgerMenu size={'20'} />
            </Flex>
        </Flex>
    )
}

export default Header
