import React from 'react';
import { Flex, Text, TextArea } from "@radix-ui/themes";
import { Button } from "antd";

const FeedbackPage = () => {
  return (
    <React.Fragment >
      <Flex id='feedback-page' className="page" direction='column' gap='3' width='40%' style={{ paddingTop: '8rem', marginLeft: '8rem' }}>
        <Text as="p" m="0" align='center' size='8'>We would like your feedback to serve you better!</Text>
        <Text as="p" m="0" align='center' size='6'>How do you think about our page?</Text>

        <Flex align='center' gap='5' className="emojis">
        </Flex>

        <Text as="p" m="0" align='center'>Please leave your message below!</Text>
        <TextArea resize={'vertical'} />

        <Flex justify='end'>
          <Button>Submit</Button>
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
