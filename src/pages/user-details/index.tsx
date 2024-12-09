import { Avatar, Flex, Text, TextField } from "@radix-ui/themes"
import { useRecoilState } from "recoil"
import { loggedInUserState } from "../../state";
import { useNavigate } from "react-router-dom";
import './index.css'
import { Button, Input, message, Modal } from "antd";
import { useState } from "react";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(loggedInUserState);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFields, setEditFields] = useState({
    fullname: "",
    contact: "",
    address: "",
    password: "",
    retypepassword: "",
  });
  const [messageApi, contextHolder] = message.useMessage();

  function handleEditFieldOnChange(category: 'fullname' | 'contact' | 'address' | 'password' | 'retypepassword', value: string) {
    setEditFields(prev => {
      return {
        ...prev,
        [category]: value
      };
    })
  }

  function handleLogout() {
    setUser(null);
    navigate('/login')
  }

  function handleReadyToEdit() {
    setIsEditModalOpen(true);

    const { fullname = '', contact = '', address = '' } = user ?? {};
    setEditFields({
      fullname,
      contact,
      address,
      password: '',
      retypepassword: '',
    });
  }

  function handleEdit() {
    if (editFields.password !== editFields.retypepassword) {
      messageApi.error('Passwords do not match!');
      return;
    }

    const { fullname, contact, address, password } = editFields;
    setUser(prev => {
      return {
        ...prev,
        fullname,
        contact,
        address,
        password,
      };
    })
    setIsEditModalOpen(false);
    messageApi.success('Account information successfully updated!');
  }

  if (user == null) {
    return null;
  }

  const { fullname, nric, contact, address } = user ?? {};

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
        <Button onClick={handleReadyToEdit} type='primary'>
          Edit
        </Button>
        <Button onClick={handleLogout} danger>
          Logout
        </Button>
      </Flex>

      <Modal
        open={isEditModalOpen}
        okText="Confirm"
        onOk={handleEdit}
        onClose={() => setIsEditModalOpen(false)}
        closable={true}
        centered
        onCancel={() => setIsEditModalOpen(false)}
        title="Edit Profile Info"
      >
        <Flex direction='column'>
          <Text as="p" m="0">Full Name</Text>
          <Input style={{ marginBottom: '15px' }} placeholder="Full Name" value={editFields.fullname} onChange={e => handleEditFieldOnChange('fullname', e.target.value)} />
        </Flex>

        <Flex direction='column'>
          <Text as="p" m="0">Contact Number</Text>
          <Input style={{ marginBottom: '15px' }} placeholder="Contact Number" value={editFields.contact} onChange={e => handleEditFieldOnChange('contact', e.target.value)} />
        </Flex>

        <Flex direction='column'>
          <Text as="p" m="0">Address</Text>
          <Input style={{ marginBottom: '15px' }} placeholder="Address" value={editFields.address} onChange={e => handleEditFieldOnChange('address', e.target.value)} />
        </Flex>

        <Flex direction='column'>
          <Text as="p" m="0">Password</Text>
          <Input style={{ marginBottom: '15px' }} placeholder="Password" type="password" value={editFields.password} onChange={e => handleEditFieldOnChange('password', e.target.value)} />
        </Flex>

        <Flex direction='column'>
          <Text as="p" m="0">Retype Password</Text>
          <Input style={{ marginBottom: '15px' }} placeholder="Retype Password" type="password" value={editFields.retypepassword} onChange={e => handleEditFieldOnChange('retypepassword', e.target.value)} />
        </Flex>
      </Modal>

      {contextHolder}
    </Flex>
  )
}

export default UserDetailsPage
