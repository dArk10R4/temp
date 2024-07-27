import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../../services/users'
import { Form, Input, Button, Checkbox, Divider, Select, message } from 'antd'
import { Redirect } from 'react-router-dom'
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  UserOutlined,
  MobileOutlined,
  CodeSandboxOutlined
} from '@ant-design/icons'

export default function Reset() {
  const { token } = useParams()
  const [page, setPage] = React.useState('reset')

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await usersService.reset(token)
        console.log(user, 'slack')
      } catch (e) {
        console.log(e)
        message.error('Password reset token is invalid or has been expired')
        setPage('notfound')
      }
    }
    fetchData()
  }, [])

  if (page === 'recovered') {
    return <Redirect to="/Login" />
  }

  if (page === 'notfound') {
    return <Redirect to="/ForgetPassword" />
  }

  const onFinish = async(values) => {
    console.log('Received values of form: ', values)
    try {
      // dispatch(register(values))
      await usersService.changePassword(token, values.password)
      // history.push('/login')
      message.success('Password changed successfully')
      setPage('recovered');
    } catch (e) {
      message.error(`Can't change password`)
      setPage('notfound')

      console.log("can't register")
    }
  }

  return (
    <div>
      <section className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            {/* <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5"> */}
            <Form
              name="register"
              onFinish={onFinish}
              initialValues={{ remember: false }}
              scrollToFirstError
            >
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    min: 7,
                    message: 'Please input your password!'
                  }
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="password"
                />
              </Form.Item>

              <Form.Item
                name="passwordConfirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,

                    min: 7,
                    message: 'Please confirm your password!'
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }

                      return Promise.reject(
                        'The two passwords that you entered do not match!'
                      )
                    }
                  })
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="confirm password"
                />
              </Form.Item>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{' '}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {/* </form> */}
              {/* <button
                onClick={() => changePassword()}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset passwod
              </button> */}
              <Form.Item className='mt-5'>
              <Button className='mt-4' block type="primary" htmlType="submit">
                Change Password
              </Button>
            </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </div>
  )
}
