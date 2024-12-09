import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import doctorsJson from '../../data/Doctor Information.json';
import React, { useEffect, useMemo, useState } from 'react';
import DoctorCard from '../../components/doctor-card';
import { Input, message } from 'antd';
import { useRecoilState } from 'recoil';
import { loggedInUserState } from '../../state';

interface IDoctor {
  name: string;
  contact: string;
  location: string;
  specialty: string;
  image: string;
}

const DoctorsPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loggedInUser] = useRecoilState(loggedInUserState);

  const [searchDoctorName, setSearchDoctorName] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');

  const originalDoctorsInfo = useMemo(() => {
    return doctorsJson.map((item, i) => {
      const index = (i + 1) > 18 ? Math.floor(Math.random() * 18) : (i + 1);
      const image = `/images/doctors/doctor${index}.jpeg`;

      return {
        name: item.Name,
        contact: item.Contact,
        location: item.Location,
        specialty: item.Specialty,
        image
      }
    })
  }, []);
  const [doctorsInfo, setDoctorsInfo] = useState<IDoctor[]>([...originalDoctorsInfo])

  useEffect(() => {
    setDoctorsInfo(() => {
      return originalDoctorsInfo.filter(doctor => doctor.name.split(' ').join('').toLowerCase().includes(searchDoctorName));
    });
  }, [searchDoctorName]);

  useEffect(() => {
    if (loggedInUser != null) {
      return;
    }

    messageApi.info('Please login to book an appointment with our doctors');
  }, [loggedInUser]);

  if (loggedInUser == null) {
    return (
      <React.Fragment>
        {contextHolder}
      </React.Fragment>
    );
  }

  return (
    <Box id='doctors-page' className='page'>
      <Flex align='center' gap='5' pl='5' my='3'>
        <Box>
          <Text as="p" m="0" size='2'>Doctor Name:</Text>
          <Input placeholder='Search doctor name' value={searchDoctorName} onChange={e => setSearchDoctorName(e.target.value)} />
        </Box>

        <Box>
          <Text as="p" m="0" size='2'>Department:</Text>
          <Input placeholder='Search department' value={searchDepartment} onChange={e => setSearchDepartment(e.target.value)} />
        </Box>
      </Flex>

      <ScrollArea style={{ width: '100%', height: '90%', paddingRight: '30px' }}>
        <Flex
          wrap='wrap'
          gap="3"
          p='3'
        >
          {
            doctorsInfo.map(doctor => {
              return <DoctorCard doctor={doctor} />
            })
          }
        </Flex>
      </ScrollArea>
    </Box>
  )
}

export default DoctorsPage
