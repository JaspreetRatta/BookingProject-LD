import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Navbar2";

import intro from "../resourses/intro.png";

import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../resourses/auth.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.href = "/";
      } else {
        // message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <div class="col-md-5 p-5 shadow-sm">
        <br></br>
        <h1 className="text-lg"> Login</h1>
        <hr />

        <div>
          <img src={intro} alt="Logo" className="logo-image" />
        </div>
        <br></br>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <input type="text" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" />
          </Form.Item>
          <br></br>
          <div>
            <button className="primary-btn" type="submit">
              Login
            </button>

            <br></br>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center my-3">
              <Link to="/register">Click Here To Register</Link>
            </div>
            <Link to="/ResetPassword">Forgot Password? </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
