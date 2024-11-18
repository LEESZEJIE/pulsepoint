import { Flex } from "@radix-ui/themes"
import { useRecoilState } from "recoil"
import { appointmentsListState } from "../../../../state";
import AppointmentCard from "../appointment-card";
import dayjs from "dayjs";

const FinishedAppointments = () => {
  const [appointmentsList] = useRecoilState(appointmentsListState);

  return (
    <Flex direction='column' gap='3'>
      {
        appointmentsList
        .filter(appt => {
          const now = dayjs();
          const result = now.diff(appt.date, 'days');
          return result > 0;
        })
        .map(appt => {
          return <AppointmentCard isFinished info={appt} />
        })
      }
    </Flex>
  )
}

export default FinishedAppointments
