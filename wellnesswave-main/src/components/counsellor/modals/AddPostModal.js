import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const AddPostModal = ({ show, handleClose, handlePost }) => {
  const [data, setData] = useState({
    heading: '',
    body: '',
    type: 'Survey',
    subType: '',
    userId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePostClick = async () => {
    console.log(data);
    await handlePost(data);
    handleClose();
  };

  const handleTypeChange = (value) => {
    setData((prevState) => ({
      ...prevState,
      type: value,
      subType: '' // Reset subType when type changes
    }));
  };

  return (
    <Modal title="Add New Post" open={show} onCancel={handleClose} footer={null}>
      <Form layout="vertical">
        <Form.Item label="Type" name="type">
          <Select value={data.type} onChange={handleTypeChange}>
            <Option value="Survey">Survey</Option>
            <Option value="Exercise">Exercise</Option>
          </Select>
        </Form.Item>
        {data.type === 'Exercise' && (
          <Form.Item label="SubType" name="subType">
            <Select value={data.subType} onChange={(value) => handleChange({ target: { name: 'subType', value } })}>
              <Option value="Depression">Depression</Option>
              <Option value="Anxiety">Anxiety</Option>
              <Option value="Panic Attacks">Panic Attacks</Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Heading" name="heading">
          <Input
            type="text"
            name="heading"
            value={data.heading}
            onChange={handleChange}
            placeholder="Write Heading"
          />
        </Form.Item>
        <Form.Item label="Body" name="body">
          <Input.TextArea
            rows={4}
            name="body"
            value={data.body}
            onChange={handleChange}
            placeholder="Write your post here..."
          />
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={handleClose}>
            Close
          </Button>
          <Button type="" onClick={handlePostClick} style={{ marginLeft: 10 }}>
            Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
