import "./login.scss";
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined, HolderOutlined } from '@ant-design/icons';
import { LoginServices } from "../../services/LoginServices";
import { useNavigate } from "react-router-dom";


const Login =  () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
      e.preventDefault();
        if (!email || !password) {
         message.error("Email y Contraseña son requeridos");
          return;
        }
       try {
        const data = {
          email: email,
          password: password
        }
        const resp = await LoginServices.login(data);
        localStorage.setItem("user",JSON.stringify({
          idUser: resp.usuario.id,
          role: resp.usuario.roleId
        }));
        navigate("/home");

       } catch (error) {
        message.error(`Error en el login: ${error.error}`, 3);
       }
    }

    return (
      <div className="LoginScreen">
        <form className="form">
          <h2
          >Bienvenido</h2>
          <div>
            <label>Ingrese Email</label>
            <Input
              className="input"
              size="large"
              placeholder="Ingrese Email"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input_password">
            <label>Contraseña</label>
            <Input.Password
              className="input"
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              autoComplete="off"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: "#0e1c30ff", cursor: "pointer" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "#0e1c30ff", cursor: "pointer" }} />
                )
              }
            />
          </div>
          <div className="content_link_register">
            <a className="link_register" href="/register">
              ¿Aún no tienes una cuenta? Regístrate
            </a>
          </div>

          <div style={{ textAlign: "center" }}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#36669c",
                color: "#e4dedc",
                borderRadius: "10px",
                margin: "auto",
                marginTop: "15px",
                width: "150px",
                border: "none",
                textDecoration: "none",
                padding: "10px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onClick={handleLogin}
            >
              Ingresar
            </Button>
          </div>
        </form>
      </div>
        
    );
}

export default Login;
