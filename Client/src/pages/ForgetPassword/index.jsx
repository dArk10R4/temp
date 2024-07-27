import React, { useState } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { formItemLayout, tailFormItemLayout } from './style'
import { Link } from 'react-router-dom'
import userService from './../../services/users'
import { Redirect } from 'react-router-dom'
import { message } from 'antd'

const ForgetPassword = () => {
  const [form] = Form.useForm()
  const [redirect, setRedirect] = useState(false)

  if (redirect) {
    return <Redirect to="/ResetPassword" />
  }

  const onFinish = async (values) => {
    console.log('Received values of form: ', values)
    if (!values?.email) {
      // message.error('Please fill the email field')
      return
    }
    try {
      await userService.forgotPassword(values.email)
      message.success('We sent mail if mail address exists')
        // setRedirect(true)
    } catch (e) {
      message.error(`Can't send mail`)
      console.log("can't send mail", e)
    }
  }

  return (
    <Card>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86'
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" onClick={onFinish}>
            Send Mail
          </Button>
        </Form.Item>
      </Form>
      <Link to="/register">Create Account</Link>
    </Card>
  )
}
export default ForgetPassword
