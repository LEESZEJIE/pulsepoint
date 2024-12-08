import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import doctorsJson from '../../data/Doctor Information.json';
import { useState } from 'react';
import DoctorCard from '../../components/doctor-card';

interface IDoctor {
  name: string;
  contact: string;
  location: string;
  specialty: string;
  image: string;
}

const DoctorsPage = () => {
  const [doctorsInfo] = useState<IDoctor[]>(() => {
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
  })

  return (
    <Box id='doctors-page' className='page'>
      <ScrollArea style={{ width: '80%', height: '100%' }}>
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
