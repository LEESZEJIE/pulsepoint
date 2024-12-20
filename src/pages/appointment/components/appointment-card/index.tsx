import { Flex, Text } from '@radix-ui/themes'
import { appointmentsListState, IScheduledAppointment, isRescheduleState, selectedDoctorState } from '../../../../state'
import { Button, Popconfirm } from 'antd'
import './index.css'
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import dayjs from 'dayjs';
import React from 'react';

const AppointmentCard = ({
  info,
  isFinished = false,
  onCancelAppointment,
  startCall,
  checkInWithQR,
  isUpcoming,
}: {
    info: IScheduledAppointment;
    isFinished?: boolean;
    onCancelAppointment?: () => void;
    startCall?: (id: number, image: string) => void;
    checkInWithQR?: () => void;
    isUpcoming?: boolean;
  }) => {
  const navigate = useNavigate();
  const [, setDoctorInfo] = useRecoilState(selectedDoctorState);
  const [, setIsReschedule] = useRecoilState(isRescheduleState);
  const [, setAppointmentsList] = useRecoilState(appointmentsListState);

  function handleReschedule() {
    setDoctorInfo({ ...info });
    setIsReschedule(true);
    navigate('/schedule-appointment');
  }

  function handleToOnGoing(id: number) {
    setAppointmentsList(prev => {
      const apptIndex = prev.findIndex(appt => appt.id === id);
      if (apptIndex === -1) {
        return prev;
      }

      const newAppt: typeof prev[number] = {
        ...prev[apptIndex],
        date: dayjs(),
        time: dayjs(),
      };
      return [...prev.slice(0, apptIndex), newAppt, ...prev.slice(apptIndex + 1)];
    })
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
          <Text as="p" m="0" size="1">Consultation Mode: {info.type === 'teleconsultation' ? 'TeleConsultation' : 'Clinic Visit'}</Text>
        </Flex>

        {
          !isFinished &&
            <Flex align='center' gap='1'>
              {
                isUpcoming &&
                  <React.Fragment>
                    <Button onClick={handleReschedule}>Reschedule</Button>
                    <Button onClick={() => handleToOnGoing(info.id)}>Bring to On Going</Button>
                  </React.Fragment>
              }

              {
                !isUpcoming && info.type === 'teleconsultation' &&
                  <Popconfirm
                    title={`Start Call with ${info.name}?`}
                    onConfirm={() => startCall?.(info.id, info.image)}
                    okText="Start Call"
                    cancelText="Not Yet"
                  >
                    <Button>Check-In</Button>
                  </Popconfirm>
              }

              {
                !isUpcoming && info.type === 'clinic-visit' &&
                  <Button onClick={() => checkInWithQR?.()}>Check-In</Button>
              }
            </Flex>
        }
      </Flex>

      {
        !isFinished && !(startCall || checkInWithQR) &&
          <Popconfirm
            title="Cancel Appointment"
            description="Are you sure to cancel this appointment?"
            onConfirm={() => onCancelAppointment?.()}
            okText="Yes"
            cancelText="No"
            placement='topRight'
          >
            <FaRegTrashAlt className='delete-icon' size={20} />
          </Popconfirm>
      }
    </Flex>
  )
}

export default AppointmentCard
