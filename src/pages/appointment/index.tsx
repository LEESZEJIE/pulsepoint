import { Box, Flex } from "@radix-ui/themes";
import { Empty, Tabs } from "antd";
import './index.css';
import UpcomingAppointments from "./components/upcoming-appointments";
import FinishedAppointments from "./components/finished-appointments";
import { useRecoilState } from "recoil";
import { appointmentsListState } from "../../state";

const AppointmentsPage = () => {
  const [appointmentsList] = useRecoilState(appointmentsListState);

  const tabsItems = [
    {
      key: 'upcoming',
      label: 'Upcoming',
      children: <UpcomingAppointments list={appointmentsList} />
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
