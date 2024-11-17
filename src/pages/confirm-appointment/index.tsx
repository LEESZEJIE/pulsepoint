import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes"
import { useRecoilState } from "recoil"
import { appointmentInfoState, appointmentsListState, selectedDoctorState } from "../../state";
import { useNavigate } from "react-router-dom";

const ConfirmAppointmentPage = () => {
  const navigate = useNavigate();
  const [doctor] = useRecoilState(selectedDoctorState);
  const [appointment] = useRecoilState(appointmentInfoState);
  const [, setAppointmentsList] = useRecoilState(appointmentsListState);

  function handleConfirmAppointment() {
    setAppointmentsList(prev => [...prev, { ...doctor, ...appointment }])
    navigate('/home')
  }

  return (
    <Flex id='confirm-page' className="page" direction='column' justify='center' align='center'>
      <Flex direction='column' gap='3' width='80%' mx='auto'>
        {
          [
            { label: 'Doctor Name', value: doctor.name },
            { label: 'Department', value: doctor.specialty },
            { label: 'Contact No.', value: doctor.contact },
            { label: 'Location', value: doctor.location },
            { label: 'Date', value: appointment.date },
            { label: 'Time', value: appointment.time },
            { label: 'Consultation Mode', value: appointment.type === 'teleconsultation' ? 'TeleConsultation' : 'Clinic Visit' },
          ].map(item => {
            return (
              <Flex gap="3" align='center' width='100%'>
                <Box width='300px'>
                  <Text as="p" m="0">{item.label}:</Text>
                </Box>
                <TextField.Root value={item.value?.toString()} style={{ width: '100%' }} disabled />
              </Flex>
            )
          })
        }
      </Flex>
      <Flex width='80%' align='center' justify='end' mt='5' gap='3'>
        <Button onClick={() => navigate('/confirm-schedule')}>Back</Button>
        <Button onClick={handleConfirmAppointment}>Confirm</Button>
      </Flex>
    </Flex>
  )
}

export default ConfirmAppointmentPage
