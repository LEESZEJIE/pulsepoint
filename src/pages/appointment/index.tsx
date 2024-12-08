import { Box, Flex } from "@radix-ui/themes";
import { Empty, message, Tabs } from "antd";
import './index.css';
import UpcomingAppointments from "./components/upcoming-appointments";
import FinishedAppointments from "./components/finished-appointments";
import { useRecoilState } from "recoil";
import { appointmentsListState, loggedInUserState } from "../../state";
import { useEffect } from "react";

const AppointmentsPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loggedInUser] = useRecoilState(loggedInUserState);
  const [appointmentsList, setAppointmentsList] = useRecoilState(appointmentsListState);

  function cancelAppointment(index: number): void {
    setAppointmentsList(prevList => {
      return [...prevList.slice(0, index), ...prevList.slice(index + 1)];
    })
  }

  useEffect(() => {
    if (loggedInUser != null) {
      return;
    }

    messageApi.info('Please login to view your appointments');
  }, [])

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
      {contextHolder}
      <Flex direction='column' className="appointments-container" p='3'>
        <Tabs defaultActiveKey="upcoming" items={tabsItems} />
        { appointmentsList.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> }
      </Flex>

      <img
        src="/images/doctor-register.png"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 900
        }}
      />
    </Box>
  )
}

export default AppointmentsPage
