import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

function Login() {
    const navigate = useNavigate();
    
    const onFinish = (values) => {
        axios.post('http://localhost:5000/login', values)
            .then((response) => {
                if (response.data.success) {
                    // Store the JWT token in localStorage
                    localStorage.setItem('authToken', response.data.token);

                    // Show success alert using SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: 'You have successfully logged in!',
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    // Navigate to home page after success
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000); // Redirect after 2 seconds
                } else {
                    // Show error alert for invalid credentials
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: response.data.message || 'Invalid username or password',
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                // Show error alert for server or network issues
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred during login.',
                });
            });
    };
    
    const onFinishFailed = (errorInfo) => {
        // Show error alert if form validation fails
        Swal.fire({
            icon: 'error',
            title: 'Validation Failed',
            text: 'Please check the form and fill in all required fields.',
        });
    };
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
