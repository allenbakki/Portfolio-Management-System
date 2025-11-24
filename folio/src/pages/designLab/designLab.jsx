import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiButterfly } from "react-icons/gi";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Layout, Card } from "antd";
import Navbar from "../../components/navbar";
import './designLab.css'


const { Sider, Content } = Layout;

function DesignLab() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const imageStyle = {
    width: "100%",
    height: "350px",
    objectFit: "cover"
  };

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

      <Content style={{ background: "#ffffff" }}>
        <div className="account-header-top">
          <h2 className="account-logo"><GiButterfly /> Folio</h2>
        </div>
        <div style={{ display: "flex", gap: "20px", margin: "40px"}}>
          <Card
            hoverable
            style={{ width: "100%", height: "auto", boxShadow: "0 4px 8px rgba(0,0,0,0.1)"}}
            onClick={() => navigate("/template")}
            cover={
              <img
                src="https://t3.ftcdn.net/jpg/03/25/80/02/360_F_325800248_w9sG5xSOXAK7S0zZaRIhIR3RW6RtT3WF.jpg"
                alt="Professional Template"
                className="cover-image"
              />
            }
          >
            <p style={{fontSize: "20px", fontWeight: "bold"}}> Professional </p>
          </Card>
          <Card
            hoverable
            style={{ width: "100%", height: "auto", boxShadow: "0 4px 8px rgba(0,0,0,0.1)"}}
            onClick={() => navigate("/template")}
            cover={
              <img
                src="https://www.proalley.com/blog/content/images/2023/02/GD-Image-2.jpg"
                alt="Creative Template"
                className="cover-image"
              />
            }
          >
            <p style={{fontSize: "20px", fontWeight: "bold"}}> Creative </p>
          </Card>
        </div>
        
      </Content>
    </Layout>
  );
}

export default DesignLab;
