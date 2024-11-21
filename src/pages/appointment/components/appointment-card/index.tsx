import { Flex, Text } from '@radix-ui/themes'
import { IAppointment, IDoctor } from '../../../../state'
import { Button } from 'antd'
import './index.css'

const AppointmentCard = ({ info, isFinished = false }: { info: IDoctor & IAppointment, isFinished?: boolean }) => {
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
            <Button>Manage</Button>
            <Button>Check-In</Button>
          </Flex>
        }
      </Flex>
    </Flex>
  )
}

export default AppointmentCard
