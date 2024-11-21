import { Avatar, Flex, Text, TextField } from "@radix-ui/themes"
import { useRecoilState } from "recoil"
import { loggedInUserState } from "../../state";
import { useNavigate } from "react-router-dom";
import './index.css'
import { Button } from "antd";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(loggedInUserState);

  if (user == null) {
    navigate('/login')
    return;
  }

  function handleLogout() {
    setUser(null);
    navigate('/login')
  }

  const { fullname, nric, contact, address } = user;

  return (
    <Flex id='user-details' className="page" direction='column' gap='5'>
      <Flex direction='column' justify='center' align='center'>
        <Avatar radius='full' size='7' fallback={user?.fullname[0].toUpperCase()} />
        <Text as="p" m="0" size='6' align='center'>{user?.fullname}</Text>
      </Flex>

      <Flex direction='column' width='55%' mx='auto' gap='2'>
        <Flex direction='column'>
          <Text as="p" m="0">Full Name</Text>
          <TextField.Root value={fullname} disabled />
        </Flex>
        <Flex direction='column'>
          <Text as="p" m="0">NRIC</Text>
          <TextField.Root value={nric} disabled />
        </Flex>
        <Flex direction='column'>
          <Text as="p" m="0">Contact Number</Text>
          <TextField.Root value={contact} disabled />
        </Flex>
        <Flex direction='column'>
          <Text as="p" m="0">Address</Text>
          <TextField.Root value={address} disabled />
        </Flex>
      </Flex>

      <Flex justify='center' align='center' gap='3'>
        <Button onClick={() => navigate(-1)} type='primary'>
          Back
        </Button>
        <Button onClick={handleLogout} danger>
          Logout
        </Button>
      </Flex>
    </Flex>
  )
}

export default UserDetailsPage
