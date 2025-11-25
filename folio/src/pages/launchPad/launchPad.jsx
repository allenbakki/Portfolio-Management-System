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
    setCreativePortfolioLaunchId,
    setProfessionalPortfolioLaunchId,
    accessToken,
  } = useGlobalContext();

  // ⬇️ ONLY this effect should load all rows
  useEffect(() => {
    if (!accessToken) return;

    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/launch-links", {
          headers: { Authorization: accessToken },
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

        // Update context so other UI parts know
        data.links.forEach((link) => {
          if (link.template === "professional") {
            setProfessionalPortfolioLaunchId(link.launchId);
            localStorage.setItem("professionalPortfolioLaunchId", JSON.stringify(link.launchId));

          }
          if (link.template === "creative") {
            setCreativePortfolioLaunchId(link.launchId);
            localStorage.setItem("creativePortfolioLaunchId", JSON.stringify(link.launchId));

          }
          
        });
      } catch (err) {
        console.error("Error loading launch links:", err);
      }
    })();
  }, [accessToken, setProfessionalPortfolioLaunchId, setCreativePortfolioLaunchId]);

  // ⬇️ Delete handler
  const handleDelete = async (record) => {
    const template = record.template;

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

      // Remove from UI
      setRows((prev) => prev.filter((row) => row.template !== template));

      // Remove from context + localStorage
      if (template === "creative") {
        setCreativePortfolioLaunchId("");
        // localStorage.removeItem("creativePortfolioLaunchId");
      } else if (template === "professional") {
        setProfessionalPortfolioLaunchId("");
        // localStorage.removeItem("professionalPortfolioLaunchId");
      }

    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ⬇️ Table data
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

  // ⬇️ Table Columns
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
              onClick={() => handleDelete(record)}
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
      {/* SIDE NAV */}
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

      {/* MAIN CONTENT */}
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
