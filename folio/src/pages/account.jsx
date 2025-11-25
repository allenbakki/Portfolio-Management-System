import React, { useState } from "react";
import { GiButterfly } from "react-icons/gi";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Layout, Avatar } from "antd";
import Navbar from "../components/navbar";
import "./account.css";
import { useGlobalContext } from "../context/GlobalContext";

const { Sider, Content } = Layout;

function Account() {
  const [collapsed, setCollapsed] = useState(true);
  const { signOut, displayName, email, displayImage, createDate} = useGlobalContext();

  return (
    <Layout style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="account-sider-header">
          <Button
            className="menu-button"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <Navbar collapsed={collapsed} />
      </Sider>

      <Content className="account-content">
        <div className="account-header-top">
            <h2 className="account-logo"><GiButterfly /> Folio</h2>
        </div>

        <div className="account-container">
            <div className="account-header">
            <Avatar size={80} src={displayImage || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}/>
            <div className="account-user-info">
                <h1>{displayName || "User"}</h1>
                <p>{email || "email@example.com"}</p>
            </div>
            </div>

            <div className="account-actions">
            <Button type="primary">Edit Profile</Button>
            <Button danger onClick={signOut}>Log Out</Button>
            </div>

            <div className="account-section">
            <h3>Account Details</h3>
            <p><strong>Joined:</strong> {createDate || ""} </p>
            </div>
        </div>
    </Content>
    </Layout>
  );
}

export default Account;
