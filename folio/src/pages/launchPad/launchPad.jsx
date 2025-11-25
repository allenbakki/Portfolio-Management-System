import { useState } from "react";
import Navbar from "../../components/navbar";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { GiButterfly } from "react-icons/gi";
import { Button, Layout, Space, Table } from "antd";
import "./launchPad.css";
import { useGlobalContext } from "../../context/GlobalContext";

const { Sider, Content } = Layout;

function LaunchPad() {
  const [collapsed, setCollapsed] = useState(true);
  const {
    professionalPortfolioLaunchId,
    creativePortfolioLaunchId,
    setCreativePortfolioLaunchId,
    setProfessionalPortfolioLaunchId,
  } = useGlobalContext();



  const handleClick = async (key) => {
    try {
      await fetch("http://localhost:3000/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: key }),
      });

      // Update the state to remove the row
      if (key === "Creative") {
        setCreativePortfolioLaunchId("");
      } else if (key === "Professional") {
        setProfessionalPortfolioLaunchId("");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Build table data from current state
  const data = [
    professionalPortfolioLaunchId
      ? {
          key: "Professional",
          name: "Professional Portfolio",
          Link: `http://localhost:5173/launch-professional/${professionalPortfolioLaunchId}`,
          actions: ["delete"],
        }
      : null,
    creativePortfolioLaunchId
      ? {
          key: "Creative",
          name: "Creative Portfolio",
          Link: `http://localhost:5173/launch/${creativePortfolioLaunchId}`,
          actions: ["delete"],
        }
      : null,
  ].filter(Boolean);

  const columns = [
    {
      title: "Portfolio",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Link",
      dataIndex: "Link",
      key: "Link",
      render: (Link) => (
        <a href={Link} target="_blank" rel="noopener noreferrer">
          {Link}
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {record.actions.map((action) => (
            <Button
              key={action}
              style={{ color: "red", border: "1px solid red" }}
              onClick={() => handleClick(record.key)}
            >
              {action.toUpperCase()}
            </Button>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            padding: "8px",
            background: "#fff",
          }}
        >
          <Button
            className="menu-button"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ width: "40px", height: "40px", border: "none" }}
          />
        </div>
        <Navbar collapsed={collapsed} />
      </Sider>

      <Content className="launchpad-content" style={{ height: "100%" }}>
        <div className="folio-logo-div">
          <h2 className="folio-logo">
            <GiButterfly /> Folio
          </h2>
        </div>
        <div style={{ display: "flex", height: "100%" }}>
          <div
            style={{
              flex: 1,
              alignItems: "left",
              padding: "40px",
              background: "#fff",
            }}
          >
            <h2 style={{ fontWeight: "bold", paddingBottom: "40px" }}>
              Launch Pad
            </h2>

            <Table columns={columns} dataSource={data} rowKey="key" />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default LaunchPad;
