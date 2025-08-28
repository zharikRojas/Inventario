import React from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { LoginServices } from '../../services/LoginServices';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const data = {
                name: values.name,
                email: values.email,
                password: values.password,
            };
            await LoginServices.register(data);
            message.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
            navigate('/login');
        } catch (error) {
            const errorMessage = error.error || 'Hubo un problema con el registro. Inténtalo de nuevo.';
            message.error(errorMessage);
        }
    };

    return (
        <div className="LoginScreen"> {/* Usamos la misma clase que el login para centrarlo */}
            <Card title="Crear una Cuenta" style={{ width: 400 }}>
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="name"
                        label="Nombre Completo"
                        rules={[{ required: true, message: 'Por favor, ingresa tu nombre' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nombre Completo" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Correo Electrónico"
                        rules={[
                            { required: true, message: 'Por favor, ingresa tu correo' },
                            { type: 'email', message: 'El correo no es válido' }
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Correo Electrónico" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirmar Contraseña"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Por favor, confirma tu contraseña' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirmar Contraseña" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large">
                            Registrarse
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterPage;