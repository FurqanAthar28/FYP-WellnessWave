import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { signup } from '../../../redux/actions/authActions/authActions';

const AddCounsellorModal = ({ show, handleClose }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    contact: 0,
    role: "counsellor",
    // staff
    employeeId: "",
    designation: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateCounsellor = async () => {
    console.log(data);
    await signup(data);
    handleClose();
    window.location.reload()
  };

  return (
    <Modal title="Add New Counsellor" open={show} onCancel={handleClose} footer={null}>
      <Form layout="vertical">
        <Form.Item label="Name" name="name">
          <Input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Write Name"
          />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Write Email"
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Write Password"
          />
        </Form.Item>
        <Form.Item label="Contact" name="contact">
          <Input
            type="contact"
            name="contact"
            value={data.contact}
            onChange={handleChange}
            maxLength={11}
            minLength={11}
            placeholder="Write Contact"
          />
        </Form.Item>
        <Form.Item label="Employee Id" name="employeeId">
          <Input
            type="text"
            name="employeeId"
            value={data.employeeId}
            onChange={handleChange}
            placeholder="Write Employee Id"
          />
        </Form.Item>
        <Form.Item label="Designation" name="designation">
          <Input
            type="text"
            name="designation"
            value={data.designation}
            onChange={handleChange}
            placeholder="Write Designation"
          />
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={handleClose}>
            Close
          </Button>
          <Button type="" onClick={handleCreateCounsellor} style={{ marginLeft: 10 }}>
            Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCounsellorModal;
