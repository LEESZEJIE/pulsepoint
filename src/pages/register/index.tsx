import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

interface IRegisterInfo {
    fullname: string;
    nric: string;
    contact: string;
    address1: string;
    address2: string;
    password: string;
    reenterpassword: string;
}

const inputFields = [
    { label: 'Full Name (as per NRIC)', type: 'text', placeholder: 'eg: John Doe', value: 'fullname'  },
    { label: 'NRIC', type: 'text', placeholder: 'eg: 011111-10-1111', value: 'nric'  },
    { label: 'Contact Number', type: 'text', placeholder: 'eg: 012-345 6789', value: 'contact'  },
    { label: 'Address 1', type: 'text', placeholder: 'Address 1', value: 'address1'  },
    { label: 'Address 2 (optional)', type: 'text', placeholder: '', value: 'address2'  },
    { label: 'Password', type: 'password', placeholder: '', value: 'password'  },
    { label: 'Re-enter Password', type: 'password', placeholder: '', value: 'reenterpassword'  },
]

const RegisterPage = () => {
    const navigate = useNavigate();
    const [registerInfo, setRegisterInfo] = useState<IRegisterInfo>({
        fullname: '',
        nric: '',
        contact: '',
        address1: '',
        address2: '',
        password: '',
        reenterpassword: '',
    });

    function handleInputChange(category: string, inputValue: string) {
        setRegisterInfo(prev => {
            return {
                ...prev,
                [category]: inputValue
            }
        })
    }

    function handleRegister() {
        navigate('/home');
    }

    return (
        <Box id='register-page' className="page">
            <Flex direction='column' width='20%' height='100vh' justify='center' align='center' gap='2' ml='auto' mr='3rem'>
                {
                    inputFields.map(item => {
                        return (
                            <Flex direction='column' gap='1' width='100%'>
                                <Text as="p" m="0">{item.label}</Text>
                                {/* @ts-ignore */}
                                <TextField.Root style={{ width: '100%' }} placeholder={item.placeholder} type={item.type} value={registerInfo[item.value]} onChange={e => handleInputChange(item.value, e.target.value)} />
                            </Flex>
                        )
                    })
                }

                <Flex mt='5' direction='column' align='end' width={'100%'}>
                    <Button onClick={handleRegister}>
                        Register
                    </Button>
                </Flex>
            </Flex>
            
        </Box>
    )
}

export default RegisterPage
