import { Flex } from "@radix-ui/themes"
import AppointmentCard from "../appointment-card";
import dayjs from "dayjs";
import { IScheduledAppointment } from "../../../../state";

const FinishedAppointments = ({ list }: { list: IScheduledAppointment[] }) => {
  return (
    <Flex direction='column' gap='3'>
      {
        list
        .filter(appt => {
          const now = dayjs();
          const result = now.diff(appt.date, 'days');
          return result > 0 || appt.isCompleted;
        })
        .map(appt => {
          return <AppointmentCard isFinished info={appt} />
        })
      }
    </Flex>
  )
}

export default FinishedAppointments
