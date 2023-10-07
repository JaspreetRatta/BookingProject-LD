import React from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Upload,
  Typography,
  Card,
  Tooltip,
  Row,
  Col,
  message,
  Divider,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import heroimg11 from "../resourses/images/hero-img11.jpg";
import "../resourses/addmemory.css";

const { TextArea } = Input;
const { Title, Text } = Typography;

function AddMemory() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/api/memories/add-memory", values);
      message.success(response.data.message);
      form.resetFields();
    } catch (error) {
      message.error("Error creating memory. Please try again.");
    }
  };

  return (
    <Row className="add-memory-container" gutter={16}>
      <Col xs={24} md={12}>
        <Card className="add-memory-card" bordered={false}>
          <Title level={2} style={{ color: "#3A7BDB" }}>Add a New Memory</Title>
          <Text type="secondary">Fill in the details of your memory below.</Text>
          <Divider />
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            form={form}
          >
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
<br/>
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
<br></br>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Add Memory
              </Button>
            </Form.Item>
            <Link to="/client/src/Diary/MemoryList" className="my-memorylist-link">
            View My Memory List
          </Link>
          </Form>
          
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <img src={heroimg11} alt="Memory" className="hero-image" />
      </Col>
    </Row>
  );
}

export default AddMemory;

