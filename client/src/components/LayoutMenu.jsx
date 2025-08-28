import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  OrderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";

const { Sider, Content } = Layout;

const LayoutMenu = ({ children }) => {
  const location = useLocation();
  const [dataUser, setDataUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = getDataLocalStorage();
    if (userData) {
      setDataUser(userData);
    }
  }, []);
  const getDataLocalStorage = () => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div>
          <div
            style={{
              height: "32px",
              margin: "16px",
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: "6px",
              color: "white",
              textAlign: "center",
              lineHeight: "32px",
            }}
          >
            Inventario
          </div>

          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            {dataUser && dataUser.role === 1 && (
              <Menu.Item key="/products/table" icon={<DesktopOutlined />}>
                <Link to="/products/table">Productos</Link>
              </Menu.Item>
            )}
            {dataUser && dataUser.role === 2 && (
              <>
                <Menu.Item key="/orders" icon={<OrderedListOutlined />}>
                  <Link to="/orders">Compras</Link>
                </Menu.Item>
                <Menu.Item key="/historico" icon={<FileOutlined />}>
                  <Link to="/historico">Historial Productos</Link>
                </Menu.Item>
              </>
            )}

            <Menu.Item key="/invoices" icon={<FileOutlined />}>
              <Link to="/invoices">Facturas</Link>
            </Menu.Item>
          </Menu>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          style={{ marginTop: "auto" }}
          onClick={handleLogout}
        >
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Cerrar Sesión
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ padding: "24px" }}>
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutMenu;
