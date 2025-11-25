import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Navbar from "../../../components/navbar";
import AboutMe from "./aboutMe";
import Experience from "./experience";
import Projects from "./projects";
import Education from "./education";
import { useGlobalContext } from "../../../context/GlobalContext";
import { getPortfolio } from "../../../apis/getPortfolio";

const { Sider, Content } = Layout;
const SIDER_WIDTH = 200;
const SIDER_COLLAPSED = 56;

export default function CreativeTemplate() {
  const [collapsed, setCollapsed] = useState(true);
  const [currentTab, setCurrentTab] = useState("about");
  const [portfolio, setPortfolio] = useState(null);

  const {
    mode,
    setToDarkMode,
    setCreativePortfolioLaunchId,
    accessToken,
  } = useGlobalContext();

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await getPortfolio(accessToken);
        setPortfolio(data);
      } catch (err) {
        console.error("Failed to load portfolio (creative):", err);
      }
    }

    if (accessToken) loadPortfolio();
  }, [accessToken]);

  const renderContent = () => {
    switch (currentTab) {
      case "about":
        return <AboutMe collapsed={collapsed} portfolio={portfolio} />;
      case "Experience":
        return <Experience collapsed={collapsed} portfolio={portfolio} />;
      case "Projects":
        return <Projects collapsed={collapsed} portfolio={portfolio} />;
      case "Education":
        return <Education collapsed={collapsed} portfolio={portfolio} />;
      default:
        return <AboutMe collapsed={collapsed} portfolio={portfolio} />;
    }
  };

  const handleLaunch = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/launch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ template: "creative" }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        console.error("Launch failed:", response.status, errorBody);
        return;
      }

      const data = await response.json();
      console.log("Launch response (creative):", data);

      setCreativePortfolioLaunchId(data.creativeLaunchId);

      window.open(
        `http://localhost:5173/launch/${data.creativeLaunchId}`,
        "_blank"
      );
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
          borderRight: mode ? "1px solid #444" : "1px solid #fff",
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
          <Button
            type="primary"
            onClick={handleLaunch}
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
