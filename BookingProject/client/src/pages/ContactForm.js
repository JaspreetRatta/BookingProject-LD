import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../resourses/ContactForm.css'; // Import the CSS file for styling (create this file)

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send the form data to the backend API
    console.log(formData);
    // You can use Axios or Fetch API to send the data to the server
  };

  return (
    <Container>
     
    <Row className="mb-5 mt-3">
      <Col lg="8">
        <h1 className="display-4 mb-4">Contact Me</h1>
        
      </Col>
    </Row>
    <Row className="sec_sp">
      <Col lg="5" className="mb-5">
        <h3 className="color_sec py-4">Get in touch</h3>
        <address>
          <strong>Email:saiyaanpyaare@gmaill.com</strong>{" "}
        
          <br />
          <br />
          <strong>Phone: +667930453444</strong>{" "}
         
        </address>
        
      </Col>
      <Col lg="7" className="d-flex align-items-center">
        <form  className="contact__form w-100">
          <Row>
            <Col lg="6" className="form-group">
              <input
                className="form-control"
                id="name"
                name="name"
                placeholder="Name" 
                type="text"
                required 
              />
            </Col>
            <Col lg="6" className="form-group">
              <input
                className="form-control rounded-0"
                id="email"
                name="email"
                placeholder="Email"
                type="email" 
                required 
              />
            </Col>
          </Row>
          <textarea
            className="form-control rounded-0"
            id="message"
            name="message"
            placeholder="Message"
            rows="5" 
            required
          ></textarea>
          <br />
          <Row>
            <Col lg="12" className="form-group">
              <button className="btn ac_btn" type="submit"> 
              Send
              </button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  </Container>
);

};

export default ContactForm;

