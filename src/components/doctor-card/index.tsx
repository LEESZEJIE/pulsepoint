import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useRecoilState } from "recoil";
import { selectedDoctorState } from "../../state";
import { useNavigate } from "react-router-dom";

interface IDoctor {
  name: string;
  contact: string;
  location: string;
  specialty: string;
  image: string;
}

const DoctorCard = ({ doctor, isDisplay = false }: { doctor: IDoctor, isDisplay?: boolean }) => {
  const navigate = useNavigate();
  const [, setSelectedDoctor] = useRecoilState(selectedDoctorState);

  function handleSelectDoctor() {
    setSelectedDoctor(doctor);
    navigate('/schedule-appointment');
  }

  return (
    <Flex
      className="doctor-card"
      direction={isDisplay ? 'column' : 'row'}
      width={isDisplay ? '300px' : '400px'}
      height={isDisplay ? 'auto' : '180px'}
      p='3'
      gap='3'
      style={{
        border: '1px solid black',
        borderRadius: '8px'
      }}
    >
      <Box>
        <img
          src={doctor.image}
          alt={doctor.name}
          style={{
            width: "100%",
            height: "100%",
            border: '1px solid black',
            borderRadius: '4px'
          }}
        />
      </Box>
      <Flex className="doctor-info-container" direction='column' justify={'between'}>
        <Flex direction='column' gap='1' className="doctor-info">
          <Text as="p" m="0" weight='bold'>{doctor.name}</Text>
          <Text as="p" m="0" size='2'>{doctor.specialty}</Text>
          <Text as="p" m="0">Contact: {doctor.contact}</Text>
          <Text as="p" m="0">Location: {doctor.location}</Text>
        </Flex>
        {
          !isDisplay &&
            <Flex>
              <Button style={{ width: '100%' }} onClick={handleSelectDoctor}>
                Schedule Appointment
              </Button>
            </Flex>
        }
      </Flex>
    </Flex>
  )
}

export default DoctorCard
