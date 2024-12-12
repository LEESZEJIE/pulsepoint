import { Flex, ScrollArea, TextField } from "@radix-ui/themes"
import { useRecoilState } from "recoil"
import { messagesListState } from "../../../../state";
import Message from "./components/message";
import { Button } from "antd";
import { IoIosSend } from "react-icons/io";
import { useRef, useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useRecoilState(messagesListState);
  const [messageText, setMessageText] = useState('');
  const scrollRef = useRef(null);

  function sendMessage() {
    setMessages(prev => {
      if (messageText === '') {
        return prev;
      }

      const newList = [...prev];
      newList.push({
        isSelfSent: true,
        content: messageText,
        type: 'text',
      });
      return newList;
    });
    setMessageText('');

    // @ts-ignore
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
  }

  return (
    <Flex
      direction='column'
      justify={'between'}
      width='100%'
      height='100%'
    >
      <ScrollArea ref={scrollRef} style={{ height: '500px', width: '100%', paddingBottom: '15px' }} scrollbars="vertical">
        <Flex direction='column' gap='5'>
          {
            messages.map(message => {
              return (
                <Message message={message} />
              );
            })
          }
        </Flex>
      </ScrollArea>
      <Flex align='center'>
        <TextField.Root
          style={{
            width: '100%',
            borderRadius: '8px',
            paddingLeft: '1rem'
          }}
          placeholder="Send a message"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        >
          <TextField.Slot side="right">
            <Button type='link' size="large" onClick={sendMessage}>
              <IoIosSend />
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    </Flex>
  )
}

export default ChatBox
