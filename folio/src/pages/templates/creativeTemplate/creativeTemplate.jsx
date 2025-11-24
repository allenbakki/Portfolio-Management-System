import React, { useState } from "react";
import { Layout, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Navbar from "../../../components/navbar";
import AboutMe from "./aboutMe";
import Vision from "./vision";
import Skills from "./skills";
import Experience from "./experience";
import Projects from "./projects";
import Education from "./education";
const { Sider, Content } = Layout;
import { useGlobalContext } from "../../../context/GlobalContext";

const SIDER_WIDTH = 200;
const SIDER_COLLAPSED = 56;

export default function CreativeTemplate() {
  const [collapsed, setCollapsed] = useState(true);
  const [currentTab, setCurrentTab] = useState("about me");
  const { mode, setToDarkMode } = useGlobalContext();
 

  const renderContent = () => {
    switch (currentTab) {
      case "about":
        return <AboutMe collapsed={collapsed} />;
      case "Vision":
        return <Vision collapsed={collapsed} />;
      case "Skills":
        return <Skills collapsed={collapsed} />;
      case "Experience":
        return <Experience collapsed={collapsed} />;
      case "Projects":
        return <Projects collapsed={collapsed} />;
      case "Education":
        return <Education collapsed={collapsed} />;
      default:
        return <AboutMe />;
    }
  };

  const handleLaunch = async () => {
    try {
      // Step 1: Hit API to fetch user details + generate filled template
    //   const response = await fetch("http://localhost:5000/api/launch", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ template: "creative-template" }),
    //   });
  
    //   const data = await response.json();
  
      // response should give you the generated URL
      // ex: "https://folio.myapp.com/portfolio/12345"
  
      // Step 2: Redirect user to the generated template URL
      window.open("http://localhost:5173/launch/:launchId", "_blank");
  
    } catch (err) {
      console.error("Launch failed", err);
    }
  };
  

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={SIDER_WIDTH}
        collapsedWidth={SIDER_COLLAPSED}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          background: "#fff",
          zIndex: 100,
          borderRight: mode ? "1px solid #444" : "1px solid #fff", // <-- border added
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            padding: 8,
            background: mode ? "#001b3d" : "#c2dcff",
          }}
        >
          <Button
            className="menu-button"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ width: 40, height: 40, border: "none" }}
          />
        </div>
        <Navbar
          collapsed={collapsed}
          flag={false}
          setCurrentTab={setCurrentTab}
          mode={mode}
          setToDarkMode={setToDarkMode}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? SIDER_COLLAPSED : SIDER_WIDTH,
          minHeight: "100vh",
          background: mode ? "#001b3d" : "#c2dcff",
          minWidth: 0,
          width: collapsed ? "calc(100vw - 50px)" : "calc(100vw - 200px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            padding: 10,
            paddingRight: 30,
          }}
        >
          {" "}
          <Button
            type="primary"
            onClick={() => {
              handleLaunch() 
            }}
            style={{
              background: "#4CAF50",
              border: "none",
              fontSize: 16,
              padding: "6px 16px",
            }}
          >
            Launch 🚀
          </Button>
        </div>
        <Content
          style={{
            background: mode ? "#001b3d" : "#c2dcff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: mode ? "white" : "black",
          }}
        >
          <div
            style={{
              width: collapsed ? "calc(100vw - 61px)" : "calc(100vw - 180px)",
            }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </>
  );
}
