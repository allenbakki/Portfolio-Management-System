import React from "react";
import { HomeOutlined, UserOutlined, AuditOutlined, SettingOutlined, RocketOutlined, ExperimentOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <Menu
      style={{ height: "100%" }}
      theme="light"
      mode="vertical"
      items={[
        {icon: <HomeOutlined />, label: "Home", key: "/"},
        {icon: <AuditOutlined />, label: "Portfolio", key: "/portfolio" },
        {icon: <ExperimentOutlined/>, label: "Design Lab"},
        {icon: <RocketOutlined />, label: "Launch Pad"},
        {icon: <SettingOutlined />, label: "Settings"},
        {icon: <UserOutlined />, label: "Account"},
      ]}

      onClick={(item) => navigate(item.key)}
    />
  );
};

export default Navbar;
