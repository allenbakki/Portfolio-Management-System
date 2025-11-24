import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  AuditOutlined,
  RocketOutlined,
  ExperimentOutlined,
  EyeOutlined,
  UsergroupAddOutlined,
  FundProjectionScreenOutlined 
} from "@ant-design/icons";
import { Menu } from "antd";
import { useGlobalContext } from "../context/GlobalContext";

const Navbar = ({ collapsed , flag = true ,setCurrentTab}) => {
  const navigate = useNavigate();
  const { isLogggedIn } = useGlobalContext();

  const handleMenuClick = (e) => {
    if (!isLogggedIn) {
      navigate("/signIn");
      return;
    }
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
      case "designlab":
        navigate("/designlab");
        break;
      case "launchpad":
        navigate("/launchpad");
        break;
      default:
        break;
    }
  };

  const handleCreativeMenuClick = (e) => {
    if (!isLogggedIn) {
      navigate("/signIn");
      return;
    }
    switch (e.key) {
      case "About Me":
        setCurrentTab('about');
        break;
     
      case "Vision":
        setCurrentTab('Vision');
        break;
      case "Skills":
        setCurrentTab('Skills');;
        break;
      case "Experience":
        setCurrentTab('Experience');;
        break;
      case "Projects":
        setCurrentTab('Projects');;
        break;
        case "Education":
          setCurrentTab('Education');
          break;
      default:
        break;
    }
  };

  return (
    <Menu
    style={{
      height: "100%",
      background: flag ? "white" : "#c2dcff",   
    }}
      theme="light"
      mode="vertical"
      onClick={flag ? handleMenuClick : handleCreativeMenuClick}  
      items={
        flag
          ? [
              { key: "home", icon: <HomeOutlined />, label: "Home" },
              { key: "portfolio", icon: <AuditOutlined />, label: "Portfolio" },
              { key: "designlab", icon: <ExperimentOutlined />, label: "Design Lab" },
              { key: "launchpad", icon: <RocketOutlined />, label: "Launch Pad" },
              { key: "account", icon: <UserOutlined />, label: "Account" },
            ]
          : [
              
              { key: "About Me", icon: <UserOutlined />, label: "About Me" },
              { key: "Vision", icon: <EyeOutlined />, label: "Vision" },
              { key: "Skills", icon: <RocketOutlined />, label: "Skills" },
              { key: "Experience", icon: <UsergroupAddOutlined />, label: "Experience" },
              { key: "Projects", icon: <FundProjectionScreenOutlined />, label: "Projects" },
              {key: "Education", icon: <AuditOutlined />, label: "Education" }
            ]
      }
    />
  );
};

export default Navbar;
