import React, { useState } from "react";
import { GiButterfly } from 'react-icons/gi';
import Navbar from "../../components/navbar"
import { LeftOutlined, RightOutlined} from "@ant-design/icons";
import { Button, Layout } from "antd";

const { Sider, Content } = Layout;

function Portfolio() {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{height: "100vh", 
                    width: "100vw", 
                    overflow: "hidden"}}>

        <Sider trigger={null} 
               collapsible 
               collapsed={collapsed}>
            <div style={{width: "100%", 
                         display: "flex", 
                         justifyContent: collapsed ? "center" : "flex-end", 
                         padding: "8px", 
                         background: "#fff"}}>
                <Button className="menu-button" 
                        icon={collapsed ? <RightOutlined /> : <LeftOutlined />} 
                        onClick={() => setCollapsed(!collapsed)} 
                        style={{width: "40px",  
                                height: "40px", 
                                border: "none"}}/>
            </div>
            <Navbar collapsed={collapsed} />
        </Sider>

        <Content style={{height: "100%" }}>
            <div style={{display: "flex", 
                         height: "100%"}}>
                <div style={{flex: 1, 
                             alignItems: "left", 
                             padding: "40px", 
                             background: "#fff"}}>
                    <h2 style={{fontWeight: "bold", 
                                paddingBottom: "40px"}}>
                        <GiButterfly />Folio
                    </h2>
                        
                </div>
            </div>
        </Content>

    </Layout>

    );
}

export default Portfolio;
