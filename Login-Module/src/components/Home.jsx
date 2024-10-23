import React, { useEffect, useState } from 'react';
import Usertable from './DataTable/Usertable';
import { Button, Modal, Form, Input } from 'antd';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/getAll')
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data: ", data);  // Inspect the response from API
        setUsers(data);
        setLoading(false);  // Data has been fetched, stop loading
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);  // Stop loading even if there's an error
      });
  }, []);

  const tableData = users.data?.length > 0 ? users.data?.map((user) => ({
    key: user.id || 'N/A',  // Add a fallback in case 'id' is missing
    fname: user.fname || 'N/A',
    lname: user.lname || 'N/A',
    email: user.email || 'N/A',
    phone: user.phone || 'N/A',
  })) : [];

  const onEdit = (record) => {
    setCurrentUser(record);
    showModal(record);
  };

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

  const showModal = (user = null) => {
    setCurrentUser(user);
    setIsEditing(!!user); // Check if we are editing an existing user
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    if (isEditing) {
      console.log("Editing User:", values);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user?.data.id === currentUser.id ? { ...user, ...values } : user))
      );
    } else {
      console.log("Adding User:", values);
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: Date.now(), ...values },
      ]);
    }
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  return (
    <div>
      <h1>User Data</h1>
      <Button type="primary" onClick={() => showModal()}>Add User</Button>
      <Usertable columnsData={columnsData} tableData={tableData} loading={loading} onEdit={onEdit} />

      {/* Modal for Adding/Editing User */}
      <Modal
        title={isEditing ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentUser || { fname: '', lname: '', email: '', phone: '' }}
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
