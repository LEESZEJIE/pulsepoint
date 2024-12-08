import React, { useEffect, useState } from 'react';
import { Flex, Text, TextArea } from "@radix-ui/themes";
import { Button, message } from "antd";
import { useRecoilState } from 'recoil';
import { loggedInUserState } from '../../state';
import './index.css';
import { useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loggedInUser] = useRecoilState(loggedInUserState);
  const [textAreaText, setTextAreaText] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    navigate('/feedback-success');
  }

  useEffect(() => {
    if (loggedInUser != null) {
      return;
    }

    messageApi.info('Please login to give feedback');
  }, [])

  if (loggedInUser == null) {
    return (
      <React.Fragment>
        {contextHolder}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment >
      <Flex id='feedback-page' className="page" direction='column' gap='3' width='40%' style={{ paddingTop: '8rem', marginLeft: '8rem' }}>
        <Text as="p" m="0" align='center' size='8'>We would like your feedback to serve you better!</Text>
        <Text as="p" m="0" align='center' size='6'>How do you think about our page?</Text>

        <Flex justify={'center'} align='center' my='3' gap='5' className="emojis">
          <Button type='link' onClick={() => setTextAreaText('Very easy to use!')}>😊</Button>
          <Button type='link' onClick={() => setTextAreaText('Few hiccups here and there')}>🙂</Button>
          <Button type='link' onClick={() => setTextAreaText('Unexpectedly difficult to use')}>😞</Button>
          <Button type='link' onClick={() => setTextAreaText('Had a hard time using the system!')}>😡</Button>
          <Button type='link' onClick={() => setTextAreaText('BEST SYSTEM EVER OMG THE PROGRAMMER MUST BE VERY SMART SIA')}>🤯</Button>
        </Flex>

        <Text as="p" m="0" align='center'>Please leave your message below!</Text>
        <TextArea value={textAreaText} onChange={e => setTextAreaText(prev => prev + e.target.value)} resize={'vertical'} style={{ height: '300px' }} />

        <Flex justify='end'>
          <Button onClick={handleSubmit}>Submit</Button>
        </Flex>
      </Flex>

      <img
        src="/images/feedback-doctor.png"
        alt="feedback doctor"
        style={{
          position: 'absolute',
          width: '300px',
          right: "200px",
          top: "55%",
          transform: "translateY(-50%)"
        }}
      />
    </React.Fragment>
  )
}

export default FeedbackPage
