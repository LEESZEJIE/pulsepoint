import { Box, Flex, SegmentedControl, Text, Button } from "@radix-ui/themes"
import { useRecoilState } from "recoil"
import { appointmentInfoState, appointmentsListState, selectedDoctorState } from "../../state"
import DoctorCard from "../../components/doctor-card";
import { useNavigate } from "react-router-dom";
import { Calendar, TimePicker } from "antd";
import { Dayjs } from "dayjs";

const ScheduleAppointmentPage = () => {
  const navigate = useNavigate();
  const [selectedDoctor] = useRecoilState(selectedDoctorState);
  const [appointmentInfo, setAppointmentInfo] = useRecoilState(appointmentInfoState);
  const [appointmentsList] = useRecoilState(appointmentsListState);

  if (selectedDoctor.name === '') {
    navigate('/home');
    return;
  }

  function handleDateChange(date: Dayjs) {
    setAppointmentInfo(prev => ({
      ...prev,
      date
    }));
  }

  function handleProceed() {
    navigate('/confirm-appointment')
  }

  return (
    <Flex id='schedule-appointment-page' className="page" direction='column' justify={'center'} align='center'>
      <Flex justify='center' align='center' gap='5'>
        <DoctorCard doctor={selectedDoctor} isDisplay />

        <Box width="40%" style={{ border: '1px solid black', borderRadius: 8 }} p='3'>
          <Calendar value={appointmentInfo.date} fullscreen={false} onChange={handleDateChange} />
        </Box>

        <Flex direction='column' gap='3'>
          <Flex direction='column'>
            <Text as="p" m="0">Please select appointment option</Text>
            {/* @ts-ignore */}
            <SegmentedControl.Root value={appointmentInfo.type} onValueChange={type => setAppointmentInfo(prev => ({ ...prev, type }))}>
              <SegmentedControl.Item value="teleconsultation">TeleConsultation</SegmentedControl.Item>
              <SegmentedControl.Item value="clinic-visit">Clinic Visit</SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>

          <Flex direction='column'>
            <TimePicker
              hideDisabledOptions
              showSecond={false}
              minuteStep={30}
              value={appointmentInfo.time}
              disabledTime={() => ({
                disabledHours: () => [0,1,2,3,4,5,6,7,8,9,18,19,20,21,22,23],
                disabledMinutes: (hour: number) => {
                  const finalList =  appointmentsList
                    .filter(item => item.name === selectedDoctor?.name)
                    .filter(appt => Number(appt.time?.format('HH')) === hour)
                    .map(appt => Number(appt.time?.format('mm')))

                  return finalList;
                }
              })}
              onChange={time => setAppointmentInfo(prev => ({ ...prev, time }))}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex align='center' justify='end' width="80%" mt='8' gap='3'>
        <Button size='3' onClick={() => navigate('/doctors')}>Back</Button>
        <Button size='3' disabled={!(appointmentInfo.date && appointmentInfo.time)} onClick={handleProceed}>Proceed</Button>
      </Flex>
    </Flex>
  )
}

export default ScheduleAppointmentPage
