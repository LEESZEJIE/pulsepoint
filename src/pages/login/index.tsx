import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const LoginPage = () => {
    const navigate = useNavigate();

    // state
    const [usernameText, setUsernameText] = useState('');
    const [passwordText, setPasswordText] = useState('');

    function handleLogin() {
        if ([usernameText, passwordText].includes('')) {
            alert('please fill in your username and password')
            return;
        }
        
        navigate('/home');
    }

    return (
        <Box id='login-page' className="page">
            <Flex direction='column' justify='center' align='center' width='20%' height='100vh' gap='3' ml='auto' mr='5rem'>
                <Text as="p" m="0" align={'center'}>Sign in to continue</Text>
                
                <Flex direction={'column'} width={"100%"}>
                    <Box>
                        <Text as="p" m="0">Username</Text>
                        <TextField.Root value={usernameText} onChange={e => setUsernameText(e.target.value)} />
                    </Box>
                    <Box>
                        <Text as="p" m="0">Password</Text>
                        <TextField.Root type="password" value={passwordText} onChange={e => setPasswordText(e.target.value)} />
                    </Box>
                </Flex>
                
                <Flex justify={'end'} align={'center'} gap="2">
                    <Link to={'/home'}>Continue as Guest</Link>
                    <Button onClick={handleLogin}>
                        Login
                    </Button>
                </Flex>
                
                <Text as="p" m="0" align={'center'}>Don't have an account? <Link to={'/register'}>Register here</Link></Text>
            </Flex>
        </Box>
    )
}

export default LoginPage
