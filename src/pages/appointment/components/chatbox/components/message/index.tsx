import { Flex, Text } from '@radix-ui/themes'
import { IMessage, selectedDoctorState } from '../../../../../../state'
import './index.css';
import { useRecoilState } from 'recoil';

const Message = ({ message }: { message: IMessage }) => {
  const [doctor] = useRecoilState(selectedDoctorState);

  return (
    <Flex
      justify={message.isSelfSent ? 'end' : 'start'}
      width='100%'
      height='100%'
      style={{
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
    >
      <Flex align='end'>
        <img
          src={
            message.isSelfSent
            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREh8TIFWYXVR4v4TeSVn20PTQI5WNaF5IteeQ&s'
            : doctor.image ?? ''
          }
          style={{
            height: '50px',
            borderRadius: '50%',
            marginRight: '5px'
          }}
        />
        <Flex align='center' width={'fit-content'} maxWidth={'300px'} className={`message-container ${message.isSelfSent ? 'self' : 'other'}`}>
          <Text as="p" m="0" className='content'>{message.content}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Message
