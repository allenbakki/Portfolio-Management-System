import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { GiButterfly } from "react-icons/gi";
import { Button, Layout, Space, Table } from "antd";
import "./launchPad.css";
import { useGlobalContext } from "../../context/GlobalContext";

const { Sider, Content } = Layout;

function LaunchPad() {
  const [collapsed, setCollapsed] = useState(true);
  const [rows, setRows] = useState([]);

  const {
    professionalPortfolioLaunchId,
    creativePortfolioLaunchId,
    setCreativePortfolioLaunchId,
    setProfessionalPortfolioLaunchId,
    accessToken,
  } = useGlobalContext();

  useEffect(() => {
    const initial = [];

    if (professionalPortfolioLaunchId) {
      initial.push({
        template: "professional",
        key: "Professional",
        name: "Professional Portfolio",
        launchId: professionalPortfolioLaunchId,
      });
    }

    if (creativePortfolioLaunchId) {
      initial.push({
        template: "creative",
        key: "Creative",
        name: "Creative Portfolio",
        launchId: creativePortfolioLaunchId,
      });
    }

    setRows(initial);
  }, [professionalPortfolioLaunchId, creativePortfolioLaunchId]);

  // 2) on mount, pull any saved links from backend (so it works after refresh)
  useEffect(() => {
    if (!accessToken) return;

    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/launch-links", {
          headers: {
            Authorization: accessToken,
          },
        });

        if (!res.ok) {
          console.error("Failed to load launch links:", res.status);
          return;
        }

        const data = await res.json();
        console.log("Launch links from backend:", data);

        if (!data.success || !Array.isArray(data.links)) return;

        const fromServer = data.links.map((link) => ({
          template: link.template, // "creative" | "professional"
          key: link.template === "professional" ? "Professional" : "Creative",
          name:
            link.template === "professional"
              ? "Professional Portfolio"
              : "Creative Portfolio",
          launchId: link.launchId,
        }));

        setRows(fromServer);

        data.links.forEach((link) => {
          if (link.template === "professional") {
            setProfessionalPortfolioLaunchId(link.launchId);
          } else if (link.template === "creative") {
            setCreativePortfolioLaunchId(link.launchId);
          }
        });
      } catch (err) {
        console.error("Error loading launch links:", err);
      }
    })();
  }, [accessToken, setProfessionalPortfolioLaunchId, setCreativePortfolioLaunchId]);

  const handleClick = async (record) => {
    const template = record.template; // "creative" | "professional"

    try {
      const res = await fetch("http://localhost:3000/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ template }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error("Delete failed:", res.status, body);
        return;
      }

      // Remove from table
      setRows((prev) => prev.filter((row) => row.template !== template));

      // Clear from context
      if (template === "creative") {
        setCreativePortfolioLaunchId("");
      } else if (template === "professional") {
        setProfessionalPortfolioLaunchId("");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const data = rows.map((row) => ({
    key: row.key,
    name: row.name,
    Link:
      row.template === "professional"
        ? `http://localhost:5173/launch-professional/${row.launchId}`
        : `http://localhost:5173/launch/${row.launchId}`,
    actions: ["delete"],
    template: row.template,
  }));

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
              onClick={() => handleClick(record)}
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
