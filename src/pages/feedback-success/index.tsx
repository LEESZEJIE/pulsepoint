import { Flex } from "@radix-ui/themes"
import { Result } from "antd"

const FeedbackSuccess = () => {
  return (
    <Flex align={'center'} justify={'center'} height={'100vh'}>
      <Result
        status={'success'}
        title={'Response collected!'}
        subTitle={'Thank you for your response! Our team has heard your feedback in order to serve you better!'}
      />
    </Flex>
  )
}

export default FeedbackSuccess
