import React from "react";
import { HomeOutlined, UserOutlined, AuditOutlined, SettingOutlined, RocketOutlined, ExperimentOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const Navbar = ({ collapsed }) => {
  return (
    <Menu
      style={{ height: "100%" }}
      theme="light"
      mode="vertical"
      items={[
        {icon: <HomeOutlined />, label: "Home"},
        {icon: <AuditOutlined />, label: "Portfolio"},
        {icon: <ExperimentOutlined/>, label: "Design Lab"},
        {icon: <RocketOutlined />, label: "Launch Pad"},
        {icon: <SettingOutlined />, label: "Settings"},
        {icon: <UserOutlined />, label: "Account"},
      ]}
    />
  );
};

export default Navbar;
