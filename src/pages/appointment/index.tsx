import { Box, Flex } from "@radix-ui/themes";
import { Empty, Tabs } from "antd";
import './index.css';
import UpcomingAppointments from "./components/upcoming-appointments";
import FinishedAppointments from "./components/finished-appointments";
import { useRecoilState } from "recoil";
import { appointmentsListState } from "../../state";
import { useEffect } from "react";

const AppointmentsPage = () => {
  const [appointmentsList, setAppointmentsList] = useRecoilState(appointmentsListState);

  function cancelAppointment(index: number): void {
    setAppointmentsList(prevList => {
      return [...prevList.slice(0, index), ...prevList.slice(index + 1)];
    })
  }

  useEffect(() => {
    setAppointmentsList(prevList => {
      const newList = [...prevList];

      return newList.sort((a, b) => {
        if (a.date == null || b.date == null) {
          return 0;
        }

        return a.date?.diff(b.date);
      });
    })
  }, [])

  const tabsItems = [
    {
      key: 'upcoming',
      label: 'Upcoming',
      children: <UpcomingAppointments cancelAppointment={cancelAppointment} list={appointmentsList} />
    },
    {
      key: 'finished',
      label: 'Finished',
      children: <FinishedAppointments list={appointmentsList} />
    },
  ]

  return (
    <Box id='appointments-page' className='page'>
      <Flex direction='column' className="appointments-container" p='3'>
        <Tabs defaultActiveKey="upcoming" items={tabsItems} />
        { appointmentsList.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> }
      </Flex>
    </Box>
  )
}

export default AppointmentsPage
