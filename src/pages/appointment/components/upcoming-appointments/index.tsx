import { Flex } from "@radix-ui/themes"
import AppointmentCard from "../appointment-card";
import dayjs from "dayjs";
import { IScheduledAppointment } from "../../../../state";

const UpcomingAppointments = ({ list, cancelAppointment, startCall }: { list: IScheduledAppointment[], cancelAppointment: (i: number) => void, startCall: (image: string) => void }) => {
  return (
    <Flex direction='column' gap='3'>
      {
        list
        .filter(appt => {
          const now = dayjs();
          const result = now.diff(appt.date, 'days');
          return result <= 0;
        })
        .map((appt, i) => {
          return <AppointmentCard startCall={startCall} info={appt} onCancelAppointment={() => cancelAppointment(i)} />
        })
      }
    </Flex>
  )
}

export default UpcomingAppointments
