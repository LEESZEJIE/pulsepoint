import { Box, Flex } from "@radix-ui/themes"
import { useRecoilState } from "recoil"
import { selectedDoctorState } from "../../state"
import DoctorCard from "../../components/doctor-card";
import { useNavigate } from "react-router-dom";
import { Calendar, CalendarProps } from "antd";
import { Dayjs } from "dayjs";

const ScheduleAppointmentPage = () => {
  const navigate = useNavigate();
  const [selectedDoctor] = useRecoilState(selectedDoctorState);

  if (selectedDoctor.name === '') {
    navigate('/home');
    return;
  }

  function handlePanelChange(value: Dayjs, mode: CalendarProps<Dayjs>['mode']) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  return (
    <Flex id='schedule-appointment-page' className="page" justify='center' align='center'>
      <DoctorCard doctor={selectedDoctor} />
      <Box width="40%" style={{ border: '1px solid black', borderRadius: 8 }} p='3'>
        <Calendar fullscreen={false} onPanelChange={handlePanelChange} />
      </Box>

    </Flex>
  )
}

export default ScheduleAppointmentPage
