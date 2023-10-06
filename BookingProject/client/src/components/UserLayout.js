import React, { useState } from "react";
import "../resourses/user.css";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import userMenu from "./MenuItems";
import { Menu, Badge, Layout, Breadcrumb } from "antd";


function UserLayout({ children }) {
  const { Header, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const activeRoute = window.location.pathname.includes("book-now")
    ? "/"
    : window.location.pathname;

  const { user } = useSelector((state) => state.users);

  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Layout className="layout">
        {/* <Navbar
          collapsed={collapsed}
          handleMenuToggle={handleMenuToggle}
          activeRoute={activeRoute}
          user={user}
          userMenu={userMenu}
          navigate={navigate}
        /> */}
        <Navbar2
        activeRoute={activeRoute}
        user={user}
        userMenu={userMenu}
        navigate={navigate}
        />
        <Content
          style={{
            padding: "0 15%",
            minHeight:"100vh"
          }}
        >
          <div className="site-layout-content">
            <div className="user-content">{children}</div>
          </div>
        </Content>

        <section >
        <div className="container text-center">
          <h1>Let's Get In Touch!</h1>
          <p>
            Ready to start your next project with us? Give us a call or send us an
            email and we will get back to you as soon as possible!
          </p>
          <i className="fa fa-phone myicon text-warning"></i>
          <i className="fa fa-heart myicon text-danger"></i>
          <p>+667930453444</p>
          <p>saiyaandaaldenge@gmaill.com</p>
        </div>
      </section>

      
      <section className="footer bg-dark">
        <div className="container py-5 text-white text-center">
          <p>Copyright © 2021 -Ultimate Pvt Ltd.</p>
        </div>
      </section>
      </Layout>
    </>
  );
}

export default UserLayout;
