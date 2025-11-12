import { useState } from "react";
import Navbar from "../../components/navbar";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Space, Table, Tag } from 'antd';

const style = { background: '#0092ff', padding: '8px   ',height:250,border:"1px solid white", borderRadius:6 };

const { Sider, Content } = Layout;

const columns = [
    {
      title: 'Template',
      dataIndex: 'name',
      key: 'name',
      render: text => <div>{text}</div>,
    },
   
    {
      title: 'Link',
      dataIndex: 'Link',
      key: 'Link',
      render: (Link) => (
        <a href={Link} target="_blank" rel="noopener noreferrer">
          {Link}
        </a>
      ),

    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 6 ? 'geekblue' : 'green';
            if (tag === 'inactive') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, {actions}) => (
        <>
        {actions.map(actions => {
            let color = actions.length > 8 ? 'geekblue' : 'green';
            if (actions === 'delete') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={actions}>
              <Space size="middle">
              <a>{actions.toUpperCase()}</a>
            </Space>             
             </Tag>
            );
          })}
          </>
       
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'CleanSlate',
      Link: 'https://www.youtube.com',
      tags: ['active'],
      actions:['delete'],
    },
    {
      key: '2',
      name: 'VibrantVision',
      Link: 'https://www.youtube.com',
      tags: ['inactive'],
      actions:['delete','activate'],
    },
    {
      key: '3',
      name: 'ProFile',
      Link: 'https://www.youtube.com',
      tags: ['active'],
      actions:['delete'],
    },
  ];
  

function LaunchPad() {
  const [collapsed, setCollapsed] = useState(true);
 

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

      <Content style={{ height: "100%" }}>
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
              Portfolios launched
            </h2>
            <Table columns={columns} dataSource={data} />
            
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default LaunchPad;
