import { Flex, Text } from '@radix-ui/themes'
import { IAppointment, IDoctor, isRescheduleState, selectedDoctorState } from '../../../../state'
import { Button, Popconfirm } from 'antd'
import './index.css'
import { TiCancel } from "react-icons/ti";
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const AppointmentCard = ({ info, isFinished = false, onCancelAppointment }: { info: IDoctor & IAppointment, isFinished?: boolean, onCancelAppointment?: () => void }) => {
  const navigate = useNavigate();
  const [, setDoctorInfo] = useRecoilState(selectedDoctorState);
  const [, setIsReschedule] = useRecoilState(isRescheduleState);

  function handleReschedule() {
    setDoctorInfo({ ...info });
    setIsReschedule(true);
    navigate('/schedule-appointment');
  }

  return (
    <Flex className='appointment-card' align='center' p='3' gap='3'>
      <Flex direction='column'>
        <Text as="p" m="0" size="5" weight="bold" align='center'>{info.date?.date()}</Text>
        <Text as="p" m="0" size="5" weight="bold" align='center'>{info.date?.format('MMM')}</Text>
      </Flex>

      <Flex direction='column' gap='3'>
        <Flex direction='column'>
          <Text as="p" m="0" size="1">Doctor Name: {info.name}</Text>
          <Text as="p" m="0" size="1">Department: {info.specialty}</Text>
          <Text as="p" m="0" size="1">Location: {info.location}</Text>
          <Text as="p" m="0" size="1">Time: {info.time?.format('hh:mmA')}</Text>
        </Flex>

        {
          !isFinished &&
          <Flex align='center' gap='1'>
            <Button onClick={handleReschedule}>Reschedule</Button>
            <Button>Check-In</Button>
          </Flex>
        }
      </Flex>

      {
        !isFinished &&
          <Popconfirm
            title="Cancel Appointment"
            description="Are you sure to canecl this appointment?"
            onConfirm={() => onCancelAppointment?.()}
            okText="Yes"
            cancelText="No"
          >
            <TiCancel className='delete-icon' size={32} />
          </Popconfirm>
      }
    </Flex>
  )
}

export default AppointmentCard
