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

  const { accessToken } = useGlobalContext();

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
