import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Spin, Alert } from "antd";

const { Content } = Layout;

export default function PublicPortfolio() {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`http://localhost:3000/public/${uid}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || "Failed to load portfolio");
        }

        const json = await res.json();
        console.log("Public portfolio response:", json);
        setData(json);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (uid) load();
  }, [uid]);

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <Content style={{ background: "#fff", padding: 40 }}>
        {loading && <Spin tip="Loading public portfolio..." />}

        {!loading && error && (
          <Alert type="error" message="Error" description={error} />
        )}

        {!loading && !error && data && (
          <>
            <h1>Public Portfolio Viewer</h1>
            <pre style={{ marginTop: 16, maxHeight: 400, overflow: "auto" }}>
{JSON.stringify(data, null, 2)}
            </pre>
          </>
        )}
      </Content>
    </Layout>
  );
}
