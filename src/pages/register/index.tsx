import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IUser, usersListState } from "../../state";
import './index.css';

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
  const [usersList, setUsersList] = useRecoilState(usersListState);
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

  function checkFieldExists(): boolean {
    let isExists = false;

    usersList.forEach(user => {
      const keys = Object.keys(user);

      keys.forEach(key => {
        if (user[key] === registerInfo[key]) {
          isExists = true;
        }
      })
    })

    return isExists;
  }

  function checkAllFieldsFilled(): boolean {
    const { fullname, nric, contact, address1, password, reenterpassword } = registerInfo;
    return !!fullname && !!nric && !!contact && !!address1 && !!password && !!reenterpassword;
  }

  function handleRegister() {
    if (checkFieldExists()) {
      alert('An account with this information is already registered');
      return;
    }

    if (registerInfo.password !== registerInfo.reenterpassword) {
      alert('Passwords do not match');
      return;
    }

    const address = [registerInfo.address1, registerInfo.address2].join(',')
    const newAcc: IUser = {
      fullname: registerInfo.fullname,
      password: registerInfo.password,
      nric: registerInfo.nric,
      contact: registerInfo.contact,
      address: address.endsWith(',') ? address.substring(0, address.length - 1) : address
    }

    setUsersList(prev => [...prev, newAcc])
    alert('Welcome to Pulsepoint! Please login again with your account');
    navigate('/login');
  }

  const registerDisabled = !checkAllFieldsFilled();

  return (
    <Box id='register-page' className="page">
      <img src={'/images/doctor-register.png'} alt={'register doctor mascot'} className="mascot" />

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

        <Flex mt='5' direction='row-reverse' align='end' width={'100%'} gap='5'>
          <Button onClick={handleRegister} disabled={registerDisabled}>
            Register
          </Button>
          <Button size='2' onClick={() => navigate('/login')}>
            Back
            </Button>
          </Flex>
      </Flex>

    </Box>
  )
}

export default RegisterPage
