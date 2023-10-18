import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { axiosInstance } from "../../../helpers/axiosInstance";
import { Col, Form, message, Modal, Row } from "antd";
import { useDispatch } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { HideLoading, ShowLoading } from "../../../redux/alertsSlice";

const initialstate = {
  title: "TourTest1",
  journeyDate: "2023-11-01",
  price: "15000",
  description: "Description Test",
  duration: 12,
  details: "Details Test",
  images: [],
};

const CreateTour = ({ 
  showBusForm,
  setShowBusForm,
  type = "add",
  getTour,
  selectedBus,
  setSelectedBus,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialstate);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChangeQuill = (content) => {
    setValues({ ...values, details: content });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(ShowLoading());
    axiosInstance
      .post("/api/tour/create", values)
      .then((res) => {
        dispatch(HideLoading());
        console.log(res);
        getTour();
        setShowBusForm(false);
        setSelectedBus(null);
      })
      .catch((err) => {
        dispatch(HideLoading());
        console.log(err.response);
        getTour();
      });
  };

  return (
    <Modal
      width={800}
      title={type === "add" ? "Add Bus" : "Update Bus"}
      visible={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={false}
    >

      <div className="col">
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>journeyDate</label>
            <input
              className="form-control"
              type="date"
              name="journeyDate"
              value={values.journeyDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>price</label>
            <input
              className="form-control"
              type="number"
              name="price"
              value={values.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
    <label>Description</label>
    <textarea
        className="form-control"
        name="description"
        value={values.description}
        onChange={handleChange}
        rows="4"  // Specifies the number of visible text lines
        cols="50" // Specifies the number of visible text columns
    />
</div>

          <div className="form-group">
            <label>Duration</label>
            <input
              className="form-control"
              type="number"
              name="duration"
              value={values.duration}
              onChange={handleChange}
            />
          </div>
          <Col lg={12} xs={24}>
            <Form.Item label="Package left" name="package">
              <input type="text" />
            </Form.Item>
          </Col>

          <div className="form-group">
            <label>Details</label>
            <ReactQuill 
              value={values.details} 
              onChange={handleChangeQuill}
            />
          </div>
          <label>Images</label>
          <FileUpload values={values} setValues={setValues} />

          <div className="d-flex justify-content-end">
            <button className="primary-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTour;