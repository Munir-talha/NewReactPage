import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Usertable from './DataTable/Usertable';
import { Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();
  const [userID, setUserID] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    
    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    
    fetch('http://localhost:5000/getAll', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
      },
  })
  .then((response) => {
      if (response.status === 401 || response.status === 403) {
          // Handle unauthorized access
          Swal.fire({
              icon: 'warning',
              title: 'Session Expired',
              text: 'Please log in again.',
          });
          // redirect to login page
          localStorage.removeItem('authToken');
          window.location.href = '/'; 
          return;
      }
      return response.json();
  })
  .then((data) => {
      setUsers(data);
      setLoading(false);
  })
  .catch((error) => {
      console.log(error);
      setLoading(false);
  });
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const tableData = users.data?.length > 0
    ? users.data?.map((user) => ({
        key: user.id || 'N/A',
        fname: user.fname || 'N/A',
        lname: user.lname || 'N/A',
        email: user.email || 'N/A',
        phone: user.phone || 'N/A',
      }))
    : [];

  const onEdit = (record) => {
    setUserID(record.key);
    setIsEditing(true);
    setCurrentUser(record);
    form.setFieldsValue(record);
    showModal();
  };

  const handleAddUser = () => {
    setIsEditing(false);
    setCurrentUser(null);
    form.resetFields();
    showModal();
  };

  const handleOk = (values) => {
    if (isEditing) {
      values = { ...values, id: userID };
      axios.post(`http://localhost:5000/update`, values, {
        headers: {
            'Authorization': localStorage.getItem('authToken'),  // Add token in Authorization header
        }
    })
    .then(() => {
        fetchUsers();
        // Show success alert on update
        Swal.fire({
            icon: 'success',
            title: 'User Updated',
            text: 'The user has been updated successfully!',
            timer: 2000, // Auto close after 2 seconds
            showConfirmButton: false,
        });
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'An error occurred while updating the user.',
        });
    });
    } else {
      values = { ...values, id: nanoid() };
      axios.post(`http://localhost:5000/AddUser`, values, {
        headers: {
            'Authorization': localStorage.getItem('authToken'),  // Add token in Authorization header
        }
    })
    .then(() => {
        fetchUsers();
        // Show success alert on add
        Swal.fire({
            icon: 'success',
            title: 'User Added',
            text: 'The user has been added successfully!',
            timer: 2000,
            showConfirmButton: false,
        });
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Add Failed',
            text: 'An error occurred while adding the user.',
        });
    });
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const showModal = () => {
    setIsModalVisible(true);
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

  return (
    <div>
      <h1>User Data</h1>
      <Button type="primary" onClick={handleAddUser}>Add User</Button>
      <Usertable columnsData={columnsData} tableData={tableData} loading={loading} onEdit={onEdit} />

      <Modal
        title={isEditing ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={{ fname: '', lname: '', email: '', phone: '' }}
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
