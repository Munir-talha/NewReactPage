import React from 'react';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
            navigate('/home');
        };
    const onFinishFailed = (errorInfo) => {
            alert('Failed:', errorInfo);
        };
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',margin:'0 auto'}}>
        <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default Login
