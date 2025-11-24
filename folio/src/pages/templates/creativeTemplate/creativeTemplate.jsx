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

const SIDER_WIDTH = 200;
const SIDER_COLLAPSED = 56;

export default function CreativeTemplate() {
  const [collapsed, setCollapsed] = useState(true);
  const [currentTab, setCurrentTab] = useState("about me");

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
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            padding: 8,
            background: "#c2dcff",
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
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? SIDER_COLLAPSED : SIDER_WIDTH,
          minHeight: "100vh",
          background: "#fff",
          minWidth: 0,
        }}
      >
        <Content
          style={{
            background: "#c2dcff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
