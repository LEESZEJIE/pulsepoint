import { Flex } from "@radix-ui/themes"
import AppointmentCard from "../appointment-card";
import dayjs from "dayjs";
import { IScheduledAppointment } from "../../../../state";

const OnGoingAppointments = ({
  list,
  startCall,
  checkInQR,
}: {
    list: IScheduledAppointment[],
    startCall: (id: number, image: string) => void,
    checkInQR: () => void
  }) => {
  return (
    <Flex direction='column' gap='3'>
      {
        list
        .filter(appt => {
          const now = dayjs();
          const result = now.diff(appt.date, 'minutes');
          return result >= -15 && result <= 15;
        })
        .map((appt, i) => {
          return <AppointmentCard key={i} info={appt} startCall={startCall} checkInWithQR={checkInQR} />
        })
      }
    </Flex>
  )
}

export default OnGoingAppointments;
