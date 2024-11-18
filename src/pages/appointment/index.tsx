import { Box, Flex } from "@radix-ui/themes";
import { Tabs } from "antd";
import './index.css';
import UpcomingAppointments from "./components/upcoming-appointments";
import FinishedAppointments from "./components/finished-appointments";

const tabsItems = [
  {
    key: 'upcoming',
    label: 'Upcoming',
    children: <UpcomingAppointments />
  },
  {
    key: 'finished',
    label: 'Finished',
    children: <FinishedAppointments />
  },
]

const AppointmentsPage = () => {
  return (
    <Box id='appointments-page' className='page'>
      <Flex direction='column' className="appointments-container" p='3'>
        <Tabs defaultActiveKey="upcoming" items={tabsItems} />
      </Flex>
    </Box>
  )
}

export default AppointmentsPage
