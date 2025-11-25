import React, { useState } from "react";
import { Layout, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Navbar from "../../components/navbar";
import Template01 from "./template_01";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { getPortfolio } from "../../apis/getPortfolio";

const { Sider, Content } = Layout;

const SIDER_WIDTH = 200;
const SIDER_COLLAPSED = 56;

export default function TemplatePage() {
  const [collapsed, setCollapsed] = useState(true);
  const [portfolio, setPortfolio] = useState(null);
  const [launchbtn,setLaunchBtn]=useState(true);

  const { accessToken ,setProfessionalPortfolioLaunchId} = useGlobalContext();

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await getPortfolio(accessToken);
        setPortfolio(data);
      } catch (err) {
        console.error("Failed to load portfolio:", err);
      }
    }

    if (accessToken) loadPortfolio();
  }, [accessToken]);

  const handleLaunch = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/launch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ template: "professional" }),
      });
  
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        console.error("Launch failed:", response.status, errorBody);
        return;
      }
  
      const data = await response.json();
  
      setProfessionalPortfolioLaunchId(data.professionalLaunchId);
  
      window.open(
        `http://localhost:5173/launch-professional/${data.professionalLaunchId}`,
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
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            padding: 8,
            background: "#fff",
          }}
        >
          <Button
            className="menu-button"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ width: 40, height: 40, border: "none" }}
          />
        </div>
        <Navbar collapsed={collapsed} />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? SIDER_COLLAPSED : SIDER_WIDTH,
          minHeight: "100vh",
          background: "#fff",
          minWidth: 0,
        }}
      >
        {launchbtn && <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    padding: 10,
                    paddingRight: 30,
                  }}
                >
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
                </div>}
        <Content
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "calc(100vw - 61px)" }}>
            <Template01 data={portfolio}/>
          </div>
        </Content>
      </Layout>
    </>
  );
}
