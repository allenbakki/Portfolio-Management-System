import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined, AuditOutlined, SettingOutlined, RocketOutlined, ExperimentOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useGlobalContext } from "../context/GlobalContext";

const Navbar = ({ collapsed }) => {
  const navigate = useNavigate();
  const { isLogggedIn } = useGlobalContext();
  const handleMenuClick = (e) => {
    if(!isLogggedIn){
      navigate("/signIn");
    }
    else{
    switch (e.key) {
      case "home":
        navigate("/");
        break;
      case "account":
        navigate("/account");
        break;
      case "portfolio":
        navigate("/portfolio");
        break;
      case "launchpad":
        navigate("/launchpad");
        break;
      default:
        break;
    }
  }
  };

  return (
    <Menu
      style={{ height: "100%" }}
      theme="light"
      mode="vertical"
      onClick={handleMenuClick}
      items={[
        { key: "home",      icon: <HomeOutlined />,       label: "Home" },
        { key: "portfolio", icon: <AuditOutlined />,      label: "Portfolio" },
        { key: "designlab", icon: <ExperimentOutlined />, label: "Design Lab" },
        { key: "launchpad", icon: <RocketOutlined />,     label: "Launch Pad" },
        { key: "settings",  icon: <SettingOutlined />,    label: "Settings" },
        { key: "account",   icon: <UserOutlined />,       label: "Account" },
      ]}

    />
  );
};

export default Navbar;
