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
    const [doctorsInfo, setDoctorsInfo] = useState<IDoctor[]>(() => {
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
            <ScrollArea style={{ width: '100%', height: '100%' }} scrollbars='horizontal'>
                <Flex
                    wrap='wrap'
                    width='100%'
                    height='85vh'
                    overflow={'hidden'}
                    gap="3"
                    px='3'
                    style={{
                        position: 'absolute',
                        top: 'calc(10% + 30px)'
                    }}
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