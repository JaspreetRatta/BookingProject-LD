import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  message,
  Upload,
  Typography,
  Card,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "../resourses/addmemory.css";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";

import heroimg11 from "../resourses/images/hero-img11.jpg";

const { TextArea } = Input;
const { Title } = Typography;

function AddMemory() {
  const [memory, setMemory] = useState({
    title: "",
    location: "",
    date: null,
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    setMemory({ ...memory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/api/memories/add-memory", values);
      console.log("Memory created:", response.data);
      message.success(response.data.message);
    } catch (error) {
      console.error("Error creating memory:", error);
      message.error(error.message);
    }
  };

  useEffect(() => {
    console.log("Memory:", memory);
  }, [memory]);

  return (
    <div className="add-memory-container">
      <Card className="add-memory-card">
        <Title level={2}>Add Memory</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input placeholder="Location" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Upload Images&nbsp;
                <Tooltip title="Supported formats: jpg, jpeg, png. Maximum size: 9MB.">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              </span>
            }
            name="images"
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
<br/>
          <Form.Item>
    <Button type="primary" htmlType="submit" style={{ backgroundColor: 'blue', borderColor: 'blue', color: 'white' }}>
        Add Memory
    </Button>
</Form.Item>


          <div className="my-memorylist-link">
            <Link to="/client/src/Diary/MemoryList">My Memory List</Link>
          </div>
        </Form>
      </Card>

      <div className="image-container">
        <img
          src={heroimg11}
          alt=""
          className="hero-image"
        />
      </div>
    </div>
  );
}

export default AddMemory;
