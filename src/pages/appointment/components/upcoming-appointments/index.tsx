import { Flex } from "@radix-ui/themes"
import AppointmentCard from "../appointment-card";
import dayjs from "dayjs";
import { IScheduledAppointment } from "../../../../state";

const UpcomingAppointments = ({ list, cancelAppointment }: { list: IScheduledAppointment[], cancelAppointment: (i: number) => void }) => {
  return (
    <Flex direction='column' gap='3'>
      {
        list
        .filter(appt => {
          const now = dayjs();
          const result = now.diff(appt.date, 'days');
          return result < -15 && !appt.isCompleted;
        })
        .map((appt, i) => {
          return <AppointmentCard info={appt} onCancelAppointment={() => cancelAppointment(i)} isUpcoming={true} />
        })
      }
    </Flex>
  )
}

export default UpcomingAppointments
