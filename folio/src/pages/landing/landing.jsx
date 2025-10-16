import React, { useState } from "react";
import { GiButterfly } from 'react-icons/gi';
import { LeftOutlined, RightOutlined, ArrowRightOutlined} from "@ant-design/icons";
import { Button, Layout } from "antd";
import Navbar from "../../components/navbar"
import './landing.css';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";


const { Sider, Content } = Layout;

function Landing() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const { isLogggedIn } = useGlobalContext();


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

                    <div style={{alignContent: "center", 
                                 justifyContent: "center", 
                                 padding:"20px"}}>
                        <h1>
                            Getting Started
                        </h1>
                        <p style={{fontSize: "1.2rem", 
                                   marginTop: "10px" }}>
                            Your professional experiences are more than a resumé. Create and design your working portfolio to reflect your skills, personality and ambitions. Your personalized, digital platform will be ready to share within minutes. 
                        </p>
                    </div>
                    <div style={{display: "flex", 
                                 justifyContent: "flex-end", 
                                 width: "100%", 
                                 marginTop: "20px" }}>
                        <Button style={{ marginRight: "40px" }} 
                                onClick={() => isLogggedIn?navigate("/portfolio"):navigate("/signIn")}>
                                {isLogggedIn?"Start Building": "Sign In First"} <ArrowRightOutlined />
                         </Button>
                    </div>
                </div>
                <div style={{flex: 1.75, 
                             backgroundImage: "url('/images/banner.jpg')", 
                             backgroundSize: "cover"}}/>
            </div>
        </Content>

    </Layout>
  );
}

export default Landing;
