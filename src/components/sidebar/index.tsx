import { Box, Flex, Text } from "@radix-ui/themes"
import { Button } from "antd"

import './index.css'
import { useRecoilState } from "recoil"
import { isSidebarOpenState, loggedInUserState } from "../../state"
import { FaXmark } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate();
  const [, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const [, setLoggedInUser] = useRecoilState(loggedInUserState);

  function handleClose() {
    setIsSidebarOpen(false);
  }

  function handleLogout() {
    handleClose();
    navigate('/login')
    setLoggedInUser(null);
  }

  return (
    <Box id='sidebar'>
      <Box className="overlay" onClick={handleClose}>
      </Box>

      <Flex direction='column' className="container" gap='3'>
        <FaXmark className="close-icon" onClick={handleClose} />

        <Text as="p" m="0" align='center' size='5' style={{ marginBottom: '5rem' }}>Pulsepoint</Text>

        <Button type='primary'>
          Give us Feedback!
        </Button>

        <Button danger onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  )
}

export default Sidebar
