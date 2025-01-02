import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes"
import { useRecoilState } from "recoil"
import { appointmentInfoState, appointmentsListState, isRescheduleState, selectedDoctorState } from "../../state";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

let counter = 0;

const ConfirmAppointmentPage = () => {
  const navigate = useNavigate();
  const [doctor] = useRecoilState(selectedDoctorState);
  const [appointment, setAppointment] = useRecoilState(appointmentInfoState);
  const [, setAppointmentsList] = useRecoilState(appointmentsListState);
  const [isReschedule, setIsReschedule] = useRecoilState(isRescheduleState);
  // const [idCounter, setIdCounter] = useState(1);

  function handleConfirmAppointment() {
    ++counter;
    setAppointmentsList(prev => {
      const newAppt = { id: counter, ...doctor, ...appointment };

      if (!isReschedule) {
        return [...prev, newAppt];
      }

      const foundAppointmentIndex = prev.findIndex(appt => appt.id === newAppt.id);
      if (foundAppointmentIndex == null || foundAppointmentIndex === -1) {
        return prev;
      }

      const { date, time, type } = appointment;
      const modifiedAppt: typeof prev[number] = {
        ...prev[foundAppointmentIndex],
        isCompleted: false,
        date,
        time,
        type,
      };
      return [...prev.slice(0, foundAppointmentIndex), modifiedAppt, ...prev.slice(foundAppointmentIndex + 1)];
    })
    setIsReschedule(false);
    setAppointment({
      time: null,
      date: dayjs(),
      type: 'teleconsultation',
      isCompleted: false,
    });
    // setIdCounter(prev => prev + 1);
    navigate('/appointment')
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
            { label: 'Date', value: appointment.date?.format('DD/MM/YYYY') },
            { label: 'Time', value: appointment.time?.format('hh:mmA') },
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
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button onClick={handleConfirmAppointment}>Confirm</Button>
      </Flex>
    </Flex>
  )
}

export default ConfirmAppointmentPage
