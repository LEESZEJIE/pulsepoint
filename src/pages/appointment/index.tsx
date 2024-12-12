import { Box, Flex, Text } from "@radix-ui/themes";
import { Button, Empty, message, Modal, Popconfirm, Tabs } from "antd";
import './index.css';
import UpcomingAppointments from "./components/upcoming-appointments";
import FinishedAppointments from "./components/finished-appointments";
import { useRecoilState } from "recoil";
import { appointmentsListState, loggedInUserState, messagesListState } from "../../state";
import { useEffect, useState } from "react";
import { FaMessage, FaMicrophone, FaPhone } from "react-icons/fa6";
import { IoMicOff } from "react-icons/io5";
import { BsCameraVideoFill, BsCameraVideoOff } from "react-icons/bs";
import OnGoingAppointments from "./components/ongoing-appointments";
import ChatBox from "./components/chatbox";

const AppointmentsPage = () => {
  const [messages, setMessages] = useRecoilState(messagesListState);
  const [messageApi, contextHolder] = message.useMessage();
  const [loggedInUser] = useRecoilState(loggedInUserState);
  const [appointmentsList, setAppointmentsList] = useRecoilState(appointmentsListState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [callDoctorImage, setCallDoctorImage] = useState('');
  const [appointmentId, setAppointmentId] = useState(0);

  const [isCheckInQR, setIsCheckInQR] = useState(false);

  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);

  function resetEverything() {
    setIsModalOpen(false);
    setIsMicOn(false);
    setIsCamOn(false);
    setCallDoctorImage('');
    setAppointmentId(0);
    setIsCheckInQR(false);
    setIsChatBoxOpen(false);
  }

  function cancelAppointment(index: number): void {
    setAppointmentsList(prevList => {
      return [...prevList.slice(0, index), ...prevList.slice(index + 1)];
    })
  }

  function handleStartCall(id: number, doctorImage: string) {
    setMessages([
      {
        isSelfSent: false,
        type: 'text',
        content: `Hello ${loggedInUser?.fullname}`
      }
    ]);
    setIsModalOpen(true);
    setCallDoctorImage(doctorImage);
    setIsMicOn(false);
    setIsCamOn(false);
    setAppointmentId(id);
  }

  function handleEndCall() {
    setIsChatBoxOpen(false);
    setIsModalOpen(false);
    setCallDoctorImage('');
    setAppointmentsList(prev => {
      const newList = [...prev];

      const apptIndex = newList.findIndex(appt => appt.id === appointmentId);
      if (apptIndex === -1) {
        return newList;
      }

      const appt: typeof prev[number] = {
        ...newList[apptIndex],
        isCompleted: true
      };
      return [...newList.slice(0, apptIndex), appt, ...newList.slice(apptIndex + 1)];
    })
  }

  function handleQRCheckIn() {
    setIsModalOpen(true);
    setIsCheckInQR(true);
  }

  useEffect(() => {
    if (loggedInUser != null) {
      return;
    }

    setAppointmentsList([]);
    messageApi.info('Please login/sign up to view your appointments');
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
      key: 'ongoing',
      label: 'On-Going',
      children: <OnGoingAppointments list={appointmentsList} startCall={handleStartCall} checkInQR={handleQRCheckIn} />
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

      <Modal
        open={isChatBoxOpen}
        centered
        closable
        onCancel={() => setIsChatBoxOpen(false)}
        cancelButtonProps={{
          style: { display: 'none' }
        }}
        okButtonProps={{
          style: { display: 'none' }
        }}
        height={'600px'}
        width={'550px'}
      >
        <ChatBox />
      </Modal>

      <Modal
        open={isModalOpen}
        centered
        closable={isCheckInQR}
        onCancel={resetEverything}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        width={isCheckInQR ? '30%' : '80%'}
      >
        {
          !isCheckInQR &&
            <Flex width='100%' style={{ gap: 15 }} position={'relative'}>
              <img
                className="video-pic"
                src={callDoctorImage}
              />

              <img
                className="video-pic"
                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREh8TIFWYXVR4v4TeSVn20PTQ5WNaF5IteeQ&s'}
              />

              <Flex align={'center'} style={{ gap: 5 }} className="video-call-buttons">
                <Button
                  size={"large"}
                  type='primary'
                  onClick={() => setIsChatBoxOpen(true)}
                >
                  <FaMessage />
                </Button>
                <Button
                  size={"large"}
                  type={ isMicOn ? 'primary' : 'default'}
                  onClick={() => setIsMicOn(maybe => !maybe)}
                >
                  {
                    isMicOn
                      ? <FaMicrophone />
                      : <IoMicOff />
                  }
                </Button>
                <Button
                  size={"large"}
                  type={ isCamOn ? 'primary' : 'default'}
                  onClick={() => setIsCamOn(maybe => !maybe)}
                >
                  {
                    isCamOn
                      ? <BsCameraVideoFill />
                      : <BsCameraVideoOff />
                  }
                </Button>

                <Popconfirm
                  title="Leave Call"
                  description="Are you sure you want to leave the call? Your appointment will be marked as completed."
                  onConfirm={handleEndCall}
                  okText="End call"
                  cancelText="Stay in call"
                >
                  <Button size={"large"} type='primary' danger>
                    <FaPhone />
                  </Button>
                </Popconfirm>

              </Flex>
            </Flex>
        }

        {
          isCheckInQR &&
            <Flex justify='center' align='center' direction='column'>
              <img
                src={'kirby-qr.png'}
                style={{
                  width: '100%'
                }}
              />
              <Text as="p" m="0" style={{ fontSize: '24px' }}>Scan the QR to check in!</Text>
            </Flex>
        }
      </Modal>
    </Box>
  )
}

export default AppointmentsPage
