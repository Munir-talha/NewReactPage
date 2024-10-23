import React, { useEffect, useState } from 'react';
import Usertable from './DataTable/Usertable';
import { Button, Modal, Form, Input } from 'antd';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();  // Form instance

  useEffect(() => {
    fetch('http://localhost:5000/getAll')
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data: ", data);  
        setUsers(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);  
      });
  }, []);

  const tableData = users.data?.length > 0 ? users.data?.map((user) => ({
    key: user.id || 'N/A',  
    fname: user.fname || 'N/A',
    lname: user.lname || 'N/A',
    email: user.email || 'N/A',
    phone: user.phone || 'N/A',
  })) : [];

  const onEdit = (record) => {
    setIsEditing(true);
    setCurrentUser(record);
    form.setFieldsValue(record);  // Set form values for editing
    showModal();
  };

  const data = [
    {
      key: '1',
      fname: 'John',
      lname: 'Doe',
      email: '',
      phone: '1234567890',
    },
    {
      key: '2',
      fname: 'Jane',
      lname: 'Doe',
      email: '',
      phone: '1234567890',
    },
    {
      key: '3',
      fname: 'John',
      lname: 'Smith',
      email: '',
      phone: '1234567890',
    },
    {
      key: '4',
      fname: 'Jane',
      lname: 'Smith',
      email: '',
      phone: '1234567890',
    },
  ];

  const columnsData = [
    {
      title: 'First Name',
      dataIndex: 'fname',
      key: 'fname',
      width: '30%',
    },
    {
      title: 'Last Name',
      dataIndex: 'lname',
      key: 'lname',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddUser = () => {
    setIsEditing(false);
    setCurrentUser(null);
    form.resetFields();  // Clear form fields for new user
    showModal();
  };

  const handleOk = (values) => {
    if (isEditing) {
      console.log("Editing User:", values);
      // setUsers((prevUsers) =>
      //   prevUsers.map((user) => (user?.data.id === currentUser.id ? { ...user, ...values } : user))
      // );
    } else {
      console.log("Adding User:", values);
      // setUsers((prevUsers) => [
      //   ...prevUsers,
      //   { id: Date.now(), ...values },
      // ]);
    }
    setIsModalVisible(false);
    setCurrentUser(null);
    form.resetFields();  // Ensure fields are reset after submission
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
    form.resetFields();  
  };

  return (
    <div>
      <h1>User Data</h1>
      <Button type="primary" onClick={handleAddUser}>Add User</Button>
      <Usertable columnsData={columnsData} tableData={data} loading={loading} onEdit={onEdit} />

      
      <Modal
        title={isEditing ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}  // Bind the form instance
          initialValues={{ fname: '', lname: '', email: '', phone: '' }}  // Always reset form fields for adding
          onFinish={handleOk}
          layout="vertical"
        >
          <Form.Item
            name="fname"
            label="First Name"
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lname"
            label="Last Name"
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Update User' : 'Add User'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Home;
